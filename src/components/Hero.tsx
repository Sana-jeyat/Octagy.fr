'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, TrendingUp, Users, Award, ArrowRight, Zap, Building, GraduationCap, Youtube, Instagram, Facebook, MessageCircle, Trophy, Target, Flame, BookOpen, Wallet } from 'lucide-react'

export function Hero() {
  const [knoPrice, setKnoPrice] = useState(0.85)
  const [totalLearners, setTotalLearners] = useState(12847)
  const [tokensDistributed, setTokensDistributed] = useState(2847592)
  const [activeAudience, setActiveAudience] = useState<'students' | 'business'>('students')

  useEffect(() => {
    const interval = setInterval(() => {
      setKnoPrice(prev => prev + (Math.random() - 0.5) * 0.01)
      setTotalLearners(prev => prev + Math.floor(Math.random() * 3))
      setTokensDistributed(prev => prev + Math.floor(Math.random() * 50))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-20 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Audience Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/50">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveAudience('students')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeAudience === 'students'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Apprenants</span>
              </button>
              <button
                onClick={() => setActiveAudience('business')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeAudience === 'business'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Building className="w-5 h-5" />
                <span>Entreprises</span>
              </button>
            </div>
          </div>
        </div>

        {/* Students View */}
        {activeAudience === 'students' && (
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-purple-700 border border-purple-200">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Apprends • Joue • Gagne</span>
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Transforme
              </span>
              <br />
              <span className="text-gray-900">
                ton temps d'écran
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                en récompenses !
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              La première plateforme qui transforme ton temps d'écran en apprentissage rémunéré. 
              <strong className="text-purple-600">3 clics maximum</strong> pour commencer à gagner !
            </p>

            {/* Quick Access Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-xl border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Accès rapide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/courses" className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-semibold text-blue-900">Catalogue</span>
                </Link>
                <Link href="/dashboard" className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                  <Target className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-semibold text-purple-900">Quiz Rapide</span>
                </Link>
                <Link href="/community" className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                  <Trophy className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-semibold text-green-900">Classements</span>
                </Link>
                <button className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
                  <Wallet className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-semibold text-orange-900">Wallet</span>
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Commencer à gagner
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-700 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-200">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Voir comment ça marche
              </button>
            </div>

            {/* Gamification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <Flame className="w-8 h-8 text-orange-300" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {totalLearners.toLocaleString()}
                </div>
                <div className="text-purple-100 text-sm">Apprenants actifs</div>
                <div className="text-xs text-purple-200 mt-1">+247 cette semaine</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <Trophy className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {(tokensDistributed / 1000000).toFixed(1)}M
                </div>
                <div className="text-green-100 text-sm">$KNO distribués</div>
                <div className="text-xs text-green-200 mt-1">+15K aujourd'hui</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  ${knoPrice.toFixed(3)}
                </div>
                <div className="text-blue-100 text-sm">Prix $KNO</div>
                <div className="text-xs text-blue-200 mt-1">+12.5% (24h)</div>
              </div>
            </div>
          </div>
        )}

        {/* Business View */}
        {activeAudience === 'business' && (
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-700 border border-blue-200">
                <Building className="w-4 h-4" />
                <span>Solutions Entreprise</span>
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Formez.
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Financez.
              </span>
              <br />
              <span className="text-gray-900">
                Mesurez.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              <strong>Knowledge Stipend</strong> : Sponsorisez, suivez, mesurez. 
              Dashboard simple et reporting clair pour optimiser vos investissements formation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/enterprise"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Solutions Entreprise
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-700 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-200">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Démo Knowledge Stipend
              </button>
            </div>

            {/* Business Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <Building className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  150+
                </div>
                <div className="text-sm text-gray-600">Entreprises partenaires</div>
                <div className="text-xs text-blue-600 mt-1">Fortune 500 incluses</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  +340%
                </div>
                <div className="text-sm text-gray-600">ROI formation moyen</div>
                <div className="text-xs text-green-600 mt-1">Mesuré sur 12 mois</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  25K+
                </div>
                <div className="text-sm text-gray-600">Employés formés</div>
                <div className="text-xs text-purple-600 mt-1">Satisfaction 4.8/5</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}