'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email) {
      setError('L\'email est requis')
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setError('Format d\'email invalide')
      setIsLoading(false)
      return
    }

    // Simulation d'envoi d'email
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsEmailSent(true)
    } catch (error) {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KNO.ACADEMY
                </h1>
                <p className="text-sm text-gray-500">Learn to Earn</p>
              </div>
            </Link>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email envoyé !</h2>
            
            <p className="text-gray-600 mb-6">
              Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. 
              Vérifiez votre boîte de réception et suivez les instructions.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700">
                <strong>Vous ne voyez pas l'email ?</strong><br />
                Vérifiez votre dossier spam ou attendez quelques minutes.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold inline-block"
              >
                Retour à la connexion
              </Link>
              
              <button
                onClick={() => {
                  setIsEmailSent(false)
                  setEmail('')
                }}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Renvoyer l'email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                KNO.ACADEMY
              </h1>
              <p className="text-sm text-gray-500">Learn to Earn</p>
            </div>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié ?</h2>
            <p className="text-gray-600">
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Envoyer le lien de réinitialisation'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link href="/auth/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 Knowledge Process SA. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}