'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, PieChart, Lock, Coins, Users, Zap, Shield, Target } from 'lucide-react'

export function Tokenomics() {
  const [knoPrice, setKnoPrice] = useState(0.85)
  const [marketCap, setMarketCap] = useState(85000000)
  const [totalSupply] = useState(100000000)
  const [circulatingSupply, setCirculatingSupply] = useState(45000000)

  useEffect(() => {
    const interval = setInterval(() => {
      setKnoPrice(prev => prev + (Math.random() - 0.5) * 0.02)
      setMarketCap(prev => prev + (Math.random() - 0.5) * 100000)
      setCirculatingSupply(prev => prev + Math.floor(Math.random() * 1000))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const tokenDistribution = [
    { name: 'Récompenses Learn-to-Earn', percentage: 40, color: 'from-green-500 to-emerald-500' },
    { name: 'Knowledge Pools (Staking)', percentage: 25, color: 'from-blue-500 to-cyan-500' },
    { name: 'Équipe & Développement', percentage: 15, color: 'from-purple-500 to-pink-500' },
    { name: 'Partenariats & Marketing', percentage: 10, color: 'from-orange-500 to-red-500' },
    { name: 'Réserve Écosystème', percentage: 10, color: 'from-indigo-500 to-purple-500' }
  ]

  const stakingPools = [
    {
      name: 'Pool Basic',
      apy: '5%',
      minimum: '100 $KNO',
      lockPeriod: '30 jours',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Pool Premium',
      apy: '12%',
      minimum: '500 $KNO',
      lockPeriod: '90 jours',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Pool Elite',
      apy: '20%',
      minimum: '2000 $KNO',
      lockPeriod: '180 jours',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Tokenomics{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              $KNO
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Un écosystème économique conçu pour récompenser l'apprentissage et créer de la valeur durable.
          </p>
        </div>

        {/* Live Token Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-sm text-green-600 font-semibold">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${knoPrice.toFixed(3)}
            </div>
            <div className="text-sm text-gray-600">Prix $KNO</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <PieChart className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-blue-600 font-semibold">Live</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${(marketCap / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Market Cap</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Coins className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-purple-600 font-semibold">Max</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {(totalSupply / 1000000).toFixed(0)}M
            </div>
            <div className="text-sm text-gray-600">Total Supply</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-orange-500" />
              <span className="text-sm text-orange-600 font-semibold">45%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {(circulatingSupply / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Circulating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Token Distribution */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <PieChart className="w-6 h-6 mr-3 text-purple-600" />
              Distribution des Tokens
            </h3>
            
            <div className="space-y-6">
              {tokenDistribution.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
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

            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700">
                <strong>Mécanisme de Burn :</strong> 2% des tokens utilisés pour les achats de cours sont automatiquement brûlés, 
                créant une pression déflationniste et augmentant la valeur des tokens restants.
              </p>
            </div>
          </div>

          {/* Staking Pools */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-purple-600" />
              Knowledge Pools
            </h3>
            
            <div className="space-y-6">
              {stakingPools.map((pool, index) => {
                const Icon = pool.icon
                return (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${pool.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900">{pool.name}</h4>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{pool.apy}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Minimum :</span>
                        <div className="font-semibold text-gray-900">{pool.minimum}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Période :</span>
                        <div className="font-semibold text-gray-900">{pool.lockPeriod}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">
                <strong>Récompenses Composées :</strong> Les rewards de staking sont automatiquement réinvestis, 
                maximisant vos gains grâce aux intérêts composés.
              </p>
            </div>
          </div>
        </div>

        {/* Utility & Use Cases */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Utilité du Token $KNO
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Paiement de Cours</h4>
              <p className="text-gray-600 text-sm">
                Utilisez vos $KNO pour accéder aux formations premium et bénéficier de réductions exclusives.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Gouvernance DAO</h4>
              <p className="text-gray-600 text-sm">
                Participez aux décisions de l'écosystème et votez sur les nouvelles fonctionnalités.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Staking Rewards</h4>
              <p className="text-gray-600 text-sm">
                Générez des revenus passifs en stakant vos tokens dans nos Knowledge Pools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}