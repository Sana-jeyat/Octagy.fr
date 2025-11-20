'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validatePassword = (pass: string) => {
    return pass.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pass)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!token) {
      toast.error("Lien de réinitialisation invalide ou expiré.")
      return
    }

    const validationErrors: typeof errors = {}

    if (!password) {
      validationErrors.password = "Le mot de passe est requis"
    } else if (!validatePassword(password)) {
      validationErrors.password = "Mot de passe trop faible (8 caractères, majuscule, minuscule, chiffre)"
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirmez votre mot de passe"
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/reset-password/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Mot de passe réinitialisé avec succès !")
        router.push("/auth/login")
      } else {
        toast.error(data.error || "Une erreur est survenue.")
      }
    } catch (error) {
      toast.error("Erreur réseau ou serveur.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nouveau mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirmez le mot de passe</label>
            <input
              type="password"
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  )
}
