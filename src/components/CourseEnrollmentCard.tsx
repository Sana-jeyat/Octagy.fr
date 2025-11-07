'use client'

declare global {
  interface Window {
    ethereum?: any;
  }
}


import { useEffect, useState } from 'react'
import { Coins, CreditCard, X } from 'lucide-react'
import { ethers } from 'ethers'
import { toast, ToastContainer } from 'react-toastify';
import { courseService } from '@/services/courseService';
import { useRouter } from 'next/navigation'

const knoTokenAddress = '0x236fbfAa3Ec9E0B9BA013Df370c098bAd85aD631'
const RECIPIENT_ADDRESS = '0xf95a0763cDDB5A73fC251DcFdD0072b6178CCc8c' 



const ERC20_ABI = [
  'function transfer(address to, uint amount) returns (bool)',
  'function decimals() view returns (uint8)',
]

interface CourseEnrollmentCardProps {
  courseId: string
  moodleId: string
  imageUrl: string
  fullname: string
  fiatPrice?: number
  knoPrice?: number | string
}

const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() view returns (uint8)",
];





export function CourseEnrollmentCard({
courseId,
  moodleId,
  imageUrl,
  fullname,
  fiatPrice = 49,
  knoPrice = '500',
}: CourseEnrollmentCardProps) {
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'kno'>('stripe')
  const [paymentInProgress, setPaymentInProgress] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
   const router = useRouter()



  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const data = await courseService.checkEnrollment(moodleId)
        setIsEnrolled(data.enrolled === true)
      } catch {
        setIsEnrolled(false)
      } finally {
        setLoading(false)
      }
    }
    checkEnrollment()
  }, [moodleId])

  const handleEnrollClick = () => {
    if (isEnrolled) {
      router.push(`/dashboard/course-viewer?course=${moodleId}`)
    } else {
      setShowPaymentOptions(true)
    }
  }

  const handleStripePayment = async () => {
    setProcessing(true)
    try {
      const data = await courseService.createStripePayment(moodleId)
      if (data.url) {
        await courseService.saveTransaction({
          courseId,
          type: 'stripe',
          amount: fiatPrice,
        })
        window.location.href = data.url
      }
    } catch (err) {
      toast.error("Erreur lors du paiement Stripe")
    } finally {
      setProcessing(false)
    }
  }

  
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWalletConnected(false);
        setTokenBalance(null);
      } else {
        setWalletConnected(true);
        fetchTokenBalance(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);


  const fetchTokenBalance = async (address: string) => {
  if (!window.ethereum) {
    toast.error("Wallet non détecté.");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    console.log("Chain ID connecté :", network.chainId.toString());

    if (network.chainId !== 137n) {
      console.log("Chain ID connecté :", network.chainId.toString());
      toast.error("Veuillez connecter votre wallet au réseau Polygon.");
      return;
    }

    const knoToken = new ethers.Contract(knoTokenAddress, erc20Abi, provider);
    const balanceRaw = await knoToken.balanceOf(address);
    const decimals = await knoToken.decimals();
    const balanceFormatted = ethers.formatUnits(balanceRaw, decimals);
    setTokenBalance(balanceFormatted);
  } catch (error) {
    console.error("Erreur lors de la récupération du solde", error);
    toast.error("Impossible de récupérer le solde. Vérifiez le réseau ou le contrat.");
  }
};

  const handleKnoPayment = async () => {
    setProcessing(true)
    try {
      if (!window.ethereum) return toast.warning('Installez MetaMask')

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const knoToken = new ethers.Contract(knoTokenAddress, erc20Abi, signer)
      const decimals = await knoToken.decimals()
      const amount = ethers.parseUnits(knoPrice.toString(), decimals)

      const tx = await knoToken.transfer(RECIPIENT_ADDRESS, amount)
      await tx.wait()
      toast.success('Paiement confirmé ✅')

      const enrollData = await courseService.enrollWithKno(moodleId, {
        txHash: tx.hash,
        tokenAmount: knoPrice,
      })

      await courseService.saveTransaction({
        courseId,
        type: 'KNO',
        amount: knoPrice,
        txHash: tx.hash,
      })

      if (enrollData.redirect_url) {
        router.push(`/dashboard/course-viewer?url=${encodeURIComponent(enrollData.redirect_url)}`)
      } else {
        setIsEnrolled(true)
      }
    } catch (err) {
      console.error(err)
      toast.error('Erreur lors du paiement KNO')
    } finally {
      setProcessing(false)
    }
  }


  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl relative">
      {/* Alerte connexion */}
      {showAlert && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center justify-between max-w-md w-full shadow-md z-10">
          <span>Veuillez vous connecter pour vous inscrire.</span>
          <button
            onClick={() => setShowAlert(false)}
            aria-label="Fermer l'alerte"
            className="ml-4 text-red-700 hover:text-red-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Image */}
      <img
        src={imageUrl}
        alt={fullname}
        className="w-full h-48 object-cover rounded-lg mb-6"
      />

      {/* Prix */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fiatPrice)}
        </div>
        <div className="text-sm text-gray-500">
          ou <span className="font-semibold">{knoPrice}</span>{' '}
          <span className="uppercase text-purple-600">KNO</span>
        </div>
      </div>

      {/* Bouton principal */}
      {/* Bouton principal (masqué quand les options de paiement s'affichent) */}
{!showPaymentOptions && (
  <button
    onClick={handleEnrollClick}
    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold mb-4"
    disabled={loading || processing}
  >
    {loading
      ? 'Chargement...'
      : processing
      ? 'Paiement en cours...'
      : isEnrolled
      ? 'Reprendre le cours'
      : "S'inscrire maintenant"}
  </button>
)}


      {/* Choix paiement */}
 {showPaymentOptions && !processing && (
  <div className="space-y-4 mt-4">
    <div className="flex flex-col space-y-2">
      <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
        <input
          type="radio"
          name="payment"
          value="stripe"
          checked={paymentMethod === 'stripe'}
          onChange={() => setPaymentMethod('stripe')}
          className="form-radio text-blue-600"
        />
        <CreditCard className="w-5 h-5 text-blue-600" />
        <span className=" text-yellow-600">Payer par carte</span>
      </label>

      <label className="flex items-center gap-3 p-3 border border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
        <input
          type="radio"
          name="payment"
          value="kno"
          checked={paymentMethod === 'kno'}
          onChange={() => setPaymentMethod('kno')}
          className="form-radio text-purple-600"
        />
        <Coins className="w-5 h-5 text-yellow-600" />
        <span className=" text-blue-600">Payer en KNO</span>
      </label>
    </div>

    <div className="space-y-2">
  <button
    onClick={() =>
      paymentMethod === 'stripe'
        ? handleStripePayment()
        : handleKnoPayment()
    }
    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold"
  >
    Confirmer le paiement
  </button>

  <button
   onClick={() => {
  setShowPaymentOptions(false)
  setPaymentMethod('stripe') 
}}

    className="w-full text-gray-600 py-2 rounded-lg hover:underline transition"
  >
    Annuler
  </button>
</div>

  </div>
)}

    </div>
  )
}
