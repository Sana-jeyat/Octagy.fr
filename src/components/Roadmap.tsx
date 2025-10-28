import { Calendar, CheckCircle, Clock, Zap } from 'lucide-react'

const roadmapItems = [
  {
    quarter: 'Q4 2025',
    title: 'Lancement Plateforme V1',
    status: 'completed',
    items: [
      'Site web vitrine et catalogue de cours',
      'Système d\'authentification et profils utilisateurs',
      'Premiers 100 cours disponibles',
      'Token $KNO sur Polygon',
      'Intégration Metamask et Rabby'
    ]
  },
  {
    quarter: 'Q1 2026',
    title: 'Gamification & Staking',
    status: 'in-progress',
    items: [
      'Knowledge Pools et staking avancé',
      'Système de badges et classements',
      'DAO et gouvernance communautaire',
      'KNObro IA pour recommandations',
      'Partenariats avec 50+ formateurs'
    ]
  },
  {
    quarter: 'Q2 2026',
    title: 'Expansion Entreprise',
    status: 'planned',
    items: [
      'Dashboard entreprise (Knowledge Stipend)',
      'Espace sponsors et suivi ROI',
      'API pour intégrations tierces',
      'Certification blockchain',
      'Support multilingue (EN, DE, ES)'
    ]
  },
  {
    quarter: 'Q3 2026',
    title: 'Écosystème Global',
    status: 'planned',
    items: [
      'Sidequests et événements communautaires',
      'Marketplace de NFT éducatifs',
      'Intégration réalité virtuelle',
      'Expansion internationale',
      '1000+ cours disponibles'
    ]
  }
]

export function Roadmap() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'in-progress':
        return <Zap className="w-6 h-6 text-blue-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500'
      case 'in-progress':
        return 'from-blue-500 to-cyan-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Roadmap{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              2025-2026
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Notre vision pour révolutionner l'éducation et créer la plus grande économie de la connaissance au monde.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 hidden lg:block"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                <div className={`lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-purple-500 rounded-full hidden lg:block z-10"></div>

                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getStatusColor(item.status)}`}>
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-lg font-bold text-purple-600">{item.quarter}</span>
                        </div>
                        {getStatusIcon(item.status)}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>

                      {/* Features list */}
                      <ul className="space-y-3">
                        {item.items.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Status badge */}
                      <div className="mt-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : item.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'completed' && 'Terminé'}
                          {item.status === 'in-progress' && 'En cours'}
                          {item.status === 'planned' && 'Planifié'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Participez à la révolution de l'éducation
            </h3>
            <p className="text-gray-600 mb-6">
              Rejoignez notre communauté et aidez-nous à construire l'avenir de l'apprentissage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold">
                Rejoindre la DAO
              </button>
              <button className="border border-purple-300 text-purple-700 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
                Voir le Litepaper
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}