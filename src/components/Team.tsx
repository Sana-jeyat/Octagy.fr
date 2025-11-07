import { Linkedin, Twitter, Github } from 'lucide-react'

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-fondatrice',
    bio: 'Ex-Google, PhD en IA. 15 ans d\'expérience dans l\'EdTech et la blockchain.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Marc Dubois',
    role: 'CTO & Co-fondateur',
    bio: 'Ancien Lead Developer chez Ethereum Foundation. Expert en smart contracts.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Head of Education',
    bio: 'Ex-Coursera, 12 ans dans la création de contenus pédagogiques innovants.',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Thomas Weber',
    role: 'Head of Tokenomics',
    bio: 'Ancien analyste quantitatif chez Goldman Sachs. Expert en DeFi et tokenomics.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  }
]

const advisors = [
  {
    name: 'Prof. Jean-Michel Dalle',
    role: 'Advisor - Sorbonne Université',
    expertise: 'Économie numérique et innovation'
  },
  {
    name: 'Andreas Antonopoulos',
    role: 'Blockchain Advisor',
    expertise: 'Bitcoin et technologies décentralisées'
  },
  {
    name: 'Dr. Fei-Fei Li',
    role: 'AI Advisor',
    expertise: 'Intelligence artificielle et vision par ordinateur'
  }
]

export function Team() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Notre{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Équipe
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Une équipe d'experts passionnés, unis par la vision de démocratiser l'accès à l'éducation de qualité.
          </p>
        </div>

        {/* Core Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {team.map((member, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        {/* <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Conseillers Stratégiques
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100">
                <h4 className="font-bold text-gray-900 mb-2">{advisor.name}</h4>
                <p className="text-purple-600 font-semibold text-sm mb-2">{advisor.role}</p>
                <p className="text-gray-600 text-sm">{advisor.expertise}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Join Team CTA */}
        {/* <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Rejoignez notre équipe !
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Nous recherchons des talents passionnés pour nous aider à construire l'avenir de l'éducation. 
              Découvrez nos opportunités de carrière.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Voir les postes ouverts
            </button>
          </div>
        </div> */}
      </div>
    </section>
  )
}