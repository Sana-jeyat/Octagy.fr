// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { 
//   Building2, 
//   Users, 
//   TrendingUp, 
//   Award, 
//   Clock, 
//   Target,
//   BarChart3,
//   PieChart,
//   Download,
//   FileText,
//   Calendar,
//   Zap,
//   Shield,
//   CheckCircle,
//   ArrowUp,
//   ArrowDown,
//   Star,
//   Trophy,
//   Brain,
//   DollarSign,
//   Globe,
//   Briefcase,
//   Settings,
//   Plus,
//   Filter,
//   Search,
//   Eye,
//   Edit,
//   MoreHorizontal,
//   Mail,
//   Phone,
//   MapPin,
//   ExternalLink,
//   PlayCircle,
//   BookOpen,
//   GraduationCap,
//   Flame,
//   ChevronRight,
//   Activity,
//   RefreshCw,
//   Database,
//   Upload,
//   Wifi,
//   WifiOff,
//   Key,
//   Lock,
//   Unlock,
//   AlertCircle,
//   Info,
//   Server,
//   Cloud,
//   HardDrive,
//   Cpu,
//   Monitor,
//   Smartphone
// } from 'lucide-react'

// export default function PartnersPage() {
//   const [activeTab, setActiveTab] = useState('overview')
//   const [connectedPartners, setConnectedPartners] = useState(3)
//   const [totalStudents, setTotalStudents] = useState(1247)
//   const [syncedHours, setSyncedHours] = useState(8934)
//   const [certificatesIssued, setCertificatesIssued] = useState(456)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTotalStudents(prev => prev + Math.floor(Math.random() * 2))
//       setSyncedHours(prev => prev + Math.floor(Math.random() * 5))
//       setCertificatesIssued(prev => prev + Math.floor(Math.random() * 1))
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const partners = [
//     {
//       id: 'octagy',
//       name: 'OCTAGY Formation',
//       logo: '🏥',
//       type: 'Organisme Qualiopi',
//       status: 'connected',
//       students: 847,
//       courses: 23,
//       certificates: 156,
//       lastSync: '2025-01-15 14:30',
//       apiKey: 'oct_live_***********4f2a',
//       description: 'Formation médicale et pharmaceutique certifiée',
//       specialties: ['Santé', 'Pharmacie', 'Urgences', 'AFGSU'],
//       syncMethod: 'API REST',
//       dataTypes: ['Progression', 'Temps', 'Certificats', 'Notes']
//     },
//     {
//       id: 'unige',
//       name: 'Université de Genève',
//       logo: '🎓',
//       type: 'Université',
//       status: 'connected',
//       students: 234,
//       courses: 12,
//       certificates: 89,
//       lastSync: '2025-01-15 12:15',
//       apiKey: 'unige_live_***********8b9c',
//       description: 'Formations universitaires et recherche',
//       specialties: ['Sciences', 'Médecine', 'Économie', 'Droit'],
//       syncMethod: 'API REST',
//       dataTypes: ['Progression', 'Crédits ECTS', 'Diplômes']
//     },
//     {
//       id: 'epfl',
//       name: 'EPFL Extension School',
//       logo: '⚡',
//       type: 'École Polytechnique',
//       status: 'pending',
//       students: 166,
//       courses: 8,
//       certificates: 45,
//       lastSync: 'En attente',
//       apiKey: 'Génération en cours...',
//       description: 'Formation continue en ingénierie et technologie',
//       specialties: ['Ingénierie', 'IA', 'Blockchain', 'Data Science'],
//       syncMethod: 'API REST',
//       dataTypes: ['Progression', 'Projets', 'Certificats']
//     }
//   ]

//   const partnerStats = [
//     {
//       label: 'Partenaires connectés',
//       value: connectedPartners,
//       change: '+1',
//       trend: 'up',
//       icon: Building2,
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       label: 'Étudiants synchronisés',
//       value: totalStudents.toLocaleString(),
//       change: '+12%',
//       trend: 'up',
//       icon: Users,
//       color: 'from-green-500 to-emerald-500'
//     },
//     {
//       label: 'Heures synchronisées',
//       value: `${syncedHours.toLocaleString()}h`,
//       change: '+28%',
//       trend: 'up',
//       icon: Clock,
//       color: 'from-purple-500 to-pink-500'
//     },
//     {
//       label: 'Certificats délivrés',
//       value: certificatesIssued,
//       change: '+15%',
//       trend: 'up',
//       icon: Award,
//       color: 'from-orange-500 to-red-500'
//     }
//   ]

//   const recentSyncs = [
//     {
//       partner: 'OCTAGY',
//       course: 'AFGSU2 - Urgences vitales',
//       student: 'Marie Dubois',
//       progress: 85,
//       hours: 12,
//       status: 'synced',
//       timestamp: '14:30'
//     },
//     {
//       partner: 'Université de Genève',
//       course: 'Pharmacologie Clinique',
//       student: 'Jean Martin',
//       progress: 100,
//       hours: 45,
//       status: 'completed',
//       timestamp: '12:15'
//     },
//     {
//       partner: 'OCTAGY',
//       course: 'Gestion Officine',
//       student: 'Sophie Chen',
//       progress: 60,
//       hours: 8,
//       status: 'synced',
//       timestamp: '11:45'
//     }
//   ]

//   const apiEndpoints = [
//     {
//       method: 'POST',
//       endpoint: '/api/partners/sync',
//       description: 'Synchroniser les données d\'un apprenant',
//       params: ['student_id', 'course_id', 'progress', 'hours', 'status']
//     },
//     {
//       method: 'GET',
//       endpoint: '/api/partners/students',
//       description: 'Récupérer la liste des apprenants',
//       params: ['partner_id', 'limit', 'offset']
//     },
//     {
//       method: 'POST',
//       endpoint: '/api/partners/certificate',
//       description: 'Délivrer un certificat',
//       params: ['student_id', 'course_id', 'certificate_data']
//     }
//   ]

//   const renderOverview = () => (
//     <div className="space-y-8">
//       {/* Partner Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {partnerStats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//                 <div className={`flex items-center space-x-1 text-sm ${
//                   stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
//                   <span>{stat.change}</span>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
//               <div className="text-gray-600 text-sm">{stat.label}</div>
//             </div>
//           )
//         })}
//       </div>

//       {/* Partners Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {partners.map((partner) => (
//           <div key={partner.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="text-3xl">{partner.logo}</div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">{partner.name}</h3>
//                   <p className="text-sm text-gray-500">{partner.type}</p>
//                 </div>
//               </div>
//               <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                 partner.status === 'connected' 
//                   ? 'bg-green-100 text-green-700' 
//                   : 'bg-yellow-100 text-yellow-700'
//               }`}>
//                 {partner.status === 'connected' ? '🟢 Connecté' : '🟡 En attente'}
//               </div>
//             </div>

//             <p className="text-gray-600 text-sm mb-4">{partner.description}</p>

//             <div className="grid grid-cols-3 gap-4 mb-4">
//               <div className="text-center">
//                 <div className="text-lg font-bold text-purple-600">{partner.students}</div>
//                 <div className="text-xs text-gray-500">Étudiants</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-lg font-bold text-purple-600">{partner.courses}</div>
//                 <div className="text-xs text-gray-500">Cours</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-lg font-bold text-purple-600">{partner.certificates}</div>
//                 <div className="text-xs text-gray-500">Certificats</div>
//               </div>
//             </div>

//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Méthode sync:</span>
//                 <span className="font-semibold">{partner.syncMethod}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Dernière sync:</span>
//                 <span className="font-semibold">{partner.lastSync}</span>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-1 mt-4">
//               {partner.specialties.map((specialty, index) => (
//                 <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
//                   {specialty}
//                 </span>
//               ))}
//             </div>

//             <div className="flex space-x-2 mt-4">
//               <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm">
//                 Configurer
//               </button>
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 <Settings className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Syncs */}
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <h3 className="text-xl font-bold mb-6 flex items-center">
//           <RefreshCw className="w-5 h-5 mr-2 text-purple-600" />
//           Synchronisations Récentes
//         </h3>
        
