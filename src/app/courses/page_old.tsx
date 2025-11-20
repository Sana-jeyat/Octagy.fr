'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Code2, Video, Lock, Flame, Monitor, HelpCircle, X  } from 'lucide-react'
import { FaBriefcaseMedical } from 'react-icons/fa';
import { ElementType } from 'react'
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Play,
  Award,
  Zap,
  TrendingUp,
  Target,
  ChevronRight,
  Globe,
  Brain,
  Code,
  DollarSign,
  Briefcase,
  Palette,
  Shield,
  Smartphone,
  Heart,
  Stethoscope,
  Calculator,
  Camera,
  Music,
  Gamepad2,
  Wrench,
  GraduationCap as Grid3X3,
  List,
  Bookmark,
  Share2,
   // Icône Certificate de lucide-react
} from 'lucide-react';



interface Category {
  id: string
  name: string
icon: ElementType

}

export interface Course {
  id: number
  moodleId: number
  fullname: string
  shortname?: string
  summary?: string
  imageUrl?: string
  clicks: number
  fiatPrice?: number
  knoPrice?: number
  category?: string

  createdBy?: {
    id: number
    name: string
    avatar?: string
  }

 
}



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
const categoryColorMap: Record<string, string> = {
  'Développement Web': 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
  'Découverte': 'bg-gradient-to-r from-green-400 to-lime-500 text-white',
  'Sécurité': 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
  'CAO-DAO': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  'Montage vidéo': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  'Vente et marketing digital': 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
  'Soins infirmiers': 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white',
  'Kinésithérapie': 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white',
  'Bureautique': 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white',
  'Langues': 'bg-gradient-to-r from-pink-500 to-violet-500 text-white',
  'Infographie': 'bg-gradient-to-r from-teal-500 to-lime-500 text-white',
  'Soft Skills': 'bg-gradient-to-r from-orange-400 to-amber-500 text-white',
  'Management / RH': 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white',
  'Productivité': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white',
  'Comptabilité': 'bg-gradient-to-r from-green-500 to-green-700 text-white',
  'Titres RNCP': 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700',
  'default': 'bg-gray-200 text-gray-700'
}



export default function CoursesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const [totalKnoEarned, setTotalKnoEarned] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showOnlyFree, setShowOnlyFree] = useState(false)
  const [showOnlyCertified, setShowOnlyCertified] = useState(false)
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [displayLimit, setDisplayLimit] = useState(12);
  const coursesToDisplay = filteredCourses.slice(0, displayLimit);


useEffect(() => {
  const fetchCategories = async () => {
    try {
      const resp = await fetch('https://auth.kno.academy/be/api/trainer/categories')
      if (!resp.ok) throw new Error('Erreur chargement catégories')
      const data = await resp.json()

      const mapped = data.categories.map((cat: { name: string; coursecount: any }) => ({
        ...cat,
        icon: iconMap[cat.name.trim()] ?? iconMap['default'],
        color: 'from-yellow-400 to-orange-500', 
        count: cat.coursecount ?? 0,
      }))

      setCategories(mapped)
    } catch (err) {
      console.error(err)
    }
  }
  fetchCategories()
}, [])



