'use client'

import { useState, useEffect } from 'react'
import { Trophy, Target, Flame, Star, Award, Zap, Users, TrendingUp, Calendar, Clock } from 'lucide-react'

export function Gamification() {
  const [dailyStreak, setDailyStreak] = useState(7)
  const [weeklyScore, setWeeklyScore] = useState(2847)
  const [dailyProgress, setDailyProgress] = useState(75)

  // Learning time distribution data
  const learningData = [
    { subject: 'Sciences', percentage: 35, color: 'from-blue-500 to-cyan-500', time: '2h 30min' },
    { subject: 'Économie', percentage: 25, color: 'from-green-500 to-emerald-500', time: '1h 45min' },
    { subject: 'Technologie', percentage: 20, color: 'from-purple-500 to-pink-500', time: '1h 25min' },
    { subject: 'Histoire', percentage: 12, color: 'from-orange-500 to-red-500', time: '50min' },
    { subject: 'Arts', percentage: 8, color: 'from-pink-500 to-rose-500', time: '35min' }
  ]

  const badges = [
    { name: 'Première Victoire', icon: '🏆', earned: true, description: 'Premier quiz réussi' },
    { name: 'Marathonien', icon: '🏃‍♂️', earned: true, description: '7 jours consécutifs' },
    { name: 'Scientifique', icon: '🔬', earned: true, description: '50 quiz sciences' },
    { name: 'Économiste', icon: '📈', earned: false, description: '100 quiz économie' },
    { name: 'Polyglotte', icon: '🌍', earned: false, description: 'Cours en 3 langues' },
    { name: 'Mentor', icon: '👨‍🏫', earned: false, description: 'Aider 10 étudiants' }
  ]

  const leaderboard = [
    { rank: 1, name: 'Alex Thompson', score: 15420, avatar: '👨‍💻', streak: 23 },
    { rank: 2, name: 'Marie Dubois', score: 14890, avatar: '👩‍🎓', streak: 19 },
    { rank: 3, name: 'Jean Martin', score: 13750, avatar: '👨‍🔬', streak: 15 },
    { rank: 4, name: 'Sophie Chen', score: 12340, avatar: '👩‍💼', streak: 12 },
    { rank: 5, name: 'Toi', score: weeklyScore, avatar: '🎯', streak: dailyStreak, isUser: true }
  ]

  const sidequests = [
    {
      title: 'Visionne 30 min de sciences cette semaine',
      progress: 75,
      reward: 25,
      timeLeft: '2 jours',
      difficulty: 'Facile',
      icon: '🔬'
    },
    {
      title: 'Réussis 5 quiz d\'économie parfaits',
      progress: 40,
      reward: 50,
      timeLeft: '5 jours',
      difficulty: 'Moyen',
      icon: '📈'
    },
    {
      title: 'Maintiens ta streak 14 jours',
      progress: 50,
      reward: 100,
      timeLeft: '7 jours',
      difficulty: 'Difficile',
      icon: '🔥'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setWeeklyScore(prev => prev + Math.floor(Math.random() * 10))
      if (Math.random() > 0.8) {
        setDailyProgress(prev => Math.min(100, prev + 1))
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Progression{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              & Rewards
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Streaks quotidiens, objectifs personnalisés et classements communautaires. Simple et motivant !
          </p>
        </div>

        {/* Progress Rings & Daily Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Daily Progress Ring */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Aujourd'hui
              </h3>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#gradient1)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - dailyProgress / 100)}`}
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
                    <div className="text-2xl font-bold text-gray-900">{dailyProgress}%</div>
                    <div className="text-xs text-gray-500">Terminé</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Temps aujourd'hui</span>
                  <span className="font-semibold">45min / 60min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz réussis</span>
                  <span className="font-semibold">3 / 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-center">
                <Flame className="w-5 h-5 mr-2 text-yellow-300" />
                Streak
              </h3>
              
              <div className="mb-6">
                <div className="text-6xl font-bold mb-2">{dailyStreak}</div>
                <div className="text-orange-100">jours consécutifs</div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-sm text-orange-100 mb-2">Prochain palier : 14 jours</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(dailyStreak / 14) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-orange-200 mt-2">Récompense : Badge Marathonien Pro</div>
              </div>
            </div>
          </div>

          {/* Weekly Score */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
                Cette Semaine
              </h3>
              
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">{weeklyScore.toLocaleString()}</div>
                <div className="text-green-100">points cette semaine</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-green-100">
                  <span>Rang cette semaine</span>
                  <span className="font-semibold">#5</span>
                </div>
                <div className="flex justify-between text-green-100">
                  <span>Progression</span>
                  <span className="font-semibold text-yellow-300">+12 places</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Time Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-purple-600" />
              Répartition du Temps d'Apprentissage
            </h3>
            
            <div className="space-y-4">
              {learningData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{item.subject}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{item.percentage}%</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-700">
                <strong>Total cette semaine :</strong> 7h 25min d'apprentissage
              </div>
              <div className="text-xs text-purple-600 mt-1">
                +2h 15min par rapport à la semaine dernière 📈
              </div>
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-purple-600" />
              KNOwards & Badges
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                    badge.earned 
                      ? 'border-green-200 bg-green-50 hover:border-green-300' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-semibold text-xs text-gray-900 mb-1">{badge.name}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                  {badge.earned && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        ✓ Obtenu
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Progression badges</div>
              <div className="text-2xl font-bold text-purple-600">4 / 12</div>
              <div className="text-xs text-gray-500">Prochain : Économiste (75% terminé)</div>
            </div>
          </div>
        </div>

        {/* Leaderboard & Sidequests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-purple-600" />
              Classement de la Semaine
            </h3>
            
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    user.isUser 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className={`font-semibold ${user.isUser ? 'text-purple-900' : 'text-gray-900'}`}>
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center space-x-2">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{user.streak} jours</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{user.score.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidequests */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-purple-600" />
              Défis & Sidequests
            </h3>
            
            <div className="space-y-6">
              {sidequests.map((quest, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{quest.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{quest.title}</h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full font-semibold ${
                            quest.difficulty === 'Facile' ? 'bg-green-100 text-green-700' :
                            quest.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {quest.difficulty}
                          </span>
                          <span>⏰ {quest.timeLeft}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+{quest.reward} $KNO</div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold">{quest.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${quest.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold">
                Voir tous les défis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}