import { Hero } from '@/components/Hero'
import { LearnToEarn } from '@/components/LearnToEarn'
import { Gamification } from '@/components/Gamification'
import { Features } from '@/components/Features'
import { Tokenomics } from '@/components/Tokenomics'
import { Roadmap } from '@/components/Roadmap'
import { Team } from '@/components/Team'
import { CTA } from '@/components/CTA'
import Link from 'next/link'
import { Building2, Users, TrendingUp, Shield } from 'lucide-react'

export default function Home() {
  return (
    <main>
      <Hero />
      <LearnToEarn />
      <Features />
      <Gamification />
      
      {/* Section Partenaires */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Nos{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Partenaires
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              <strong>KNO connecte les savoirs, les partenaires restent les formateurs.</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nous valorisons les formations de nos partenaires en les intégrant dans le parcours global 
              des utilisateurs, tout en offrant visibilité et reporting centralisé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">OCTAGY Formation</h3>
              <p className="text-gray-600 mb-4">Organisme Qualiopi spécialisé en formation médicale et pharmaceutique</p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Université de Genève</h3>
              <p className="text-gray-600 mb-4">Formations universitaires et recherche de pointe</p>
              <div className="text-sm text-blue-700 font-semibold">234 étudiants connectés</div>
            </div>
              <div className="text-sm text-green-700 font-semibold">847 apprenants synchronisés</div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">EPFL Extension</h3>
              <p className="text-gray-600 mb-4">Formation continue en ingénierie et technologie</p>
              <div className="text-sm text-purple-700 font-semibold">166 professionnels formés</div>
            </div>
          </div>
            </div>
          <div className="text-center">
            <Link
              href="/partners"
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg"
            >
              Découvrir nos partenaires
            </Link>
          </div>
        </div>
      </section>
      
      <Tokenomics />
      <Team />
      <CTA />
    </main>
  )
}