//         <div className="space-y-4">
//           {recentSyncs.map((sync, index) => (
//             <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//               <div className="flex items-center space-x-4">
//                 <div className={`w-3 h-3 rounded-full ${
//                   sync.status === 'completed' ? 'bg-green-500' :
//                   sync.status === 'synced' ? 'bg-blue-500' : 'bg-yellow-500'
//                 }`}></div>
//                 <div>
//                   <div className="font-semibold text-gray-900">{sync.course}</div>
//                   <div className="text-sm text-gray-600">{sync.partner} • {sync.student}</div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-sm font-semibold">{sync.progress}% • {sync.hours}h</div>
//                 <div className="text-xs text-gray-500">{sync.timestamp}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )

//   const renderIntegration = () => (
//     <div className="space-y-8">
//       {/* API Documentation */}
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <h3 className="text-xl font-bold mb-6 flex items-center">
//           <Database className="w-5 h-5 mr-2 text-purple-600" />
//           API REST - Documentation
//         </h3>
        
//         <div className="bg-gray-50 rounded-xl p-4 mb-6">
//           <div className="text-sm text-gray-600 mb-2">Base URL:</div>
//           <code className="bg-gray-800 text-green-400 px-3 py-1 rounded text-sm">
//             https://api.kno.academy/v1
//           </code>
//         </div>

