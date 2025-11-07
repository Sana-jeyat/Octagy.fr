'use client'

import { useEffect, useState } from 'react'
import { Loader2, AlertTriangle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { GraduationCap } from "lucide-react";
import toast from 'react-hot-toast'
import axiosInstance from '@/context/axiosInstance';

interface Transaction {
  id: number
  amount: number
  type: string
  walletAddress: string | null
  txHash: string | null
  createdAt: string
  course: {
    id: number
    title: string
  }
}

export default function MyTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
  async function fetchTransactions() {
    setLoading(true);
    setError(false);

    try {
      const { data } = await axiosInstance.get('/transactions'); // ✅ Cookie envoyé automatiquement

      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        throw new Error('Format de données inattendu');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des transactions:', err);
      setError(true);
      toast.error('Erreur lors du chargement des transactions');
    } finally {
      setLoading(false);
    }
  }

  fetchTransactions();
}, []);

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium py-10 flex items-center justify-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Impossible de charger les transactions.
      </div>
    )
  }




if (transactions.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-60 text-center text-gray-600">
      <GraduationCap className="w-20 h-20 text-purple-500 mb-4 animate-bounce" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Vous n’avez encore acheté aucune formation 
      </h2>
      <p className="text-gray-500 max-w-md mb-4">
        Commencez votre aventure d’apprentissage dès aujourd’hui et débloquez de
        nouvelles opportunités avec <span className="font-semibold text-purple-600">KnoAcademy</span> !
      </p>
      <a
        href="/courses"
        className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition"
      >
        Explorer les formations
      </a>
    </div>
  );
}



  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Mes Transactions
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Cours</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Mode de Paiement</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Montant</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Facture</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentTransactions.map((tx) => {
              const isKno = tx.type.toLowerCase() === 'kno'
              const symbol = isKno ? 'KNO' : '€'
              const formattedDate = new Date(tx.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
              return (
                <tr key={tx.id}>
                  <td className="px-6 py-4 text-gray-800">{tx.course?.title || 'Cours inconnu'}</td>
                  <td className="px-6 py-4">{tx.type}</td>
                  <td className="px-6 py-4">
                    {tx.amount} <span className="text-gray-400">{symbol}</span>
                  </td>
                  <td className="px-6 py-4">{formattedDate}</td>
                  <td className="px-6 py-4">
                    {tx.txHash ? (
                      <a
                        href={`https://polygonscan.com/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Voir <ExternalLink className="w-4 h-4 inline" />
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">En cours</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination moderne */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium transition-all 
            hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>

        <span className="text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded-full">
           {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium transition-all 
            hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
