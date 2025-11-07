

'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/context/axiosInstance';
import { Building, CheckCircle, Loader2 } from 'lucide-react';
import CompanyModal from './CompanyModal';
import { AuthContext } from '@/context/AuthContext';

interface Plan {
  id: string;
  name: string;
  price: number; 
  duration: string;
  period: string; 
  employees: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface PlansComponentProps {
  plans: Plan[];
}

const PlansComponent: React.FC<PlansComponentProps> = ({ plans }) => {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [siretNumber, setSiretNumber] = useState<string>('');
  const [showCompanyForm, setShowCompanyForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnnual, setIsAnnual] = useState<boolean>(false); // ✅ toggle mensuel/annuel

  const [ownerData, setOwnerData] = useState({
    gender: 'M',
    firstName: '',
    lastName: '',
    personalEmail: '',
    mobilePhone: '',
  });

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState<string | null>(null);

 const { isAuthenticated } = useContext(AuthContext); // 👈 ajoute cette ligne en haut

const handlePurchase = (planId: string) => {
  if (!isAuthenticated) {
    router.push('/auth/login');
    return;
  }

  setSelectedPlanId(planId);
  setShowCompanyForm(true);
};


  const handleSubmitCompany = async () => {
    if (
      !companyName ||
      !selectedPlanId ||
      !ownerData.firstName ||
      !ownerData.lastName ||
      !ownerData.personalEmail
    ) {
      alert('Veuillez remplir toutes les informations du responsable et de l’entreprise.');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/pay/stripe-subscription', {
        planId: selectedPlanId,
        companyName,
        description,
        companyAddress: address,
        companyEmail: email,
        companyPhone: phone,
        companySiret: siretNumber,
        owner: ownerData,
        period: isAnnual ? 'year' : 'month', 
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session Stripe:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const planColors = [
    'from-blue-500 to-blue-400',
    'from-green-500 to-green-400',
    'from-yellow-500 to-yellow-400',
    'from-red-500 to-red-400',
    'from-pink-500 to-pink-400',
  ];

  
 const getPlanPrice = (price: number) => {
  return isAnnual ? (price * 10).toFixed(2) : price.toFixed(2);
};

  return (
    <div className="space-y-8 px-4 py-12 md:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Titre */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Choisissez votre plan Knowledge Stipend
        </h2>
        <p className="text-lg text-gray-600">
          Des solutions adaptées à la taille de votre entreprise.
        </p>
      </div>

    
     <div className="flex flex-col items-center mb-10">
  <div className="flex justify-center">
    <button
      onClick={() => setIsAnnual(false)}
      className={`px-6 py-2 rounded-l-lg font-semibold border transition-all duration-300 ${
        !isAnnual
          ? 'bg-purple-600 text-white border-purple-600'
          : 'bg-white text-gray-700 border-gray-300'
      }`}
    >
      Mensuel
    </button>
    <button
      onClick={() => setIsAnnual(true)}
      className={`px-6 py-2 rounded-r-lg font-semibold border transition-all duration-300 ${
        isAnnual
          ? 'bg-purple-600 text-white border-purple-600'
          : 'bg-white text-gray-700 border-gray-300'
      }`}
    >
      Annuel
    </button>
  </div>

  {/* 💡 Texte marketing amélioré */}
  <p className="mt-3 text-lg font-bold text-yellow-500 flex items-center gap-2">
    <span className="text-2xl animate-bounce">🔥</span>
    <span>
      <span className="text-gray-800">Économisez</span>{' '}
      <span className="text-purple-600 text-xl font-extrabold">2 mois</span>{' '}
      <span className="text-gray-800">avec le plan annuel !</span>
    </span>
  </p>
</div>


      {/* Cartes de plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const planColor = planColors[index % planColors.length];
          const displayPrice = getPlanPrice(plan.price);

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                plan.popular ? 'border-purple-500' : 'border-gray-200'
              } flex flex-col justify-between min-h-[400px]`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 translate-y-[-50%]">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ⭐ Populaire
                  </span>
                </div>
              )}

              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${planColor} flex items-center justify-center mb-6 mx-auto`}
              >
                <Building className="w-10 h-10 text-white" />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {displayPrice}€
                  <span className="text-lg text-gray-500">
                    /{isAnnual ? 'an' : 'mois'}
                  </span>
                </div>
                <p className="text-gray-600">{plan.employees} Employés</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <Loader2 className="animate-spin w-5 h-5 mr-2 text-white" />
                    Chargement...
                  </span>
                ) : (
                  'Acheter maintenant'
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal de création d’entreprise */}
      <CompanyModal
        show={showCompanyForm}
        onClose={() => setShowCompanyForm(false)}
        onSubmit={handleSubmitCompany}
        loading={loading}
        companyName={companyName}
        setCompanyName={setCompanyName}
        description={description}
        setDescription={setDescription}
        address={address}
        setAddress={setAddress}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        siretNumber={siretNumber}
        setSiretNumber={setSiretNumber}
        ownerData={ownerData}
        handleOwnerChange={handleOwnerChange}
      />
    </div>
  );
};

export default PlansComponent;
