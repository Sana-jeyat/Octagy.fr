import { BookOpen, Coins, Users, Trophy, Shield, Zap, Target, Brain } from 'lucide-react'

const features = [
  {
    name: 'Formations Certifiantes',
    description: 'Plus de 300 cours dans les domaines les plus demandés : blockchain, IA, marketing digital, finance décentralisée.',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Récompenses $KNO',
    description: 'Gagnez des tokens $KNO pour chaque cours terminé, quiz réussi et objectif atteint. Votre apprentissage a une valeur réelle.',
    icon: Coins,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Communauté Active',
    description: 'Rejoignez une communauté de 12,000+ apprenants, participez aux groupes d\'étude et bénéficiez du mentorat peer-to-peer.',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Gamification',
    description: 'Système de badges, classements et défis pour maintenir votre motivation et mesurer vos progrès.',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Knowledge Pools',
    description: 'Stakez vos tokens $KNO dans nos pools de connaissance et générez des revenus passifs jusqu\'à 20% APY.',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'IA Personnalisée',
    description: 'Notre IA KNObro analyse votre progression et recommande les formations optimales pour maximiser vos gains.',
    icon: Brain,
    color: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Apprentissage Adaptatif',
    description: 'Parcours personnalisés qui s\'adaptent à votre rythme, vos objectifs et votre style d\'apprentissage.',
    icon: Target,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Certification Blockchain',
    description: 'Vos diplômes et certifications sont enregistrés sur la blockchain, garantissant leur authenticité à vie.',
    icon: Zap,
    color: 'from-orange-500 to-red-500'
  }
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Pourquoi choisir{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              KNO.ACADEMY
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Une plateforme révolutionnaire qui combine apprentissage de qualité, 
            récompenses tangibles et communauté engagée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.name}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3 rounded-full border border-purple-200">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-semibold">
              Rejoignez 12,000+ apprenants qui gagnent déjà des $KNO
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}