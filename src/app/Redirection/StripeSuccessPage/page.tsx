'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import axiosInstance from '@/context/axiosInstance'
import 'react-toastify/dist/ReactToastify.css'

const SuccessPage = () => {
  const router = useRouter()

  const [sessionId, setSessionId] = useState<string | null>(null)
  const [courseUrl, setCourseUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const session_id = params.get('session_id')

    if (!session_id) {
      setError('Session de paiement manquante')
      setLoading(false)
      return
    }

    setSessionId(session_id)

    // Nettoyer l'URL (hash)
    window.history.replaceState(null, '', window.location.pathname)

    const enrollCourse = async () => {
      try {
        // Vérification du paiement
        const verifyRes = await axiosInstance.get(`/stripe/verify-session?session_id=${session_id}`)
        const verifyData = verifyRes.data

        if (!verifyData.paid) {
          setError('Paiement non validé')
          setLoading(false)
          return
        }

        toast.success('Paiement effectué avec succès !')

        // Enroll dans le cours
        const enrollRes = await axiosInstance.post(`/moodle/course/${verifyData.courseId}/enroll`)
        const enrollData = enrollRes.data

        if (!enrollData.redirect_url) {
          setError('URL de redirection manquante')
          setLoading(false)
          return
        }

        setCourseUrl(enrollData.redirect_url)
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    enrollCourse()
  }, [])

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Chargement du cours...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Erreur : {error}
        </Typography>
        <Button variant="contained" onClick={() => router.push('/dashboard/my-courses')} sx={{ mt: 2 }}>
          Retour à mes cours
        </Button>
      </Box>
    )
  }

  return (
    <>
      <ToastContainer />
      <Box sx={{ minHeight: '100vh', position: 'relative' }}>
        {courseUrl ? (
          <iframe
            src={courseUrl}
            title="Cours Moodle"
            style={{
              width: '100%',
              height: '100vh',
              border: 'none',
            }}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  )
}

export default SuccessPage