//         <div className="space-y-4">
//           {apiEndpoints.map((endpoint, index) => (
//             <div key={index} className="border border-gray-200 rounded-xl p-4">
//               <div className="flex items-center space-x-3 mb-3">
//                 <span className={`px-2 py-1 rounded text-xs font-bold ${
//                   endpoint.method === 'POST' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
//                 }`}>
//                   {endpoint.method}
//                 </span>
//                 <code className="font-mono text-sm">{endpoint.endpoint}</code>
//               </div>
//               <p className="text-gray-600 text-sm mb-3">{endpoint.description}</p>
//               <div className="flex flex-wrap gap-2">
//                 {endpoint.params.map((param, paramIndex) => (
//                   <span key={paramIndex} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-mono">
//                     {param}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Integration Methods */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <h3 className="text-lg font-bold mb-4 flex items-center">
//             <Wifi className="w-5 h-5 mr-2 text-green-600" />
//             Intégration API REST
//           </h3>
          
//           <div className="space-y-4">
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//               <h4 className="font-semibold text-green-800 mb-2">Avantages</h4>
//               <ul className="text-sm text-green-700 space-y-1">
//                 <li>• Synchronisation temps réel</li>
//                 <li>• Automatisation complète</li>
//                 <li>• Sécurité renforcée</li>
//                 <li>• Scalabilité optimale</li>
//               </ul>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Prérequis techniques</h4>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• LMS compatible REST API</li>
//                 <li>• Authentification OAuth 2.0</li>
//                 <li>• Certificats SSL/TLS</li>
//                 <li>• Webhooks (optionnel)</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <h3 className="text-lg font-bold mb-4 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-blue-600" />
//             Import Manuel CSV/Excel
//           </h3>
          
//           <div className="space-y-4">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h4 className="font-semibold text-blue-800 mb-2">Avantages</h4>
//               <ul className="text-sm text-blue-700 space-y-1">
//                 <li>• Solution simple TPE/PME</li>
//                 <li>• Pas de développement requis</li>
//                 <li>• Contrôle manuel des données</li>
//                 <li>• Démarrage rapide</li>
//               </ul>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Format requis</h4>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• student_id, course_name, progress</li>
//                 <li>• hours_completed, status, date</li>
//                 <li>• certificate_url (optionnel)</li>
//                 <li>• Encodage UTF-8</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Security & Compliance */}
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <h3 className="text-xl font-bold mb-6 flex items-center">
//           <Shield className="w-5 h-5 mr-2 text-purple-600" />
//           Sécurité & Conformité
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
//             <Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
//             <h4 className="font-semibold text-green-800 mb-2">RGPD</h4>
//             <p className="text-sm text-green-700">Consentement utilisateur requis avant import</p>
//           </div>
          
//           <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
//             <Server className="w-8 h-8 text-blue-600 mx-auto mb-3" />
//             <h4 className="font-semibold text-blue-800 mb-2">Chiffrement</h4>
//             <p className="text-sm text-blue-700">Données chiffrées AES-256 en transit et au repos</p>
//           </div>
          
//           <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
//             <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
//             <h4 className="font-semibold text-purple-800 mb-2">Conformité</h4>
//             <p className="text-sm text-purple-700">Serveurs UE/Suisse - MiCA/FINMA</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   const renderSettings = () => (
//     <div className="space-y-8">
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <h3 className="text-xl font-bold mb-6">Configuration Générale</h3>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Politique de récompenses partenaires
//             </label>
//             <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
//               <option>Standard (1h = 5 $KNO)</option>
//               <option>Premium (1h = 10 $KNO)</option>
//               <option>Personnalisé</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Fréquence de synchronisation
//             </label>
//             <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
//               <option>Temps réel</option>
//               <option>Toutes les heures</option>
//               <option>Quotidienne</option>
//               <option>Hebdomadaire</option>
//             </select>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <input type="checkbox" id="auto-certificates" className="rounded" />
//             <label htmlFor="auto-certificates" className="text-sm text-gray-700">
//               Génération automatique des certificats NFT
//             </label>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <input type="checkbox" id="gamification" className="rounded" defaultChecked />
//             <label htmlFor="gamification" className="text-sm text-gray-700">
//               Intégrer les données partenaires dans la gamification
//             </label>
//           </div>
//         </div>
        
//         <div className="flex space-x-4 mt-8">
//           <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
//             Sauvegarder
//           </button>
//           <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
//             Annuler
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Partenaires{' '}
//               <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//                 Formation
//               </span>
//             </h1>
//             <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
//               Interconnexion avec vos organismes de formation. Synchronisation automatique des données pédagogiques.
//             </p>
            
