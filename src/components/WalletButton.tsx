
import { useWallet } from '@/context/WalletContext'

export default function WalletButton() {
  const { address, knoBalance, connectWallet, disconnectWallet } = useWallet()

  return (
    <button
      onClick={address ? disconnectWallet : connectWallet}
      className="text-sm px-4 py-2"
    >
      {address ? `${address.slice(0, 6)}...${address.slice(-4)} (${knoBalance?.toFixed(2)} KNO)` : 'Connect Wallet'}
    </button>
  )
}
