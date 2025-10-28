'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Lock,
  Download,
  Share2,
  Heart,
  MessageCircle,
  TrendingUp,
  Target,
  Zap,
  ChevronRight,
  ChevronDown,
  Globe,
  Shield,
  Trophy
} from 'lucide-react'

// Mock course data (in real app, this would come from API)
const courseData = {
  1: {
    id: 1,
    title: 'Blockchain Fundamentals & Smart Contracts',
    category: 'Blockchain & Crypto',
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Ex-Google, PhD en Computer Science. 15 ans d\'expérience dans la blockchain et les cryptomonnaies.',
      rating: 4.9,
      students: 12847,
      courses: 8
    },
    duration: '6h 30min',
    lessons: 24,
    students: 2847,
    rating: 4.9,
    reviewCount: 342,
    price: { fiat: 149, kno: 175 },
    reward: 45,
    level: 'Débutant',
    language: 'Français',
    description: 'Maîtrisez les fondamentaux de la blockchain et créez vos premiers smart contracts sur Ethereum. Ce cours complet vous guidera depuis les concepts de base jusqu\'à la création de contrats intelligents fonctionnels.',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Ethereum', 'Solidity', 'DeFi', 'NFT', 'Web3'],
    progress: 0,
    completionRate: 87,
    avgTimeToComplete: '2 semaines',
    lastUpdated: '2025-01-15',
    certificate: true,
    downloadable: true,
    
    whatYouWillLearn: [
      'Comprendre les principes fondamentaux de la blockchain',
      'Créer et déployer des smart contracts sur Ethereum',
      'Utiliser Solidity pour programmer des contrats intelligents',
      'Interagir avec les protocoles DeFi existants',
      'Créer et gérer des tokens ERC-20 et NFT',
      'Sécuriser vos smart contracts contre les vulnérabilités',
      'Utiliser les outils de développement Web3',
      'Comprendre l\'écosystème DeFi et ses opportunités'
    ],

    requirements: [
      'Connaissances de base en programmation (JavaScript recommandé)',
      'Ordinateur avec connexion internet',
      'Wallet Metamask installé',
      'Motivation pour apprendre les technologies blockchain'
    ],

    curriculum: [
      {
        title: 'Introduction à la Blockchain',
        lessons: 6,
        duration: '1h 30min',
        completed: 0,
        lessons_detail: [
          { title: 'Qu\'est-ce que la blockchain ?', duration: '15min', type: 'video', completed: false },
          { title: 'Histoire et évolution', duration: '12min', type: 'video', completed: false },
          { title: 'Consensus et minage', duration: '18min', type: 'video', completed: false },
          { title: 'Bitcoin vs Ethereum', duration: '20min', type: 'video', completed: false },
          { title: 'Quiz : Fondamentaux', duration: '10min', type: 'quiz', completed: false },
          { title: 'Exercice pratique', duration: '15min', type: 'exercise', completed: false }
        ]
      },
      {
        title: 'Ethereum et Smart Contracts',
        lessons: 8,
        duration: '2h 15min',
        completed: 0,
        lessons_detail: [
          { title: 'Architecture d\'Ethereum', duration: '20min', type: 'video', completed: false },
          { title: 'Gas et frais de transaction', duration: '15min', type: 'video', completed: false },
          { title: 'Introduction aux smart contracts', duration: '25min', type: 'video', completed: false },
          { title: 'Remix IDE et outils de développement', duration: '18min', type: 'video', completed: false },
          { title: 'Premier smart contract', duration: '30min', type: 'exercise', completed: false },
          { title: 'Déploiement sur testnet', duration: '20min', type: 'exercise', completed: false },
          { title: 'Quiz : Ethereum', duration: '12min', type: 'quiz', completed: false },
          { title: 'Projet : Contrat de vote', duration: '35min', type: 'project', completed: false }
        ]
      },
      {
        title: 'Programmation Solidity',
        lessons: 10,
        duration: '2h 45min',
        completed: 0,
        lessons_detail: [
          { title: 'Syntaxe de base Solidity', duration: '25min', type: 'video', completed: false },
          { title: 'Types de données et variables', duration: '20min', type: 'video', completed: false },
          { title: 'Fonctions et modificateurs', duration: '22min', type: 'video', completed: false },
          { title: 'Héritage et interfaces', duration: '18min', type: 'video', completed: false },
          { title: 'Gestion des erreurs', duration: '15min', type: 'video', completed: false },
          { title: 'Events et logs', duration: '12min', type: 'video', completed: false },
          { title: 'Exercice : Token ERC-20', duration: '35min', type: 'exercise', completed: false },
          { title: 'Exercice : NFT Collection', duration: '40min', type: 'exercise', completed: false },
          { title: 'Quiz : Solidity', duration: '15min', type: 'quiz', completed: false },
          { title: 'Projet final', duration: '23min', type: 'project', completed: false }
        ]
      }
    ],

    reviews: [
      {
        id: 1,
        user: 'Alexandre M.',
        avatar: '👨‍💻',
        rating: 5,
        date: '2025-01-10',
        comment: 'Excellent cours ! Les explications sont claires et les exercices pratiques permettent de bien assimiler. J\'ai pu créer mon premier token en suivant ce cours.',
        helpful: 23
      },
      {
        id: 2,
        user: 'Marie L.',
        avatar: '👩‍🎓',
        rating: 5,
        date: '2025-01-08',
        comment: 'Dr. Chen explique très bien les concepts complexes. Le cours est bien structuré et les 45 $KNO gagnés sont un bonus motivant !',
        helpful: 18
      },
      {
        id: 3,
        user: 'Thomas R.',
        avatar: '👨‍🔬',
        rating: 4,
        date: '2025-01-05',
        comment: 'Très bon contenu, peut-être un peu rapide pour les débutants complets. Mais avec de la pratique, tout devient clair.',
        helpful: 12
      }
    ]
  }
}

