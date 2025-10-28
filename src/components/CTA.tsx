import Link from 'next/link'
import { ArrowRight, Zap, Users, Trophy } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
            Prêt à transformer votre{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              apprentissage
            </span>{' '}
            en revenus ?
          </h2>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-12 leading-relaxed">
            Rejoignez plus de <strong>12,000 apprenants</strong> qui gagnent déjà des tokens $KNO 
            en développant leurs compétences sur KNO.ACADEMY.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">12,000+</div>
              <div className="text-purple-200 text-sm">Apprenants actifs</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">2.8M</div>
              <div className="text-purple-200 text-sm">$KNO distribués</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">300+</div>
              <div className="text-purple-200 text-sm">Formations disponibles</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-purple-600 bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Commencer maintenant
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30">
              <Zap className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              Connecter Wallet
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-purple-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Sécurisé par Polygon</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Conforme MiCA & FINMA</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Smart Contracts Audités</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}