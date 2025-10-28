'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, Filter, Search, Play, Award, Zap, TrendingUp, Target, ChevronRight, Globe, Brain, Code, DollarSign, Briefcase, Palette, Shield, Smartphone, Heart, Stethoscope, Calculator, Camera, Music, Gamepad2, Wrench, GraduationCap, Building, Leaf, X, CheckCircle, ArrowUpDown, LayoutGrid as Grid3X3, List, Bookmark, Share2 } from 'lucide-react'

const categories = [
  { 
    id: 'all', 
    name: 'Toutes les formations', 
    icon: BookOpen, 
    count: 347,
    color: 'from-gray-500 to-gray-600',
    description: 'Explorez tout notre catalogue'
  },
  { 
    id: 'blockchain', 
    name: 'Blockchain & Crypto', 
    icon: Shield, 
    count: 89,
    color: 'from-blue-500 to-cyan-500',
    description: 'Bitcoin, Ethereum, DeFi, NFT, Smart Contracts'
  },
  { 
    id: 'ai', 
    name: 'Intelligence Artificielle', 
    icon: Brain, 
    count: 76,
    color: 'from-purple-500 to-pink-500',
    description: 'Machine Learning, Deep Learning, ChatGPT, Computer Vision'
  },
  { 
    id: 'development', 
    name: 'Développement Web', 
    icon: Code, 
    count: 65,
    color: 'from-green-500 to-emerald-500',
    description: 'React, Node.js, Python, JavaScript, Full-Stack'
  },
  { 
    id: 'marketing', 
    name: 'Marketing Digital', 
    icon: TrendingUp, 
    count: 54,
    color: 'from-orange-500 to-red-500',
    description: 'SEO, Google Ads, Social Media, Growth Hacking'
  },
  { 
    id: 'finance', 
    name: 'Finance & Trading', 
    icon: DollarSign, 
    count: 43,
    color: 'from-yellow-500 to-orange-500',
    description: 'Trading, Analyse technique, Investissement, Crypto'
  },
  { 
    id: 'health', 
    name: 'Santé & Médecine', 
    icon: Stethoscope, 
    count: 38,
    color: 'from-red-500 to-pink-500',
    description: 'Médecine, Pharmacie, Soins, Recherche médicale'
  },
  { 
    id: 'business', 
    name: 'Business & Management', 
    icon: Briefcase, 
    count: 32,
    color: 'from-indigo-500 to-purple-500',
    description: 'Leadership, Entrepreneuriat, Gestion de projet'
  },
  { 
    id: 'design', 
    name: 'Design & UX/UI', 
    icon: Palette, 
    count: 28,
    color: 'from-pink-500 to-rose-500',
    description: 'Figma, Photoshop, UX Design, Branding'
  }
]

const levels = [
  { id: 'all', name: 'Tous niveaux', color: 'bg-gray-100 text-gray-800' },
  { id: 'beginner', name: 'Débutant', color: 'bg-green-100 text-green-800' },
  { id: 'intermediate', name: 'Intermédiaire', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'advanced', name: 'Avancé', color: 'bg-red-100 text-red-800' }
]

const sortOptions = [
  { id: 'popular', name: 'Plus populaires', icon: TrendingUp },
  { id: 'rating', name: 'Mieux notés', icon: Star },
  { id: 'newest', name: 'Plus récents', icon: Clock },
  { id: 'reward', name: 'Plus de $KNO', icon: Zap },
  { id: 'duration', name: 'Durée croissante', icon: Clock },
  { id: 'price', name: 'Prix croissant', icon: DollarSign }
]

