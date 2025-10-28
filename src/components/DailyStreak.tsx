'use client'

import { useState, useEffect } from 'react'
import { 
  Flame, 
  Target, 
  Clock, 
  Trophy, 
  Star, 
  Zap, 
  Calendar,
  CheckCircle,
  TrendingUp,
  Award,
  Brain,
  BookOpen,
  Play
} from 'lucide-react'

export function DailyStreak() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [dailyGoalProgress, setDailyGoalProgress] = useState(75)
  const [weeklyGoalProgress, setWeeklyGoalProgress] = useState(60)
  const [todayMinutes, setTodayMinutes] = useState(45)
  const [dailyGoalMinutes] = useState(60)
  const [weeklyGoalMinutes] = useState(300)
  const [weeklyMinutes, setWeeklyMinutes] = useState(180)

  const streakMilestones = [
    { days: 7, reward: 25, badge: '🔥', title: 'Semaine Parfaite', achieved: true },
    { days: 14, reward: 50, badge: '⚡', title: 'Deux Semaines', achieved: false },
    { days: 30, reward: 100, badge: '💎', title: 'Mois Complet', achieved: false },
    { days: 100, reward: 500, badge: '👑', title: 'Centurion', achieved: false }
  ]

  const dailyGoals = [
    {
      id: 1,
      title: 'Temps d\'apprentissage',
      target: '60 min',
      current: `${todayMinutes} min`,
      progress: dailyGoalProgress,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      completed: dailyGoalProgress >= 100
    },
    {
      id: 2,
      title: 'Quiz réussis',
      target: '3 quiz',
      current: '2 quiz',
      progress: 67,
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      completed: false
    },
    {
      id: 3,
      title: 'Cours commencés',
      target: '1 cours',
      current: '1 cours',
      progress: 100,
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      completed: true
    }
  ]

  const weeklyGoals = [
    {
      id: 1,
      title: 'Temps total',
      target: `${weeklyGoalMinutes} min`,
      current: `${weeklyMinutes} min`,
      progress: weeklyGoalProgress,
      icon: Clock,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'Jours actifs',
      target: '5 jours',
      current: '3 jours',
      progress: 60,
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 3,
      title: 'Cours terminés',
      target: '2 cours',
      current: '1 cours',
      progress: 50,
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const recentAchievements = [
    {
      title: 'Première Semaine',
      description: '7 jours consécutifs d\'apprentissage',
      badge: '🔥',
      reward: 25,
      date: 'Aujourd\'hui',
      new: true
    },
    {
      title: 'Quiz Master',
      description: '10 quiz parfaits',
      badge: '🧠',
      reward: 30,
      date: 'Hier',
      new: false
    },
    {
      title: 'Explorateur',
      description: '5 thématiques différentes',
      badge: '🌟',
      reward: 20,
      date: 'Il y a 2 jours',
      new: false
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setTodayMinutes(prev => Math.min(dailyGoalMinutes, prev + 1))
        setWeeklyMinutes(prev => Math.min(weeklyGoalMinutes, prev + 1))
        setDailyGoalProgress(prev => Math.min(100, (todayMinutes / dailyGoalMinutes) * 100))
        setWeeklyGoalProgress(prev => Math.min(100, (weeklyMinutes / weeklyGoalMinutes) * 100))
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [todayMinutes, weeklyMinutes, dailyGoalMinutes, weeklyGoalMinutes])

  const getNextMilestone = () => {
    return streakMilestones.find(milestone => !milestone.achieved)
  }

  const nextMilestone = getNextMilestone()

  return (
    <div className="space-y-8">
      {/* Streak Counter */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Flame className="w-12 h-12 text-yellow-300 animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Streak</h2>
          <div className="text-6xl font-bold mb-4">{currentStreak}</div>
          <div className="text-xl text-orange-100 mb-6">jours consécutifs</div>
          
          {nextMilestone && (
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm text-orange-100 mb-2">
                Prochain palier : {nextMilestone.days} jours
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStreak / nextMilestone.days) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-orange-200 mt-2 flex items-center justify-center">
                <span className="mr-2">{nextMilestone.badge}</span>
                {nextMilestone.title} (+{nextMilestone.reward} $KNO)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Daily Goals */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-3 text-purple-600" />
          Aujourd'hui
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dailyGoals.map((goal) => {
            const Icon = goal.icon
            return (
              <div key={goal.id} className="relative">
                <div className={`bg-gradient-to-r ${goal.color.replace('500', '50').replace('600', '50')} rounded-xl p-6 border border-opacity-30`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {goal.completed && (
                      <div className="bg-green-500 text-white p-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2">{goal.title}</h4>
                  <div className="text-sm text-gray-600 mb-4">
                    {goal.current} / {goal.target}
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold">{Math.round(goal.progress)}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${goal.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-3 text-purple-600" />
          Cette Semaine
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeklyGoals.map((goal) => {
            const Icon = goal.icon
            return (
              <div key={goal.id} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${goal.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{Math.round(goal.progress)}%</span>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-2">{goal.title}</h4>
                <div className="text-sm text-gray-600 mb-4">
                  {goal.current} / {goal.target}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${goal.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Streak Milestones */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Award className="w-6 h-6 mr-3 text-purple-600" />
          Paliers de Streak
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {streakMilestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-xl border-2 transition-all duration-300 ${
                milestone.achieved 
                  ? 'border-green-200 bg-green-50' 
                  : currentStreak >= milestone.days * 0.5
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-3">{milestone.badge}</div>
              <div className="font-bold text-gray-900 mb-1">{milestone.title}</div>
              <div className="text-sm text-gray-600 mb-2">{milestone.days} jours</div>
              <div className="text-sm font-semibold text-green-600">
                +{milestone.reward} $KNO
              </div>
              {milestone.achieved && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    ✓ Obtenu
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Star className="w-6 h-6 mr-3 text-purple-600" />
          Réussites Récentes
        </h3>
        
        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
              achievement.new 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 animate-pulse-slow' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{achievement.badge}</div>
                <div>
                  <div className="font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{achievement.title}</span>
                    {achievement.new && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        NOUVEAU !
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                  <div className="text-xs text-gray-500">{achievement.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+{achievement.reward} $KNO</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}