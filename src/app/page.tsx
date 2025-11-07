import { Hero } from '@/components/Hero'
import { LearnToEarn } from '@/components/LearnToEarn'
import { Gamification } from '@/components/Gamification'
import { Features } from '@/components/Features'
import { Tokenomics } from '@/components/Tokenomics'
import { Roadmap } from '@/components/Roadmap'
import { Team } from '@/components/Team'
import { CTA } from '@/components/CTA'
import Link from 'next/link'
import Image from "next/image";

import { Building2, Users, TrendingUp, Shield, Zap, GraduationCap } from 'lucide-react'

export default function Home() {
  return (
    <main>
      <Hero />
      <LearnToEarn />
      <Features />
      <Gamification />
      
      {/* Section Partenaires */}
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Titre et description */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Nos{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Partenaires
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            <strong>KNO connecte les savoirs, les partenaires restent les formateurs.</strong>
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-justify">
            Nous valorisons les formations de nos partenaires en les intégrant dans le parcours global 
            des utilisateurs, tout en offrant visibilité et reporting centralisé.
          </p>
        </div>

        {/* Cartes partenaires */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  {/* OCTAGY */}
  <div className="flex flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-sm hover:shadow-md transition text-justify h-full">
    <div className="flex justify-center items-center h-32 mb-6">
      <img
        src="/partners/octagy.png"
        alt="Logo OCTAGY Formation"
        className="max-h-24 w-auto object-contain"
      />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
      OCTAGY Formation
    </h3>
    <p className="text-gray-600 mb-4 text-justify">
      Organisme Qualiopi spécialisé dans la formation médicale et pharmaceutique,
      reconnu pour son expertise et sa qualité pédagogique.
    </p>
  </div>

  {/* APTEED */}
  <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 shadow-sm hover:shadow-md transition text-justify h-full">
    <div className="flex justify-center items-center h-32 mb-6">
      <img
        src="/partners/apteed.png"
        alt="Logo Apteed"
        className="max-h-24 w-auto object-contain"
      />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Apteed</h3>
    <p className="text-gray-600 mb-4 text-justify">
      Expert en formation santé et sécurité au travail, Apteed accompagne les professionnels
      dans le développement de leurs compétences essentielles.
    </p>
  </div>

  {/* France Prévention Secourisme */}
  <div className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-sm hover:shadow-md transition text-justify h-full">
    <div className="flex justify-center items-center h-32 mb-6">
      <img
        src="/partners/fps.png"
        alt="Logo France Prévention Secourisme"
        className="max-h-24 w-auto object-contain"
      />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
      France Prévention Secourisme
    </h3>
    <p className="text-gray-600 mb-4 text-justify">
      Spécialisé dans les formations en secourisme, sécurité incendie et gestes d’urgence,
      FPS s’engage pour la prévention et la réactivité.
    </p>
  </div>
</div>


        {/* Bouton CTA */}
        <div className="text-center">
          <Link
            href="/partners"
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-md"
          >
            Découvrir nos partenaires
          </Link>
        </div>
      </div>
    </section>
      
      <Tokenomics />
      {/* <Team /> */}
      <CTA />
    </main>
  )
}