//             {/* Message rassurant pour les partenaires */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
//               <h3 className="text-xl font-bold text-white mb-4">
//                 KNO connecte les savoirs, les partenaires restent les formateurs.
//               </h3>
//               <p className="text-purple-100 text-lg leading-relaxed">
//                 <strong>Vos apprenants restent vos clients.</strong><br />
//                 KNO valorise vos formations en les intégrant dans le parcours global des utilisateurs, 
//                 tout en vous offrant visibilité et reporting centralisé.
//               </p>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg">
//                 Ajouter un partenaire
//               </button>
//               <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg">
//                 Documentation API
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Navigation Tabs */}
//       <div className="bg-white shadow-sm sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <nav className="flex space-x-8">
//             {[
//               { id: 'overview', name: 'Vue d\'ensemble', icon: BarChart3 },
//               { id: 'integration', name: 'Intégration', icon: Database },
//               { id: 'settings', name: 'Configuration', icon: Settings }
//             ].map((tab) => {
//               const Icon = tab.icon
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
//                     activeTab === tab.id
//                       ? 'border-purple-500 text-purple-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.name}</span>
//                 </button>
//               )
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
//         {activeTab === 'overview' && renderOverview()}
//         {activeTab === 'integration' && renderIntegration()}
//         {activeTab === 'settings' && renderSettings()}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import {
  Building2, Users, Clock, Award,
  ArrowUp, ArrowDown, BarChart3,
  Database, Settings, RefreshCw,
  Upload, Shield, Lock, Server,
  Globe, Wifi
} from 'lucide-react'

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [connectedPartners, setConnectedPartners] = useState(6)
  const [totalStudents, setTotalStudents] = useState(1247)
  const [syncedHours, setSyncedHours] = useState(8934)
  const [certificatesIssued, setCertificatesIssued] = useState(456)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalStudents(prev => prev + Math.floor(Math.random() * 2))
      setSyncedHours(prev => prev + Math.floor(Math.random() * 5))
      setCertificatesIssued(prev => prev + Math.floor(Math.random() * 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const partners = [
    {
      id: 1,
      name: "ONEDYS FORMATION",
      logourl: "/partners/onedys.png",
      url: "https://onedys.fr/"
    },
    {
      id: 2,
      name: "Health performance",
      logourl: "/partners/health.png",
      url: "https://healthperformance.fr/"
    },
    {
      id: 3,
      name: "Apteed",
      logourl: "/partners/apteed.png",
      url: "https://apteed.fr/"
    },
    {
      id: 4,
      name: "France - Prévention - Secourisme",
      logourl: "/partners/fps.png",
      url: "https://fps95.com/contact/"
    },
    {
      id: 5,
      name: "Private French University",
      logourl: "/partners/french.png",
      url: "https://myfrenchuniversity.fr/"
    },
    {
      id: 6,
      name: "Octagy",
      logourl: "/partners/octagy.png",
      url: "https://octagy.fr/"
    }
  ]

  const partnerStats = [
    {
      label: 'Partenaires connectés',
      value: connectedPartners,
      change: '+3',
      trend: 'up',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Étudiants synchronisés',
      value: totalStudents.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Heures synchronisées',
      value: `${syncedHours.toLocaleString()}h`,
      change: '+28%',
      trend: 'up',
      icon: Clock,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Certificats délivrés',
      value: certificatesIssued,
      change: '+15%',
      trend: 'up',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Partner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnerStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img src={partner.logourl} alt={partner.name} className="w-14 h-14 object-contain rounded-md" />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{partner.name}</h3>
                <p className="text-sm text-purple-600">Partenaire de formation</p>
              </div>
            </div>
     
          </a>
        ))}
      </div>
    </div>
  )

  const renderIntegration = () => (
    <div className="p-6 bg-white rounded-xl shadow-md text-center text-gray-600">
      <p className="text-lg">📡 Bientôt disponible : documentation API et intégrations.</p>
    </div>
  )

  const renderSettings = () => (
    <div className="p-6 bg-white rounded-xl shadow-md text-center text-gray-600">
      <p className="text-lg">⚙️ Paramètres de configuration à venir.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partenaires{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Formation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Interconnexion avec vos organismes de formation. Synchronisation automatique des données pédagogiques.
            </p>
            
            {/* Message rassurant pour les partenaires */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                KNO connecte les savoirs, les partenaires restent les formateurs.
              </h3>
              <p className="text-purple-100 text-lg leading-relaxed">
                <strong>Vos apprenants restent vos clients.</strong><br />
                KNO valorise vos formations en les intégrant dans le parcours global des utilisateurs, 
                tout en vous offrant visibilité et reporting centralisé.
              </p>
            </div>
            
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg">
                Ajouter un partenaire
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg">
                Documentation API
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'integration', name: 'Intégration', icon: Database },
              { id: 'settings', name: 'Configuration', icon: Settings }
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'integration' && renderIntegration()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  )
}