export default function CoursePage() {
  const params = useParams()
  const courseId = parseInt(params.id as string)
  const course = courseData[courseId as keyof typeof courseData]
  
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSection, setExpandedSection] = useState<number | null>(0)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('kno')

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cours non trouvé</h1>
          <Link href="/courses" className="text-purple-600 hover:text-purple-700">
            Retour aux formations
          </Link>
        </div>
      </div>
    )
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800'
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800'
      case 'Avancé': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />
      case 'quiz': return <Target className="w-4 h-4" />
      case 'exercise': return <BookOpen className="w-4 h-4" />
      case 'project': return <Trophy className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    // Here you would handle the actual enrollment logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <nav className="flex items-center space-x-2 text-purple-200 mb-4">
                <Link href="/courses" className="hover:text-white">Formations</Link>
                <ChevronRight className="w-4 h-4" />
                <span>{course.category}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{course.title}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>

              <p className="text-xl text-purple-100 mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <div className="flex items-center space-x-1 text-purple-200">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                  <span>({course.reviewCount.toLocaleString()} avis)</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-200">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} étudiants</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-200">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-200">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags.map((tag, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{course.instructor.name}</div>
                  <div className="text-purple-200 text-sm">
                    {course.instructor.students.toLocaleString()} étudiants • {course.instructor.courses} cours
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {paymentMethod === 'kno' ? `${course.price.kno} $KNO` : `${course.price.fiat}€`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {paymentMethod === 'kno' ? `ou ${course.price.fiat}€` : `ou ${course.price.kno} $KNO`}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('kno')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      paymentMethod === 'kno'
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Payer en $KNO
                  </button>
                  <button
                    onClick={() => setPaymentMethod('fiat')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      paymentMethod === 'fiat'
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Payer en €
                  </button>
                </div>

                {!isEnrolled ? (
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold mb-4"
                  >
                    S'inscrire maintenant
                  </button>
                ) : (
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold mb-4 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Inscrit
                  </button>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Zap className="w-5 h-5" />
                    <span className="font-semibold">Récompense Learn-to-Earn</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mt-1">
                    +{course.reward} $KNO
                  </div>
                  <div className="text-sm text-green-600">
                    Gagnés à la fin du cours
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Durée totale</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Leçons</span>
                    <span className="font-semibold">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Niveau</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificat</span>
                    <span className="font-semibold text-green-600">✓ Inclus</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Accès</span>
                    <span className="font-semibold">À vie</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', name: 'Aperçu', icon: BookOpen },
                    { id: 'curriculum', name: 'Programme', icon: Target },
                    { id: 'instructor', name: 'Formateur', icon: Users },
                    { id: 'reviews', name: 'Avis', icon: MessageCircle }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ce que vous allez apprendre</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Prérequis</h2>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    {course.curriculum.map((section, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-900">{section.title}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              {section.lessons} leçons • {section.duration}
                            </div>
                          </div>
                          {expandedSection === index ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        
                        {expandedSection === index && (
                          <div className="border-t border-gray-200">
                            {section.lessons_detail.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                  {lesson.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <Lock className="w-5 h-5 text-gray-400" />
                                  )}
                                  <div className="flex items-center space-x-2">
                                    {getTypeIcon(lesson.type)}
                                    <span className="text-gray-900">{lesson.title}</span>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-full"
                      />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {course.instructor.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{course.instructor.bio}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{course.instructor.rating} note</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.instructor.students.toLocaleString()} étudiants</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.instructor.courses} cours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Avis des étudiants ({course.reviewCount})
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-xl font-bold">{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                                {review.avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{review.user}</div>
                                <div className="text-sm text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-purple-600">
                              <span>👍</span>
                              <span>Utile ({review.helpful})</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Statistiques du cours</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taux de réussite</span>
                  <span className="font-semibold text-green-600">{course.completionRate}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Temps moyen</span>
                  <span className="font-semibold">{course.avgTimeToComplete}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Dernière mise à jour</span>
                  <span className="font-semibold">{course.lastUpdated}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Ce cours inclut :</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-purple-500" />
                    <span>{course.duration} de vidéo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span>{course.lessons} leçons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-purple-500" />
                    <span>Ressources téléchargeables</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Certificat de fin</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span>Accès à vie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}