const iconMap: Record<string, React.ElementType> = {
  'Développement Web': Code,
  'Découverte': BookOpen,
  'Sécurité': Shield,
  'CAO-DAO': Monitor, // Exemple d'icône pour CAO-DAO
  'Montage Vidéo': Camera,
  'Vente et marketing digital': Zap,
  'Soins infirmiers': Stethoscope,
  'Kinésithérapie': Users,
  'Bureautique': Briefcase,
  'Langues': Globe,
  'Infographie': Palette,
  'Soft Skills': Brain,
  'Management / RH': Briefcase,
  'Productivité': Wrench,
  'Comptabilité': Calculator,
  'Titres RNCP': Bookmark, // Icône pour Titres RNCP
  'default': HelpCircle, // Icône par défaut
};



 useEffect(() => {
    const fetchCourses = async () => {
      try {
        const resp = await fetch('https://auth.kno.academy/be/api/courses/local')
        if (!resp.ok) throw new Error('Erreur chargement cours')
        const data = await resp.json()
        setCourses(data)
        setFilteredCourses(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCourses()
  }, [])

function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '') 
}


  useEffect(() => {
    if (selectedCategory === 'all') {
      fetch('https://auth.kno.academy/be/api/courses/top')
        .then(res => res.json())
        .then(data => {
          setFeaturedCourses(data)
        })
        .catch(console.error)
    }
  }, [selectedCategory])






 useEffect(() => {
    let filtered = courses

    if (selectedCategory !== 'all') {
     filtered = filtered.filter(c => c.category?.trim() === selectedCategory)


    }

    if (searchQuery.trim() !== '') {
      const lower = searchQuery.toLowerCase()
      filtered = filtered.filter(c =>
        c.fullname.toLowerCase().includes(lower) ||
    
        c.summary?.toLowerCase().includes(lower)
      )
    }

    setFilteredCourses(filtered)
  }, [selectedCategory, searchQuery, courses])

  


  console.log(categories);
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
                <div className="text-2xl font-bold">100000</div>
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
                    <option key={category.id} value={category.name}>
                    {category.name}
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
  <div className="flex overflow-x-auto space-x-4 py-4">
    {categories.map((category) => {
      const Icon = category.icon
      const nameTrimmed = category.name.trim()
      const isSelected = selectedCategory === nameTrimmed
      const categoryColor = categoryColorMap[nameTrimmed] || categoryColorMap['default']

      return (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(nameTrimmed)}
          className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 
            ${categoryColor}
            ${isSelected ? 'ring-2 ring-white scale-105 shadow-2xl' : 'opacity-90 hover:opacity-100 shadow-md'}
          `}
        >
          <Icon className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold">{category.name}</div>
          </div>
        </button>
      )
    })}
  </div>
</div>


        {/* Featured Courses */}
         <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <Star className="w-6 h-6 mr-2 text-yellow-500" />
        Formations à la une
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredCourses.slice(0, 2).map(course => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-yellow-200"
          >
            <div className="relative">
              <img src={course.imageUrl} alt={course.fullname} className="w-full h-56 object-cover" />
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  À la une
                </span>
               
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Bestseller
                  </span>
              
            
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    🔥 Trending
                  </span>
            
              </div>
             
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 hover:text-purple-600 transition-colors force-two-lines">
                <Link href={`/courses/${course.id}`}>{course.fullname}</Link>
              </h3>

    <p className="text-gray-600 mb-4 force-two-lines">
  {stripHtml(course.summary || '')
}
</p>



              <div className="flex items-center justify-between mb-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{course.knoPrice} KNO</div>
                  <div className="text-sm text-gray-500">ou {course.fiatPrice}€</div>
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

        {/* Courses Grid/List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory !== 'all' 
  ? categories.find(c => c.name === selectedCategory)?.name 
  : 'Toutes les formations'
}

            </h3>
            <div className="text-sm text-gray-600">
              {filteredCourses.length} résultat{filteredCourses.length > 1 ? 's' : ''}
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {coursesToDisplay.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={course.imageUrl}
                      alt={course.fullname}
                      className="w-full h-48 object-cover"
                    />
                 
                  </div>
                  
                  <div className="p-5">
                   

                    <h3 className="font-bold mb-2 hover:text-purple-600 transition-colors line-clamp-2 force-two-lines">
                      <Link href={`/courses/${course.id}`}>
                        {course.fullname}
                      </Link>
                    </h3>

                  

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        <div className="font-bold text-purple-600">
                          {course.knoPrice} $KNO
                        </div>
                        <div className="text-xs text-gray-500">
                          ou {course.fiatPrice}€
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
              {coursesToDisplay.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={course.imageUrl}
                        alt={course.fullname}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                     
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            
                          
                              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                Bestseller
                              </span>
                          
                           
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                🔥 Trending
                              </span>
                           
                          </div>
                          <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">
                            <Link href={`/courses/${course.id}`}>
                              {course.fullname}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {course.summary}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">
                            {course.knoPrice} KNO
                          </div>
                          <div className="text-sm text-gray-500">
                            ou {course.fiatPrice}€
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                     
                        
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
         <button
  onClick={() => setDisplayLimit(displayLimit + 12)}
  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold"
>
  Charger plus de formations
</button>

          </div>
        )}
      </div>
    </div>
  )
}