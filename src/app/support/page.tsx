'use client'

import { useEffect, useState } from 'react'

interface Faq {
  id: number
  question: string
  answer: string
  // autres props possibles
}

const colors = [
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-blue-500',
]

export default function SupportPage() {
  const [faqs, setFaqs] = useState<Faq[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const faqsPerPage = 6

  // Pour gérer quel(s) carte(s) sont retournées
  const [flippedIds, setFlippedIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('https://auth.kno.academy/be/api/faqs')
        const data = await res.json()
        setFaqs(data)
      } catch (err) {
        console.error('Erreur fetch FAQ:', err)
        setFaqs(null)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  if (loading) return <p className="text-center mt-10">Chargement...</p>
  if (!faqs || !Array.isArray(faqs)) {
    return <p className="text-center mt-10 text-red-600">Erreur lors du chargement des FAQs.</p>
  }

  const totalPages = Math.ceil(faqs.length / faqsPerPage)
  const startIndex = (currentPage - 1) * faqsPerPage
  const currentFaqs = faqs.slice(startIndex, startIndex + faqsPerPage)

  // Toggle flip sur une carte
  function toggleFlip(id: number) {
    setFlippedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center">Foire aux questions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentFaqs.map((faq, idx) => {
          const colorClass = colors[idx % colors.length]
          const isFlipped = flippedIds.has(faq.id)

          return (
            <div
              key={faq.id}
              onClick={() => toggleFlip(faq.id)}
              className="cursor-pointer perspective"
              style={{ perspective: '1000px' }}
              aria-label="FAQ flashcard"
            >
              <div
                className={`relative w-full h-48 rounded-xl shadow-lg transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.7s',
                }}
              >
                {/* Front */}
                <div
                  className={`${colorClass} absolute w-full h-full rounded-xl flex items-center justify-center p-6 text-white font-semibold text-lg backface-hidden`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {faq.question}
                </div>

                {/* Back */}
               {/* Back */}
<div
  className="absolute w-full h-full rounded-xl bg-white text-gray-800 p-6 backface-hidden rotate-y-180 shadow-inner flex items-center justify-center"
  style={{
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
  }}
>
  <p className="text-sm sm:text-base text-center leading-relaxed">
    {faq.answer}
  </p>
</div>

              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-3 mt-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Précédent
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  )
}
