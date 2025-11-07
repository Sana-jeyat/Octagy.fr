'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import axiosInstance from '@/context/axiosInstance'
import 'react-toastify/dist/ReactToastify.css'

const SuccessStripePlan = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const session_id = params.get('session_id')

    if (!session_id) {
      setError('Session de paiement manquante')
      setLoading(false)
      return
    }

 const verifyPayment = async () => {
  try {
    const res = await axiosInstance.get(`/stripe/verify-session?session_id=${session_id}`)
    const data = res.data

    if (!data.paid) {
      setError('Paiement non validé')
      setLoading(false)
      return
    }

    // On valide que c’est un abonnement
    if (!data.planId) {
      setError('Session de paiement non liée à un abonnement')
      setLoading(false)
      return
    }

    toast.success('Abonnement activé avec succès ! 🎉')

    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  } catch (err: any) {
    setError(err.response?.data?.error || 'Erreur lors de la vérification du paiement')
  } finally {
    setLoading(false)
  }
}


    verifyPayment()
  }, [])

  return (
    <>
      <ToastContainer />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <>
            <CircularProgress />
            <Typography variant="h6" mt={2}>
              Vérification du paiement...
            </Typography>
          </>
        ) : error ? (
          <Typography variant="h6" color="error">
            Erreur : {error}
          </Typography>
        ) : (
          <Typography variant="h6" color="primary">
            Paiement confirmé ! Redirection en cours...
          </Typography>
        )}
      </Box>
    </>
  )
}

export default SuccessStripePlan
