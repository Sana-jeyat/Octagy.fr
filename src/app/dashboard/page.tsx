'use client'

import { useState, useEffect } from 'react'
import { DailyStreak } from '@/components/DailyStreak'
import { 
  BookOpen, Users, Wallet, User, TrendingUp, Award, Clock, Star, ChevronRight, Play, Trophy, Target, Zap, Brain, Flame, Globe, Shield, Menu, X, Heart, Stethoscope, Code, Briefcase, Palette, Calculator, Wrench, GraduationCap, Building, Leaf, Settings, Bell, Search, Filter, BarChart3, PieChart, Activity, Calendar, CheckCircle, ArrowUp, ArrowDown, Plus, Minus, RefreshCw, Download, Upload, Share2, Bookmark, MessageCircle, ThumbsUp, Eye, Headphones, Video, FileText, Image, Mic, Coins, AlertCircle, Camera, Lock, Unlock, UserPlus, Crown, Gift, Link, Copy, Youtube, Instagram, Facebook, ToggleLeft, ToggleRight, Gamepad2, Layers, Users2, Medal, Sparkles, Timer, Focus, Smartphone, Monitor, Tv, Radio, Volume2, VolumeX, FastForward, Rewind, Pause, SkipForward, SkipBack, RotateCcw, RotateCw, Maximize, Minimize, ExternalLink, Home, MapPin, Phone, Mail, Hash, AtSign, DollarSign, Percent, Slash, Delete, Edit, Edit2, Edit3, Save, FileEdit, FilePlus, FileX, Folder, FolderOpen, FolderPlus, Archive, Trash, Trash2, MoreHorizontal, MoreVertical, ChevronUp, ChevronDown, ChevronLeft, ChevronsUp, ChevronsDown, ChevronsLeft, ChevronsRight, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowDownLeft, ArrowUpLeft, Move, MoveHorizontal, MoveVertical, CornerDownLeft, CornerDownRight, CornerUpLeft, CornerUpRight, MousePointer, MousePointer2, Navigation, Navigation2, Compass, Map, Car, Bike, Bus, Train, Plane, Ship, Truck, Fuel, Battery, BatteryLow, Wifi, WifiOff, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Bluetooth, BluetoothConnected, BluetoothSearching, Usb, HardDrive, Cpu, MemoryStick, Server, Database, Cloud, CloudRain, CloudSnow, Sun, Moon, Sunrise, Sunset, CloudDrizzle, CloudLightning, Thermometer, Droplets, Wind, EyeOff, Glasses, Lightbulb, Flashlight, Lamp, LampCeiling, LampDesk, LampFloor, LampWallDown, LampWallUp, Power, PowerOff, Plug, Plug2, PlugZap, BatteryCharging, BatteryFull, Gauge, HeartPulse, HeartHandshake, HeartCrack, HeartOff, Smile, Frown, Meh, Laugh, Angry, Annoyed
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [profileMode, setProfileMode] = useState<'personal' | 'professional'>('personal')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [knoBalance, setKnoBalance] = useState(1247.5)
  const [iknoBalance, setIknoBalance] = useState(2847.3)
  const [kycStatus, setKycStatus] = useState<'not_started' | 'pending' | 'approved' | 'rejected'>('not_started')
  const [learningTime, setLearningTime] = useState(156)
  const [dailyStreak, setDailyStreak] = useState(7)
  const [weeklyScore, setWeeklyScore] = useState(2847)
  
  // Nouvelles fonctionnalités
  const [avatarMode, setAvatarMode] = useState<'personal' | 'professional'>('personal')
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [socialTrackingEnabled, setSocialTrackingEnabled] = useState(true)
  const [focusMode, setFocusMode] = useState(false)
  const [dailyTimeGoal, setDailyTimeGoal] = useState(20) // minutes
  const [dailyQuizGoal, setDailyQuizGoal] = useState(1)
  const [currentTimeProgress, setCurrentTimeProgress] = useState(15) // minutes
  const [currentQuizProgress, setCurrentQuizProgress] = useState(0)

  // Solidarity & Donations state
  const [solidarityBalance, setSolidarityBalance] = useState(156) // KNO donated
  const [impactHours, setImpactHours] = useState(23) // Hours offered to beneficiaries
  const [beneficiariesHelped, setBeneficiariesHelped] = useState(8)
  const [donationAmount, setDonationAmount] = useState(10)
  const [autoDonationEnabled, setAutoDonationEnabled] = useState(false)
  const [autoDonationPercentage, setAutoDonationPercentage] = useState(5)
  const [showDonationModal, setShowDonationModal] = useState(false)

  // KYC state
  const [showKycModal, setShowKycModal] = useState(false)
  const [kycStep, setKycStep] = useState(1)
  const [kycDocuments, setKycDocuments] = useState({
    identity: null,
    address: null,
    selfie: null
  })

  // Creator Mode state
  const [isCreatorMode, setIsCreatorMode] = useState(false)
  const [creatorStats, setCreatorStats] = useState({
    totalStudents: 1247,
    totalViews: 15634,
    totalHours: 2847,
    totalRevenue: 3456.7,
    coursesPublished: 12,
    avgRating: 4.8
  })

  const [userProfile, setUserProfile] = useState({
    name: 'Alex Thompson',
    profession: 'Pharmacien',
    interests: ['Santé', 'Blockchain', 'IA'],
    level: 'Intermédiaire',
    goals: ['Certification', 'Reconversion', 'Spécialisation'],
    personalAvatar: '👨‍💻',
    professionalAvatar: '👔',
    joinDate: '2024-09-15',
    completedCourses: 12,
    totalHours: 156,
    rank: 5,
    company: 'TechCorp SA',
    department: 'R&D',
    manager: 'Sophie Martin',
    referralCode: 'KNO-ALEX-2025',
    referralCount: 3,
    referralEarnings: 150,
    companyObjectives: [
      { title: 'Certification Blockchain', progress: 65, deadline: '2025-02-15', reward: '€500 + 100 $KNO' },
      { title: 'Formation IA Équipe', progress: 40, deadline: '2025-03-01', reward: 'Team Building' },
      { title: 'Modules Santé Obligatoires', progress: 80, deadline: '2025-01-31', reward: 'Prime Sécurité' }
    ],
    partnerCourses: [
      {
        id: 1,
        partner: 'OCTAGY',
        partnerLogo: '🏥',
        courseName: 'AFGSU2 - Urgences vitales en pharmacie',
        progress: 75,
        totalHours: 12,
        completedHours: 9,
        status: 'en_cours',
        certificate: null,
        lastActivity: '2025-01-15',
        category: 'Santé',
        rewards: { kno: 50, knobro: 25 }
      },
      {
        id: 2,
        partner: 'Université de Genève',
        partnerLogo: '🎓',
        courseName: 'Pharmacologie Clinique Avancée',
        progress: 100,
        totalHours: 45,
        completedHours: 45,
        status: 'termine',
        certificate: 'https://certificates.unige.ch/pharm-2024-001.pdf',
        lastActivity: '2025-01-10',
        category: 'Sciences',
        rewards: { kno: 150, knobro: 75 }
      }
    ]
  })

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: TrendingUp },
    { name: 'Streaks', id: 'streak', icon: Flame },
    { name: 'Cours', id: 'courses', icon: BookOpen },
    { name: 'Formations Partenaires', id: 'partners', icon: Building },
    { name: 'Ligues & Clubs', id: 'leagues', icon: Trophy },
    { name: 'Réseaux Sociaux', id: 'social', icon: Smartphone },
    { name: 'Parrainage', id: 'referral', icon: Users2 },
    { name: 'Solidarité', id: 'solidarity', icon: Heart },
    { name: 'Créateur', id: 'creator', icon: Video },
    { name: 'Communauté', id: 'community', icon: Users },
    { name: 'Wallet / Récompenses', id: 'wallet', icon: Wallet },
    { name: 'Profil', id: 'profile', icon: User },
  ]

  const getCurrentAvatar = () => {
    return avatarMode === 'personal' ? userProfile.personalAvatar : userProfile.professionalAvatar
  }

  const renderDashboard = () => {
    return (
      <div className="space-y-8">
        {/* Profile Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setProfileMode('personal')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  profileMode === 'personal'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Personnel</span>
              </button>
              <button
                onClick={() => setProfileMode('professional')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  profileMode === 'professional'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Professionnel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Goals Rings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Objectif Temps Quotidien</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="60" cy="60" r="50"
                    stroke="url(#gradient1)"
                    strokeWidth="8" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - currentTimeProgress / dailyTimeGoal)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{Math.round(currentTimeProgress)}min</div>
                    <div className="text-xs text-gray-500">/ {dailyTimeGoal}min</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Objectif Quiz Quotidien</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="60" cy="60" r="50"
                    stroke="url(#gradient2)"
                    strokeWidth="8" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - currentQuizProgress / dailyQuizGoal)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{currentQuizProgress}</div>
                    <div className="text-xs text-gray-500">/ {dailyQuizGoal} quiz</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{Math.floor(learningTime)}h</div>
            <div className="text-gray-600 text-sm">Temps total</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>+3</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{userProfile.completedCourses}</div>
            <div className="text-gray-600 text-sm">Cours terminés</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>+8</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">47</div>
            <div className="text-gray-600 text-sm">Quiz réussis</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>+2</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">15</div>
            <div className="text-gray-600 text-sm">Badges obtenus</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6">Activité Récente</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-semibold">Blockchain Fundamentals</div>
                  <div className="text-sm text-gray-600">Cours terminé</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">+45 iKNO</div>
                <div className="text-xs text-gray-500">2h</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <Target className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="font-semibold">Quiz IA Médicale</div>
                  <div className="text-sm text-gray-600">Quiz réussi (95%)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">+20 iKNO</div>
                <div className="text-xs text-gray-500">4h</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="font-semibold">Badge Marathonien</div>
                  <div className="text-sm text-gray-600">Badge obtenu</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">+25 iKNO</div>
                <div className="text-xs text-gray-500">1j</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCreator = () => {
    return (
      <div className="space-y-8">
        {/* Creator Mode Toggle */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Mode Créateur</h3>
              <p className="text-gray-600">Partagez votre expertise et monétisez vos connaissances</p>
            </div>
            <button
              onClick={() => setIsCreatorMode(!isCreatorMode)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isCreatorMode
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Video className="w-5 h-5" />
              <span>{isCreatorMode ? 'Mode Créateur Activé' : 'Devenir Créateur'}</span>
            </button>
          </div>

          {isCreatorMode && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{creatorStats.totalStudents.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Étudiants formés</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{creatorStats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-green-700">Vues totales</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{creatorStats.totalRevenue.toLocaleString()} iKNO</div>
                <div className="text-sm text-purple-700">Revenus totaux</div>
              </div>
            </div>
          )}
        </div>

        {isCreatorMode && (
          <>
            {/* Creator Spotlight */}
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-2xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8 text-yellow-200" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">🌟 Créateur en Vedette</h3>
                    <p className="text-orange-100">Vous êtes mis en avant cette semaine !</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">+347%</div>
                  <div className="text-orange-100 text-sm">Vues cette semaine</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-orange-100 text-sm">Nouveaux étudiants</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">15.6K</div>
                  <div className="text-orange-100 text-sm">Vues cette semaine</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-orange-100 text-sm">Tips reçus</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">#4</div>
                  <div className="text-orange-100 text-sm">Classement global</div>
                </div>
              </div>
            </div>

            {/* Creator Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg">
                <Upload className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold">Nouveau Contenu</div>
                <div className="text-xs text-blue-100 mt-1">Vidéo, Quiz, Cours</div>
              </button>

              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg">
                <BarChart3 className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold">Analytics</div>
                <div className="text-xs text-green-100 mt-1">Vues, Revenus, Taux</div>
              </button>

              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">
                <Gift className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold">Tips Reçus</div>
                <div className="text-xs text-purple-100 mt-1">1,247 iKNO ce mois</div>
              </button>

              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg">
                <Share2 className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold">Partager</div>
                <div className="text-xs text-orange-100 mt-1">Réseaux sociaux</div>
              </button>
            </div>

            {/* Creator Courses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Mes Formations</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Formation
                </button>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">Blockchain pour Débutants</h4>
                      <p className="text-gray-600">Formation premium • 49 iKNO</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Publié
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">234</div>
                      <div className="text-xs text-gray-500">Étudiants</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">4.9★</div>
                      <div className="text-xs text-gray-500">Note</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">1,156</div>
                      <div className="text-xs text-gray-500">iKNO gagnés</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">87%</div>
                      <div className="text-xs text-gray-500">Complétion</div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">Introduction aux Cryptomonnaies</h4>
                      <p className="text-gray-600">Formation gratuite</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Publié
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">567</div>
                      <div className="text-xs text-gray-500">Étudiants</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">4.7★</div>
                      <div className="text-xs text-gray-500">Note</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">234</div>
                      <div className="text-xs text-gray-500">iKNO gagnés</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">92%</div>
                      <div className="text-xs text-gray-500">Complétion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Badges Créateur</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-bold text-yellow-800">Top Créateur</h4>
                  <p className="text-sm text-yellow-700">1000+ étudiants formés</p>
                  <span className="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    ✓ Obtenu
                  </span>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-3xl mb-2">🚀</div>
                  <h4 className="font-bold text-blue-800">Formateur Viral</h4>
                  <p className="text-sm text-blue-700">10K+ vues cumulées</p>
                  <span className="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    ✓ Obtenu
                  </span>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="text-3xl mb-2">⭐</div>
                  <h4 className="font-bold text-purple-800">Pionnier KNO</h4>
                  <p className="text-sm text-purple-700">100 premiers créateurs</p>
                  <span className="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    ✓ Obtenu
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
      {/* KYC Modal */}
      {renderKycModal()}

  }

  const renderSolidarity = () => {
    return (
      <div className="space-y-8">
        {/* Solidarity Header */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-3xl font-bold mb-4">Solidarité & Impact</h2>
            <p className="text-green-100 text-lg mb-6">
              Chaque minute d'apprentissage que vous offrez change une vie.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">{solidarityBalance}</div>
                <div className="text-green-100 text-sm">KNO donnés</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">{impactHours}h</div>
                <div className="text-green-100 text-sm">Heures offertes</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">{beneficiariesHelped}</div>
                <div className="text-green-100 text-sm">Bénéficiaires aidés</div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6">Faire un Don</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[5, 10, 20, 50].map((amount) => (
              <button
                key={amount}
                onClick={() => setDonationAmount(amount)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  donationAmount === amount
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-lg font-bold">{amount} KNO</div>
                <div className="text-xs text-gray-500">≈ {Math.round(amount * 0.15)}h offertes</div>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Montant personnalisé"
            />
            <button
              onClick={() => setShowDonationModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
            >
              Donner {donationAmount} KNO
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-green-800">Don automatique</div>
                <div className="text-sm text-green-600">
                  {autoDonationPercentage}% de vos rewards iKNO → pool solidaire
                </div>
              </div>
            </div>
            <button
              onClick={() => setAutoDonationEnabled(!autoDonationEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                autoDonationEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                autoDonationEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Impact History */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6">Historique d'Impact</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-semibold">3h offertes à Marie (Sénégal)</div>
                  <div className="text-sm text-gray-600">Don de 20 KNO • 15 janvier 2025</div>
                </div>
              </div>
              <div className="text-green-600 font-semibold">-20 KNO</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold">2h offertes à Ahmed (Maroc)</div>
                  <div className="text-sm text-gray-600">Don automatique • 10 janvier 2025</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold">-15 KNO</div>
            </div>
          </div>
        </div>

        {/* Solidarity Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-6">Badges Solidaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
              <div className="text-3xl mb-2">🥉</div>
              <h4 className="font-bold text-orange-800">Donateur Bronze</h4>
              <p className="text-sm text-orange-700 mb-2">50 KNO donnés</p>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                ✓ Obtenu
              </span>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-300">
              <div className="text-3xl mb-2">🥈</div>
              <h4 className="font-bold text-gray-800">Donateur Argent</h4>
              <p className="text-sm text-gray-700 mb-2">100 KNO donnés</p>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                ✓ Obtenu
              </span>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-300 opacity-60">
              <div className="text-3xl mb-2">🥇</div>
              <h4 className="font-bold text-yellow-800">Donateur Or</h4>
              <p className="text-sm text-yellow-700 mb-2">200 KNO donnés</p>
              <div className="text-xs text-gray-500">44 KNO restants</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-300 opacity-60">
              <div className="text-3xl mb-2">👑</div>
              <h4 className="font-bold text-purple-800">Ambassadeur</h4>
              <p className="text-sm text-purple-700 mb-2">500 KNO donnés</p>
              <div className="text-xs text-gray-500">344 KNO restants</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderKycModal = () => {
    if (!showKycModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Vérification d'identité (KYC)</h3>
                <p className="text-gray-600">Étape {kycStep} sur 3 - Débloquez vos tokens $KNO</p>
              </div>
              <button 
                onClick={() => setShowKycModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(kycStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {kycStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Pièce d'identité</h4>
                  <p className="text-gray-600">Téléchargez une photo de votre carte d'identité, passeport ou permis de conduire</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Cliquez pour télécharger ou glissez votre fichier ici</p>
                  <p className="text-sm text-gray-500">PNG, JPG jusqu'à 10MB</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-blue-800">Sécurité garantie</h5>
                      <p className="text-sm text-blue-700">Vos documents sont chiffrés et stockés selon les standards bancaires européens.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {kycStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Justificatif de domicile</h4>
                  <p className="text-gray-600">Facture récente (électricité, gaz, internet) ou relevé bancaire de moins de 3 mois</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Téléchargez votre justificatif de domicile</p>
                  <p className="text-sm text-gray-500">PDF, PNG, JPG jusqu'à 10MB</p>
                </div>
              </div>
            )}

            {kycStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Selfie de vérification</h4>
                  <p className="text-gray-600">Prenez une photo de vous tenant votre pièce d'identité</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Prenez votre selfie de vérification</p>
                  <p className="text-sm text-gray-500">Visage visible, document lisible</p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-yellow-800">Conseils pour un selfie réussi</h5>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• Éclairage naturel de face</li>
                        <li>• Tenez votre pièce d'identité près de votre visage</li>
                        <li>• Assurez-vous que le texte soit lisible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-between">
            {kycStep > 1 && (
              <button
                onClick={() => setKycStep(kycStep - 1)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Précédent
              </button>
            )}
            
            <div className="flex-1"></div>
            
            {kycStep < 3 ? (
              <button
                onClick={() => setKycStep(kycStep + 1)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Continuer
              </button>
            ) : (
              <button
                onClick={() => {
                  setKycStatus('pending')
                  setShowKycModal(false)
                }}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
              >
                Soumettre ma demande
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getCurrentAvatar()}</div>
            <div>
              <div className="font-semibold">{userProfile.name}</div>
              <div className="text-sm text-gray-500">{userProfile.profession}</div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-3xl">{getCurrentAvatar()}</div>
              <div>
                <div className="font-bold text-lg">{userProfile.name}</div>
                <div className="text-sm text-gray-500">{userProfile.profession}</div>
              </div>
            </div>

            {/* Balance Cards */}
            <div className="space-y-3 mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">iKNO (Crédits)</span>
                  <Coins className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold">{iknoBalance.toFixed(1)}</div>
                <div className="text-xs opacity-75">Utilisables immédiatement</div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">$KNO (Tokens)</span>
                  <button
                    onClick={() => kycStatus !== 'approved' && setShowKycModal(true)}
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer hover:opacity-80 transition-opacity ${
                    kycStatus === 'approved' ? 'bg-green-500' : 
                    kycStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  >
                    {kycStatus === 'approved' ? 'KYC ✓' : 
                     kycStatus === 'pending' ? 'KYC...' : 'KYC'}
                  </button>
                </div>
                <div className="text-2xl font-bold">
                  {kycStatus === 'approved' ? knoBalance.toFixed(1) : '---'}
                </div>
                <div className="text-xs opacity-75">
                  {kycStatus === 'approved' ? 'Échangeables' : 
                   kycStatus === 'pending' ? 'Validation en cours...' : 'Cliquez pour KYC'}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'streak' && <DailyStreak />}
            {activeTab === 'solidarity' && renderSolidarity()}
            {activeTab === 'creator' && renderCreator()}
            {activeTab === 'courses' && (
              <div className="text-center py-16">
                <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Catalogue de Cours</h3>
                <p className="text-gray-500">Cette section sera bientôt disponible.</p>
              </div>
            )}
            {activeTab === 'wallet' && (
              <div className="text-center py-16">
                <Wallet className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Wallet & Récompenses</h3>
                <p className="text-gray-500">Cette section sera bientôt disponible.</p>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="text-center py-16">
                <User className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Profil Utilisateur</h3>
                <p className="text-gray-500">Cette section sera bientôt disponible.</p>
              </div>
            )}
            {!['dashboard', 'streak', 'solidarity', 'creator', 'courses', 'wallet', 'profile'].includes(activeTab) && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🚧</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">En Construction</h3>
                <p className="text-gray-500">Cette fonctionnalité sera bientôt disponible.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}