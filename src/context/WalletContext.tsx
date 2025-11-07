'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Remplace ça par les vraies infos du contrat
const KNO_TOKEN_ADDRESS = '0x236fbfAa3Ec9E0B9BA013Df370c098bAd85aD631'
const KNO_TOKEN_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
]

interface WalletContextProps {
  address: string | null
  knoBalance: number | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [knoBalance, setKnoBalance] = useState<number | null>(null)

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Veuillez installer MetaMask.')
      return
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const userAddress = await signer.getAddress()

    setAddress(userAddress)

    // Fetch solde KNO
    const knoContract = new ethers.Contract(KNO_TOKEN_ADDRESS, KNO_TOKEN_ABI, provider)
    const rawBalance = await knoContract.balanceOf(userAddress)
    const decimals = await knoContract.decimals()
    const formatted = parseFloat(ethers.formatUnits(rawBalance, decimals))

    setKnoBalance(formatted)
  }

  const disconnectWallet = () => {
    setAddress(null)
    setKnoBalance(null)
  }

  return (
    <WalletContext.Provider value={{ address, knoBalance, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

// Hook pour l'utiliser facilement
export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}
