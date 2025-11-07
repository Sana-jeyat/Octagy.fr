'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import { Brain, Twitter, Linkedin, Github, MessageCircle, Mail } from 'lucide-react'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'

export function Footer() {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)



  const navigation = {
    plateforme: [
      { name: 'Formations', href: '/courses' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Communauté', href: '/community' },
      // { name: 'Staking', href: '/staking' },
    ],
    entreprise: [
      { name: 'Solutions Entreprise', href: '/enterprise' },
      // { name: 'Knowledge Stipend', href: '/stipend' },
      { name: 'Partenaires Formation', href: '/partners' },
      // { name: 'API', href: '/api' },
    ],
    ressources: [
      // { name: 'Documentation', href: '/docs' },
      // { name: 'Litepaper', href: '/litepaper' },
      { name: 'Blog', href: 'https://www.knocoin.com/blog/', external: true },

      { name: 'Support', href: '/support' },
    ],
    legal: [
      { name: 'Conditions d\'utilisation', href: '/terms' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'Conformité MiCA', href: '/compliance' },
      { name: 'Cookies', href: '/cookies' },
    ],
  }

  const social = [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
    },
    {
      name: 'Discord',
      href: '#',
      icon: MessageCircle,
    },
  ]

const sendEmail = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      { email, message },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    )

    toast.success('Message envoyé avec succès !', { duration: 4000 }) 
    setEmail('')
    setMessage('')
  } catch (error) {
    console.error('Erreur EmailJS:', error)
    toast.error('Une erreur est survenue, veuillez réessayer.', { duration: 4000 }) 
  } finally {
    setLoading(false)
  }
}


  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-100 h-10 rounded-xl overflow-hidden">
  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
  
</div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              La première plateforme Learn-to-Earn qui transforme votre apprentissage en récompenses concrètes. 
              Développez vos compétences, gagnez des tokens KNO.
            </p>

            <div className="flex space-x-4">
              {social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Plateforme
            </h3>
            <ul className="space-y-3">
              {navigation.plateforme.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {navigation.entreprise.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Ressources
            </h3>
            <ul className="space-y-3">
  {navigation.ressources.map((item) => (
    <li key={item.name}>
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          {item.name}
        </a>
      ) : (
        <Link
          href={item.href}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {item.name}
        </Link>
      )}
    </li>
  ))}
</ul>

          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Légal
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

       {/* Formulaire Contact */}
 <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Une question ? Un partenariat ?
            </h3>
            <p className="text-gray-300">
              Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <form onSubmit={sendEmail} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />

            <input
              type="text"
              name="message"
              placeholder="Votre message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center disabled:opacity-50"
            >
              <Mail className="w-4 h-4 mr-2" />
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>

 {/* <Toaster position="bottom-right" /> */}

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Knowledge Process SA. Tous droits réservés.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Powered by Polygon</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Genève, Suisse</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}