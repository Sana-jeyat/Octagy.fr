'use client'

import { useState } from 'react'
import { Play, Youtube, Instagram, Facebook, MessageCircle, Target, Trophy, Zap, Clock, Star, CheckCircle, ArrowRight, BookOpen, Coins } from 'lucide-react'
import { Shield } from 'lucide-react'
import Chatbot from './Chatbot'

export function LearnToEarn() {
  const [activeStep, setActiveStep] = useState(0)

  const platforms = [
    { name: 'YouTube', icon: Youtube, color: 'bg-red-500', users: '2.7B' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500', users: '2.4B' },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', users: '3.0B' },
    { name: 'TikTok', icon: MessageCircle, color: 'bg-black', users: '1.7B' }
  ]

  const steps = [
    {
      title: 'Choisis ton contenu',
      description: 'Sélectionne des vidéos éducatives sur tes plateformes préférées',
      icon: Play,
      color: 'from-red-500 to-pink-500',
      details: [
        'Contenus vérifiés par nos experts',
        'Durée adaptée : 2-15 minutes',
        'Disponible sur toutes les plateformes',
        'Sous-titres en français'
      ]
    },
    {
      title: 'Quiz rapide (2 min)',
      description: 'Valide tes connaissances avec 3-5 questions simples',
      icon: Target,
      color: 'from-purple-500 to-indigo-500',
      details: [
        'Quiz de 2 minutes maximum',
        'Questions adaptées au contenu',
        'Feedback immédiat',
        'Plusieurs tentatives possibles'
      ]
    },
    {
      title: 'Gagne tes rewards',
      description: 'Reçois instantanément tes tokens $KNO et badges',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      details: [
        'Tokens $KNO instantanés',
        'Badges de progression',
        'Points d\'expérience',
        'Classements communautaires'
      ]
    }
  ]

  const quickStats = [
    {
      icon: Clock,
      value: '2-15min',
      label: 'Durée moyenne',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      value: '5-50',
      label: '$KNO par contenu',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      value: '85%',
      label: 'Taux de réussite',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Satisfaction',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <><section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Transforme ton{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              temps d'écran
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Regarde des contenus éducatifs, valide par un quiz rapide, gagne des rewards.
            <strong className="text-purple-600">Simple et addictif !</strong>
          </p>
        </div>

        {/* Comment ça marche - Schéma iKNO/$KNO */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Comment ça marche ?
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">1. J'apprends</h4>
                <p className="text-gray-600 text-sm">Je suis des formations et réussis des quiz</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">2. Je gagne des iKNO</h4>
                <p className="text-gray-600 text-sm">Crédits internes utilisables immédiatement</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">3. Je valide mon profil</h4>
                <p className="text-gray-600 text-sm">KYC pour transformer mes iKNO en $KNO</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">4. J'échange mes $KNO</h4>
                <p className="text-gray-600 text-sm">Tokens officiels échangeables sur DEX/CEX</p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-purple-800 mb-2">iKNO = Crédits internes</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Récompenses immédiates</li>
                    <li>• Utilisables pour formations</li>
                    <li>• Pas de KYC requis</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-blue-800 mb-2">$KNO = Token officiel</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Échangeable sur plateformes</li>
                    <li>• Utilisable pour formations</li>
                    <li>• KYC requis pour conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Supported Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Sur tes plateformes préférées
          </h3>
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            {platforms.map((platform, index) => {
              const Icon = platform.icon
              return (
                <div key={index} className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{platform.name}</div>
                    <div className="text-sm text-gray-500">{platform.users} utilisateurs</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* How it Works - Simplified */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            3 étapes simples
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 cursor-pointer ${activeStep === index ? 'border-purple-300 shadow-2xl' : 'border-gray-100 hover:border-purple-200'}`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h4>

                  <p className="text-gray-600 text-center mb-6">
                    {step.description}
                  </p>

                  {activeStep === index && (
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à transformer ton temps d'écran ?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Rejoins 12,000+ apprenants qui gagnent déjà des $KNO en regardant des contenus éducatifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Commencer maintenant
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg flex items-center justify-center">
                <BookOpen className="mr-2 w-5 h-5" />
                Voir le catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </section></>
  )
}