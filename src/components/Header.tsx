'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Wallet, User, LogOut } from 'lucide-react'
import { useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import WalletButton from './WalletButton'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated, logout, isAuthInitialized } = useContext(AuthContext)


  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
    router.push('/')
  }

  

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Formations', href: '/courses' },
    // { name: 'Communauté', href: '/community' },
    // { name: 'Partenaires', href: '/partners' },
    { name: 'Abonnements', href: '/enterprise' },
    ...(isAuthenticated ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ]

  
  if (!isAuthInitialized) return null

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <nav className="mx-auto max-w-full px-6 lg:px-8 ml-4 mr-4" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="w-32 h-10">
            <Link href="/" className="block w-40 h-16"> {/*modfier la position du logo ou l'agrandir */}
              <img 
                src="/logo-octagy.png" 
                alt="Logo" 
                className="w-full h-full object-cover" 
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {isAuthenticated && <WalletButton />}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <button
              type="button"
              className="p-2 text-gray-700 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 space-y-2">
                {isAuthenticated && (
                  <WalletButton />
                )}

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-lg mx-3"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg mx-3"
                  >
                    <User className="w-4 h-4" />
                    <span>Connexion</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
