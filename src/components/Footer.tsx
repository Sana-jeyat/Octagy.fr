import Link from 'next/link'
import { Brain, Twitter, Linkedin, Github, MessageCircle, Mail } from 'lucide-react'

export function Footer() {
  const navigation = {
    plateforme: [
      { name: 'Formations', href: '/courses' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Communauté', href: '/community' },
      { name: 'Staking', href: '/staking' },
    ],
    entreprise: [
      { name: 'Solutions Entreprise', href: '/enterprise' },
      { name: 'Knowledge Stipend', href: '/stipend' },
      { name: 'Partenaires Formation', href: '/partners' },
      { name: 'API', href: '/api' },
    ],
    ressources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Litepaper', href: '/litepaper' },
      { name: 'Blog', href: '/blog' },
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

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  KNO.ACADEMY
                </h1>
                <p className="text-xs text-gray-400">Learn to Earn</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              La première plateforme Learn-to-Earn qui transforme votre apprentissage en récompenses concrètes. 
              Développez vos compétences, gagnez des tokens $KNO.
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

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Restez informé des dernières nouveautés
              </h3>
              <p className="text-gray-300">
                Recevez les updates sur les nouveaux cours, tokens et fonctionnalités.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                S'abonner
              </button>
            </div>
          </div>
        </div>

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