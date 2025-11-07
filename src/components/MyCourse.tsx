'use client'

import React, { useState, useEffect } from 'react'
import {
  Play,
  Share2,
  UserMinus,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { BookOpen } from "lucide-react";
import axiosInstance from '@/context/axiosInstance'


export interface Course {
  id: number
  moodleId: number
  fullname: string
  shortname?: string
  summary?: string
  courseimage?: string
  clicks: number
  fiatPrice?: number
  knoPrice?: number
  category?: string
  createdBy?: {
    id: number
    name: string
    avatar?: string
  }
}

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=60'

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [unsubscribingId, setUnsubscribingId] = useState<number | null>(null)
  const [confirmationId, setConfirmationId] = useState<number | null>(null)
  const router = useRouter()
 

  useEffect(() => {
  const fetchCourses = async () => {
    setLoading(true)
    setError(false)

    try {
      // ✅ Appel direct, cookie envoyé automatiquement
      const res = await axiosInstance.get('/moodle/my-courses')

      const data = res.data

      if (data.success && Array.isArray(data.data?.courses)) {
        const withImages = data.data.courses.map((course: Course) => ({
          ...course,
          image: PLACEHOLDER_IMAGE,
        }))
        setCourses(withImages)
      } else {
        setCourses([])
      }
    } catch (err) {
      console.error('Erreur de récupération des cours:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  fetchCourses()
}, [])


//   const handleResumeCourse = async (courseId: number) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Utilisateur non authentifié.");
//       return;
//     }

//     const res = await fetch(`https://auth.kno.academy/be/api/moodle/course/${courseId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw new Error("Erreur serveur");

//     const data = await res.json();
//     const encodedUrl = encodeURIComponent(data.redirect_url);

//     router.push(`/fe/#/dashboard/course-viewer?url=${encodedUrl}`);
//   } catch (err) {
//     console.error("Erreur redirection :", err);
//     toast.error("Impossible de reprendre le cours.");
//   }
// };

const handleResumeCourse = async (courseId: number) => {
  try {
    const res = await axiosInstance.get(`/moodle/course/${courseId}`)
    const encodedUrl = encodeURIComponent(res.data.redirect_url)
    router.push(`/course-viewer?url=${encodedUrl}`)
  } catch (err: any) {
    console.error('Erreur redirection :', err)
    toast.error(
      err.response?.data?.message || 'Impossible de reprendre le cours.'
    )
  }
}

//   const handleUnsubscribe = async (courseId: number) => {
//   setUnsubscribingId(courseId)
//   try {
//     const token = localStorage.getItem('token')
//     if (!token) throw new Error('Token manquant')

//     const res = await fetch(
//       'https://auth.kno.academy/be/api/moodle/unenroll-course',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ course_id: courseId }),
//       }
//     )

//     const data = await res.json()

//     if (!res.ok || !data.success) {
//       throw new Error(data.message || 'Erreur API')
//     }

  
//     setCourses((prev) => prev.filter((c) => c.id !== courseId))

//     toast.success('Désinscription réussie ')
//   } catch (err: any) {
//     console.error(err)
//     toast.error('Erreur lors de la désinscription ')
//   } finally {
//     setUnsubscribingId(null)
//     setConfirmationId(null)
//   }
// }


const handleUnsubscribe = async (courseId: number) => {
  setUnsubscribingId(courseId)

  try {
    // 🔁 Appel sécurisé avec cookie HttpOnly
    const res = await axiosInstance.post('/moodle/unenroll-course', {
      course_id: courseId,
    })

    if (!res.data.success) {
      throw new Error(res.data.message || 'Erreur API')
    }

    // ✅ Mise à jour locale de la liste des cours
    setCourses((prev) => prev.filter((c) => c.id !== courseId))

    toast.success('Désinscription réussie !')
  } catch (err: any) {
    console.error('Erreur désinscription :', err)
    toast.error(err.response?.data?.message || 'Erreur lors de la désinscription')
  } finally {
    setUnsubscribingId(null)
    setConfirmationId(null)
  }
}

  const handleShare = (course: Course) => {
    if (navigator.share) {
      navigator
        .share({
          title: course.fullname,
          text: `Regarde ce cours : ${course.fullname}`,
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      alert('Le partage n’est pas supporté sur ce navigateur.')
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    )

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold py-10">
        Erreur lors du chargement des cours, réessayer plus tard.
      </div>
    )



if (courses.length === 0)
  return (
    <div className="flex flex-col items-center justify-center py-60 text-center text-gray-600">
      
      <BookOpen className="w-20 h-20 text-purple-500 mb-4 animate-bounce" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Aucun cours disponible pour le moment
      </h2>
      <p className="text-gray-500 max-w-md">
         Continuez à explorer, de nouveaux parcours d’apprentissage arrivent très bientôt !
      </p>
       <a
        href="/courses"
        className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition"
      >
        Explorer les formations
      </a>
    </div>
  );



  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-10">
   
 <h1 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
  Mes Cours
</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
           <div className="relative h-32 w-full overflow-hidden rounded-t-xl">
  <img
    src={course.courseimage || PLACEHOLDER_IMAGE}
    alt={course.fullname}
    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
  />
</div>


            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 force-two-lines">
                {course.fullname}
              </h3>
             

              {/* Modern Actions */}
              <div className="mt-4 flex justify-between gap-1">
                <button
                  onClick={() =>
                  handleResumeCourse(course.id)
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition font-medium text-sm"
                >
                  <Play className="w-4 h-4" />
                 
                </button>

                <button
                  onClick={() => setConfirmationId(course.id)}
                  disabled={unsubscribingId === course.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {unsubscribingId === course.id ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <>
                      <UserMinus className="w-4 h-4" />
                     
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleShare(course)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium text-sm"
                >
                  <Share2 className="w-4 h-4" />
               
                </button>
              </div>
            </div>

            {/* Confirmation Modal */}
            {confirmationId === course.id && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
                  <h4 className="text-xl font-semibold mb-4">
                    Confirmation de désinscription
                  </h4>
                  <p className="mb-6">
                    Êtes-vous sûr de vouloir vous désinscrire du cours{' '}
                    <strong>{course.fullname}</strong> ?
                  </p>
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => setConfirmationId(null)}
                      className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleUnsubscribe(course.id)}
                      className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