const courses = [
  {
    id: 1,
    title: 'Blockchain Fundamentals & Smart Contracts',
    category: 'blockchain',
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.9,
      students: 12847
    },
    duration: '6h 30min',
    lessons: 24,
    students: 2847,
    rating: 4.9,
    reviews: 342,
    price: { fiat: 149, kno: 175 },
    reward: 45,
    level: 'beginner',
    language: 'Français',
    description: 'Maîtrisez les fondamentaux de la blockchain et créez vos premiers smart contracts sur Ethereum.',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Ethereum', 'Solidity', 'DeFi', 'NFT'],
    progress: 0,
    featured: true,
    completionRate: 87,
    avgTimeToComplete: '2 semaines',
    lastUpdated: '2025-01-15',
    certificate: true,
    downloadable: true,
    bestseller: true,
    trending: false
  },
  {
    id: 2,
    title: 'Intelligence Artificielle Appliquée',
    category: 'ai',
    instructor: {
      name: 'Prof. Marc Dubois',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8,
      students: 8934
    },
    duration: '8h 15min',
    lessons: 32,
    students: 1923,
    rating: 4.8,
    reviews: 287,
    price: { fiat: 199, kno: 235 },
    reward: 60,
    level: 'intermediate',
    language: 'Français',
    description: 'Découvrez les applications pratiques de l\'IA : Machine Learning, Deep Learning et Computer Vision.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Python', 'TensorFlow', 'OpenAI', 'Computer Vision'],
    progress: 0,
    featured: true,
    completionRate: 92,
    avgTimeToComplete: '3 semaines',
    lastUpdated: '2025-01-10',
    certificate: true,
    downloadable: true,
    bestseller: false,
    trending: true
  },
  {
    id: 3,
    title: 'Marketing Digital & Growth Hacking',
    category: 'marketing',
    instructor: {
      name: 'Lisa Rodriguez',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.7,
      students: 6721
    },
    duration: '5h 45min',
    lessons: 28,
    students: 3156,
    rating: 4.7,
    reviews: 421,
    price: { fiat: 129, kno: 150 },
    reward: 35,
    level: 'beginner',
    language: 'Français',
    description: 'Stratégies avancées de marketing digital, SEO, réseaux sociaux et growth hacking.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
    progress: 0,
    featured: false,
    completionRate: 89,
    avgTimeToComplete: '2 semaines',
    lastUpdated: '2025-01-12',
    certificate: true,
    downloadable: false,
    bestseller: true,
    trending: false
  },
  {
    id: 4,
    title: 'React & Next.js Masterclass',
    category: 'development',
    instructor: {
      name: 'Thomas Weber',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.9,
      students: 5432
    },
    duration: '12h 20min',
    lessons: 45,
    students: 1687,
    rating: 4.9,
    reviews: 198,
    price: { fiat: 249, kno: 290 },
    reward: 75,
    level: 'advanced',
    language: 'Français',
    description: 'Développement d\'applications web modernes avec React, Next.js, TypeScript et Tailwind CSS.',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    progress: 0,
    featured: true,
    completionRate: 94,
    avgTimeToComplete: '4 semaines',
    lastUpdated: '2025-01-08',
    certificate: true,
    downloadable: true,
    bestseller: false,
    trending: true
  },
  {
    id: 5,
    title: 'Trading & Analyse Technique',
    category: 'finance',
    instructor: {
      name: 'Antoine Moreau',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.6,
      students: 4321
    },
    duration: '7h 10min',
    lessons: 35,
    students: 2234,
    rating: 4.6,
    reviews: 312,
    price: { fiat: 179, kno: 210 },
    reward: 50,
    level: 'intermediate',
    language: 'Français',
    description: 'Maîtrisez l\'analyse technique, la gestion des risques et les stratégies de trading.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Trading', 'Analyse Technique', 'Risk Management', 'Crypto'],
    progress: 0,
    featured: false,
    completionRate: 85,
    avgTimeToComplete: '3 semaines',
    lastUpdated: '2025-01-14',
    certificate: true,
    downloadable: false,
    bestseller: false,
    trending: false
  },
  {
    id: 6,
    title: 'UX/UI Design avec Figma',
    category: 'design',
    instructor: {
      name: 'Sophie Martin',
      avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8,
      students: 3456
    },
    duration: '9h 30min',
    lessons: 38,
    students: 1456,
    rating: 4.8,
    reviews: 167,
    price: { fiat: 169, kno: 195 },
    reward: 55,
    level: 'intermediate',
    language: 'Français',
    description: 'Créez des interfaces utilisateur exceptionnelles avec les principes UX/UI et Figma.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Figma', 'UX Design', 'UI Design', 'Prototyping'],
    progress: 0,
    featured: false,
    completionRate: 91,
    avgTimeToComplete: '3 semaines',
    lastUpdated: '2025-01-11',
    certificate: true,
    downloadable: true,
    bestseller: false,
    trending: false
  }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [totalKnoEarned, setTotalKnoEarned] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showOnlyFree, setShowOnlyFree] = useState(false)
  const [showOnlyCertified, setShowOnlyCertified] = useState(false)

  useEffect(() => {
    let filtered = courses

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(course => 
      course.price.fiat >= priceRange[0] && course.price.fiat <= priceRange[1]
    )

    // Filter only certified
    if (showOnlyCertified) {
      filtered = filtered.filter(course => course.certificate)
    }

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case 'reward':
        filtered.sort((a, b) => b.reward - a.reward)
        break
      case 'duration':
        filtered.sort((a, b) => {
          const getDurationMinutes = (duration: string) => {
            const hours = duration.match(/(\d+)h/)?.[1] || '0'
            const minutes = duration.match(/(\d+)min/)?.[1] || '0'
            return parseInt(hours) * 60 + parseInt(minutes)
          }
          return getDurationMinutes(a.duration) - getDurationMinutes(b.duration)
        })
        break
      case 'price':
        filtered.sort((a, b) => a.price.fiat - b.price.fiat)
        break
    }

    setFilteredCourses(filtered)
  }, [selectedCategory, selectedLevel, searchQuery, sortBy, priceRange, showOnlyCertified])

  useEffect(() => {
    const total = courses.reduce((sum, course) => sum + course.reward, 0)
    setTotalKnoEarned(total)
  }, [])

  const getLevelColor = (level: string) => {
    const levelObj = levels.find(l => l.id === level)
    return levelObj?.color || 'bg-gray-100 text-gray-800'
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedLevel('all')
    setSearchQuery('')
    setPriceRange([0, 300])
    setShowOnlyCertified(false)
    setSortBy('popular')
  }

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedLevel !== 'all',
    searchQuery !== '',
    priceRange[0] !== 0 || priceRange[1] !== 300,
    showOnlyCertified
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Catalogue{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Formations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Formations claires, filtrables, payables en € ou $KNO. Quiz rapides pour débloquer vos rewards.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{courses.length}+</div>
                <div className="text-purple-200 text-sm">Cours disponibles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{totalKnoEarned}</div>
                <div className="text-purple-200 text-sm">$KNO à gagner</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">12,000+</div>
                <div className="text-purple-200 text-sm">Apprenants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-purple-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Search & Filters Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher formations, formateurs, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Niveau</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {levels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prix (€): {priceRange[0]} - {priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Additional Filters */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showOnlyCertified}
                        onChange={(e) => setShowOnlyCertified(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Avec certificat</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Effacer tous les filtres
                </button>
                <div className="text-sm text-gray-600">
                  {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} trouvée{filteredCourses.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories Quick Access */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-4 space-x-4">
            {categories.slice(0, 6).map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{category.name}</div>
                    <div className={`text-xs ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.count} cours
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Courses */}
        {selectedCategory === 'all' && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Formations à la une
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.filter(course => course.featured).slice(0, 2).map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-yellow-200">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        À la une
                      </span>
                      {course.bestseller && (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Bestseller
                        </span>
                      )}
                      {course.trending && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        +{course.reward} $KNO
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                        {levels.find(l => l.id === course.level)?.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-500">({course.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 hover:text-purple-600 transition-colors">
                      <Link href={`/courses/${course.id}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center space-x-6 mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} leçons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      {course.certificate && (
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>Certificat</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold">{course.instructor.name}</div>
                          <div className="text-sm text-gray-500">
                            {course.instructor.students.toLocaleString()} étudiants
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          {course.price.kno} $KNO
                        </div>
                        <div className="text-sm text-gray-500">
                          ou {course.price.fiat}€
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        href={`/courses/${course.id}`}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Commencer
                      </Link>
                      <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses Grid/List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory !== 'all' 
                ? `${categories.find(c => c.id === selectedCategory)?.name}` 
                : 'Toutes les formations'
              }
            </h3>
            <div className="text-sm text-gray-600">
              {filteredCourses.length} résultat{filteredCourses.length > 1 ? 's' : ''}
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex space-x-1">
                      {course.bestseller && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Bestseller
                        </span>
                      )}
                      {course.trending && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          🔥
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        +{course.reward} $KNO
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                        {levels.find(l => l.id === course.level)?.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold mb-2 hover:text-purple-600 transition-colors line-clamp-2">
                      <Link href={`/courses/${course.id}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      {course.certificate && (
                        <div className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>Certificat</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs font-medium">{course.instructor.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        <div className="font-bold text-purple-600">
                          {course.price.kno} $KNO
                        </div>
                        <div className="text-xs text-gray-500">
                          ou {course.price.fiat}€
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center text-sm"
                    >
                      Voir le cours
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          +{course.reward} $KNO
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                              {levels.find(l => l.id === course.level)?.name}
                            </span>
                            {course.bestseller && (
                              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                Bestseller
                              </span>
                            )}
                            {course.trending && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                🔥 Trending
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">
                            <Link href={`/courses/${course.id}`}>
                              {course.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">
                            {course.price.kno} $KNO
                          </div>
                          <div className="text-sm text-gray-500">
                            ou {course.price.fiat}€
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{course.rating} ({course.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="w-4 h-4 rounded-full"
                            />
                            <span>{course.instructor.name}</span>
                          </div>
                        </div>
                        
                        <Link
                          href={`/courses/${course.id}`}
                          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center"
                        >
                          Voir le cours
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* No results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              Aucune formation trouvée
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou explorez nos catégories populaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
              >
                Réinitialiser les filtres
              </button>
              <Link
                href="/community"
                className="border border-purple-500 text-purple-500 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
              >
                Demander une formation
              </Link>
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredCourses.length > 0 && filteredCourses.length >= 12 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold">
              Charger plus de formations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}