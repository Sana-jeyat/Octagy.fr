'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Menu, X, Wallet, User, BookOpen } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue', href: '/courses' },
    { name: 'Communauté', href: '/community' },
    { name: 'Partenaires', href: '/partners' },
    { name: 'Entreprises', href: '/enterprise' },
    { name: 'Dashboard', href: '/dashboard' }
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KNO.ACADEMY
                </h1>
                <p className="text-xs text-gray-500">Learn to Earn</p>
              </div>
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
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Wallet className="w-4 h-4" />
              <span>Wallet</span>
            </button>
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              <User className="w-4 h-4" />
              <span>Connexion</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="p-2 text-gray-700 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
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
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-purple-600 w-full">
                  <Wallet className="w-4 h-4" />
                  <span>Wallet</span>
                </button>
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-2 rounded-lg mx-3"
                >
                  <User className="w-4 h-4" />
                  <span>Connexion</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}