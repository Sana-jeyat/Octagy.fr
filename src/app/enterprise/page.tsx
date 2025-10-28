'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Building, 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Download,
  FileText,
  Calendar,
  Zap,
  Shield,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Star,
  Trophy,
  Brain,
  DollarSign,
  Globe,
  Briefcase,
  Settings,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  PlayCircle,
  BookOpen,
  GraduationCap,
  Flame,
  ChevronRight,
  Activity,
  RefreshCw,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  Database,
  Upload,
  Key,
  Monitor,
  Smartphone,
  Bell,
  X
} from 'lucide-react'

export default function EnterprisePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPlan, setSelectedPlan] = useState('grow')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [totalEmployees, setTotalEmployees] = useState(247)
  const [activeEmployees, setActiveEmployees] = useState(189)
  const [totalHours, setTotalHours] = useState(3456)
  const [avgProgress, setAvgProgress] = useState(73)
  const [tokensDistributed, setTokensDistributed] = useState(12847)
  const [certificatesIssued, setCertificatesIssued] = useState(156)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalHours(prev => prev + Math.floor(Math.random() * 2))
      setAvgProgress(prev => Math.min(100, prev + Math.random() * 0.5))
      setTokensDistributed(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const plans = [
    {
      id: 'start',
      name: 'Knowledge Stipend Start',
      price: '€49',
      period: '/mois',
      employees: 'Jusqu\'à 25 employés',
      features: [
        'Dashboard RH basique',
        'Suivi progression individuelle',
        'Rapports mensuels',
        'Support email',
        'Catalogue complet de cours'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'grow',
      name: 'Knowledge Stipend Grow',
      price: '€149',
      period: '/mois',
      employees: 'Jusqu\'à 100 employés',
      features: [
        'Dashboard RH avancé',
        'Défis collectifs d\'entreprise',
        'Rapports personnalisés',
        'Support prioritaire',
        'Gamification B2B',
        'Intégration SIRH',
        'Certificats personnalisés'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Knowledge Stipend Enterprise',
      price: 'Sur mesure',
      period: '',
      employees: 'Illimité',
      features: [
        'Dashboard RH sur mesure',
        'API complète',
        'White-label possible',
        'Support dédié 24/7',
        'Formations personnalisées',
        'Intégrations avancées',
        'Conformité entreprise',
        'Onboarding personnalisé'
      ],
      color: 'from-orange-500 to-red-500',
      popular: false
    }
  ]

  const companyStats = [
    {
      label: 'Employés actifs',
      value: activeEmployees,
      total: totalEmployees,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Heures totales',
      value: `${totalHours}h`,
      change: '+28%',
      trend: 'up',
      icon: Clock,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Progression moyenne',
      value: `${Math.round(avgProgress)}%`,
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Certificats obtenus',
      value: certificatesIssued,
      change: '+15%',
      trend: 'up',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const departments = [
    { id: 'all', name: 'Tous les départements', employees: 247, hours: 3456, progress: 73 },
    { id: 'rd', name: 'R&D', employees: 45, hours: 890, progress: 82 },
    { id: 'it', name: 'IT', employees: 38, hours: 756, progress: 78 },
    { id: 'marketing', name: 'Marketing', employees: 32, hours: 640, progress: 75 },
    { id: 'finance', name: 'Finance', employees: 28, hours: 512, progress: 68 },
    { id: 'hr', name: 'RH', employees: 24, hours: 480, progress: 85 },
    { id: 'sales', name: 'Commercial', employees: 35, hours: 630, progress: 70 },
    { id: 'operations', name: 'Opérations', employees: 45, hours: 548, progress: 65 }
  ]

  const employees = [
    { 
      id: 1, 
      name: 'Sarah Chen', 
      department: 'R&D', 
      avatar: '👩‍🔬', 
      hours: 45, 
      progress: 85, 
      certificates: 8, 
      tokens: 1250, 
      streak: 23,
      lastActivity: '2025-01-15',
      courses: [
        { name: 'Blockchain Fundamentals', progress: 100, hours: 12, partner: 'KNO' },
        { name: 'IA Médicale', progress: 75, hours: 8, partner: 'Université de Genève' },
        { name: 'AFGSU2', progress: 60, hours: 6, partner: 'OCTAGY' }
      ],
      objectives: [
        { title: 'Certification Blockchain', progress: 85, deadline: '2025-02-15' },
        { title: 'Formation IA Équipe', progress: 60, deadline: '2025-03-01' }
      ]
    },
    { 
      id: 2, 
      name: 'Marc Dubois', 
      department: 'IT', 
      avatar: '👨‍💻', 
      hours: 42, 
      progress: 78, 
      certificates: 6, 
      tokens: 1180, 
      streak: 19,
      lastActivity: '2025-01-14',
      courses: [
        { name: 'React Masterclass', progress: 90, hours: 15, partner: 'KNO' },
        { name: 'DevOps Avancé', progress: 65, hours: 10, partner: 'KNO' }
      ],
      objectives: [
        { title: 'Certification React', progress: 90, deadline: '2025-01-31' }
      ]
    },
    { 
      id: 3, 
      name: 'Lisa Rodriguez', 
      department: 'Marketing', 
      avatar: '👩‍💼', 
      hours: 38, 
      progress: 75, 
      certificates: 5, 
      tokens: 1050, 
      streak: 15,
      lastActivity: '2025-01-13',
      courses: [
        { name: 'Marketing Digital', progress: 100, hours: 12, partner: 'KNO' },
        { name: 'Growth Hacking', progress: 50, hours: 8, partner: 'KNO' }
      ],
      objectives: [
        { title: 'Certification Marketing', progress: 75, deadline: '2025-02-28' }
      ]
    }
  ]

  const teamChallenges = [
    {
      id: 1,
      title: 'Objectif 200h Formation Équipe Marketing',
      description: 'Atteindre 200 heures de formation collective pour l\'équipe marketing ce trimestre',
      progress: 67,
      participants: 32,
      timeLeft: '45 jours',
      reward: '€1000 + Team Building',
      status: 'active',
      icon: '🎯',
      department: 'Marketing',
      target: 200,
      current: 134
    },
    {
      id: 2,
      title: 'Certification Blockchain R&D',
      description: 'Au moins 30 employés R&D certifiés en blockchain avant fin février',
      progress: 40,
      participants: 28,
      timeLeft: '32 jours',
      reward: '€1500 + Prime innovation',
      status: 'active',
      icon: '🏆',
      department: 'R&D',
      target: 30,
      current: 12
    },
    {
      id: 3,
      title: 'Semaine Innovation IA',
      description: 'Tous les départements participent aux cours IA cette semaine',
      progress: 85,
      participants: 67,
      timeLeft: '3 jours',
      reward: '€750 + Reconnaissance CEO',
      status: 'ending',
      icon: '🤖',
      department: 'Tous',
      target: 80,
      current: 68
    }
  ]

  const learningCategories = [
    { name: 'Blockchain & Crypto', hours: 890, percentage: 35, color: 'from-blue-500 to-cyan-500' },
    { name: 'Intelligence Artificielle', hours: 640, percentage: 25, color: 'from-purple-500 to-pink-500' },
    { name: 'Marketing Digital', hours: 510, percentage: 20, color: 'from-green-500 to-emerald-500' },
    { name: 'Finance & Trading', hours: 310, percentage: 12, color: 'from-orange-500 to-red-500' },
    { name: 'Autres', hours: 200, percentage: 8, color: 'from-gray-500 to-gray-600' }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Company Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companyStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {typeof stat.value === 'number' && stat.total ? 
                  `${stat.value}/${stat.total}` : 
                  stat.value
                }
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
              {stat.total && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(stat.value / stat.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Department Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <Building className="w-5 h-5 mr-2 text-purple-600" />
            Vue par Département
          </h3>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.filter(dept => selectedDepartment === 'all' || dept.id === selectedDepartment).map((dept, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-4">{dept.name}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Employés</span>
                  <span className="font-semibold">{dept.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heures totales</span>
                  <span className="font-semibold">{dept.hours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progression</span>
                  <span className="font-semibold">{dept.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dept.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-600" />
            Répartition par Thématique
          </h3>
          
          <div className="space-y-4">
            {learningCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{category.name}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">{category.percentage}%</div>
                    <div className="text-xs text-gray-500">{category.hours}h</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Employees */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-purple-600" />
            Top Employés du Mois
          </h3>
          
          <div className="space-y-4">
            {employees.slice(0, 5).map((employee, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedEmployee(employee)
                  setShowEmployeeModal(true)
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="text-2xl">{employee.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.department}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-purple-600">{employee.tokens} $KNO</div>
                  <div className="text-xs text-gray-500">{employee.hours}h</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Challenges */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Crédits iKNO Distribués
            </h3>
            <button className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors text-sm">
              <Plus className="w-4 h-4 inline mr-1" />
              Nouveau
            </button>
          </div>
          
          <div className="space-y-4">
            {teamChallenges.slice(0, 3).map((challenge) => (
              <div key={challenge.id} className={`border rounded-xl p-4 ${
                challenge.status === 'ending' ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                      <p className="text-sm text-gray-600">{challenge.department}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progression</span>
                    <span className="font-semibold">{challenge.current}/{challenge.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{challenge.participants} participants</span>
                  <span className="text-orange-600 font-semibold">{challenge.timeLeft}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmployees = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Gestion des Employés
          </h3>
          <div className="flex space-x-3">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Employé</th>
                <th className="text-left py-3 px-4 font-semibold">Département</th>
                <th className="text-left py-3 px-4 font-semibold">Heures</th>
                <th className="text-left py-3 px-4 font-semibold">Progression</th>
                <th className="text-left py-3 px-4 font-semibold">Certificats</th>
                <th className="text-left py-3 px-4 font-semibold">Streak</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{employee.avatar}</div>
                      <div>
                        <div className="font-semibold">{employee.name}</div>
                        <div className="text-sm text-gray-500">Dernière activité: {employee.lastActivity}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{employee.department}</td>
                  <td className="py-3 px-4">{employee.hours}h</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                          style={{ width: `${employee.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{employee.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{employee.certificates}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{employee.streak}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setShowEmployeeModal(true)
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                        <UserMinus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPlans = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choisissez votre plan Knowledge Stipend</h2>
        <p className="text-xl text-gray-600">Solutions adaptées à la taille de votre entreprise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
              plan.popular ? 'border-purple-300 scale-105' : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ⭐ Populaire
                </span>
              </div>
            )}

            <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
              <Building className="w-8 h-8 text-white" />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {plan.price}
                <span className="text-lg text-gray-500">{plan.period}</span>
              </div>
              <p className="text-gray-600">{plan.employees}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              {plan.id === 'enterprise' ? 'Nous contacter' : 'Commencer l\'essai gratuit'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
            Rapports & Analytics
          </h3>
          <div className="flex space-x-3">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">89%</div>
            <div className="text-sm text-blue-700">Taux de participation</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-600">4.7/5</div>
            <div className="text-sm text-green-700">Satisfaction moyenne</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-purple-700">Certificats obtenus</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">€12,450</div>
            <div className="text-sm text-orange-700">ROI formation</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-bold mb-4">Rapports disponibles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold mb-2">Rapport mensuel de progression</h5>
              <p className="text-sm text-gray-600 mb-3">Détail des heures, certifications et ROI par employé</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                Générer le rapport →
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold mb-2">Analyse des compétences</h5>
              <p className="text-sm text-gray-600 mb-3">Cartographie des compétences acquises par département</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                Générer le rapport →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solutions{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Entreprises
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Formez, financez, mesurez. Dashboard simple et reporting clair pour optimiser vos investissements formation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg">
                <div className="text-2xl font-bold text-green-600">{tokensDistributed.toLocaleString()}</div>
                <div className="text-sm text-green-700">Crédits iKNO distribués</div>
              </button>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Information importante</h4>
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Crédits de formation (iKNO) distribués aux employés.</strong>
                </p>
                <p className="text-xs text-blue-600">
                  Chaque employé peut convertir ses iKNO en $KNO après avoir validé son profil (KYC).
                  Ce processus reste personnel et individuel.
                </p>
              </div>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Dashboard RH', icon: BarChart3 },
              { id: 'employees', name: 'Employés', icon: Users },
              { id: 'plans', name: 'Knowledge Stipend', icon: Building },
              { id: 'reports', name: 'Rapports', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
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
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'plans' && renderPlans()}
        {activeTab === 'reports' && renderReports()}
      </div>

      {/* Employee Modal */}
      {showEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedEmployee.avatar}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedEmployee.name}</h3>
                    <p className="text-gray-600">{selectedEmployee.department}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEmployeeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedEmployee.hours}h</div>
                  <div className="text-sm text-blue-700">Heures totales</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedEmployee.progress}%</div>
                  <div className="text-sm text-green-700">Progression</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedEmployee.certificates}</div>
                  <div className="text-sm text-purple-700">Certificats</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{selectedEmployee.tokens}</div>
                  <div className="text-sm text-orange-700">$KNO gagnés</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4">Formations en cours</h4>
                  <div className="space-y-4">
                    {selectedEmployee.courses.map((course, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold">{course.name}</h5>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {course.partner}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{course.hours}h complétées</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4">Objectifs entreprise</h4>
                  <div className="space-y-4">
                    {selectedEmployee.objectives.map((objective, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-semibold mb-2">{objective.title}</h5>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression</span>
                          <span>{objective.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                            style={{ width: `${objective.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Échéance: {objective.deadline}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}