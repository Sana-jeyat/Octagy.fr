


'use client' // mode client requis pour useState
import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, Play, FileText, HelpCircle, Star, Users, Clock, Globe } from 'lucide-react'
import { CourseEnrollmentCard } from '@/components/CourseEnrollmentCard'

interface Session {
  title: string;
  [key: string]: any;
}
interface Section {
  sectionTitle: string;
  sessions: Session[];
}



export default function CourseDetailClient({ id }: { id: string }) {
  const [course, setCourse] = useState<any>(null)
  const [toc, setToc] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState<Set<number>>(new Set())

 useEffect(() => {
    async function fetchData() {
      try {
        const [courseRes, tocRes] = await Promise.all([
          fetch(`https://auth.kno.academy/be/api/courses/${id}/full`, { cache: 'no-store' }),
          fetch(`https://auth.kno.academy/be/api/courses/${id}/table-of-contents`, { cache: 'no-store' }),
        ])
        if (!courseRes.ok || !tocRes.ok) throw new Error('Erreur API')

        setCourse(await courseRes.json())
        setToc(await tocRes.json())
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <p className="p-10">Chargement...</p>
  if (!course) return <p className="p-10">Cours introuvable</p>

  
function truncateTitle(title: string, maxLength = 70) {
  if (title.length <= maxLength) return title
  return title.slice(0, maxLength - 1) + '…'
}


function groupSessionsBySection(sessions: Session[]): Section[] {
  const sections: Section[] = [];
  let currentSection: Section = {
    sectionTitle: 'Général',
    sessions: []
  };

  if (!sessions || sessions.length === 0) {
    return [currentSection];
  }

  sessions.forEach(session => {
    if (/^SECTION\s*\d*:/i.test(session.title)) {
      if (currentSection.sessions.length > 0 || sections.length === 0) {
        sections.push(currentSection);
      }
      currentSection = {
        sectionTitle: session.title,
        sessions: []
      };
    } else {
      currentSection.sessions.push(session);
    }
  });

  if (currentSection.sessions.length > 0 || sections.length === 0) {
    sections.push(currentSection);
  }

  return sections;
}



  const groupedSections = groupSessionsBySection(toc)

  
  const totalSessions = groupedSections.reduce((acc, sec) => acc + sec.sessions.length, 0)
  const totalDuration = course.duration || '—'

  function toggleSection(index: number) {
    setOpenSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) newSet.delete(index)
      else newSet.add(index)
      return newSet
    })
  }

  function ResourceIcon({ type }: { type: string }) {
    switch (type) {
      case 'video': return <Play className="w-5 h-5 text-purple-600" />
      case 'slide': return <FileText className="w-5 h-5 text-green-600" />
      case 'quiz': return <HelpCircle className="w-5 h-5 text-yellow-600" />
      default: return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-purple-200 mb-4 text-sm">
            <a href="/courses" className="hover:text-white transition">Formations</a>
            <ChevronRight className="w-4 h-4" />
            <span>{course.category || 'Catégorie'}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-semibold">{course.fullname}</span>
          </nav>

          <h1 className="text-4xl font-extrabold mb-3">{course.fullname}</h1>
        <div
  className="text-lg text-purple-200 max-w-3xl"
  dangerouslySetInnerHTML={{ __html: course.summary }}
></div>


          <div className="flex flex-wrap items-center gap-5 mt-6 text-purple-200 text-sm font-medium">
            <span className="px-3 py-1 bg-purple-300 bg-opacity-30 rounded-full">{course.level || 'Débutant'}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{course.rating || '4.8'}</span>
              <span>({course.reviewCount || 120} avis)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students || 1500} étudiants</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
             
              <span className="font-semibold">
  {course.duration
    ? `${Math.floor(course.duration / 60)}h${course.duration % 60 ? ` ${course.duration % 60}min` : ''}`
    : '8h'}
</span>

            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{course.language || 'Français'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left: Contenu du cours */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Contenu du cours</h2>

          <p className="mb-6 text-gray-700 text-sm font-semibold">
            {totalSessions} sessions 
          </p>

          <div className="space-y-1">
            {groupedSections.map((section: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg">
       <button
  onClick={() => toggleSection(idx)}
  className="flex justify-between items-center w-full px-5 py-3 font-semibold text-gray-800 bg-gray-100 hover:bg-purple-50 rounded-t-lg focus:outline-none"
  aria-expanded={openSections.has(idx)}
  title={section.sectionTitle} // utile pour tooltip
>
  <span>
    {section.sectionTitle.length > 60 && !openSections.has(idx)
      ? truncateTitle(section.sectionTitle)
      : section.sectionTitle}
  </span>
  {openSections.has(idx) ? (
    <ChevronDown className="w-5 h-5 text-purple-600" />
  ) : (
    <ChevronRight className="w-5 h-5 text-purple-600" />
  )}
</button>





                {openSections.has(idx) && (
                  <ul className="divide-y divide-gray-200">
  {section.sessions.map((lesson: any) => {
    const isQuiz = lesson.resourceType === 'quiz'
    const isProject = lesson.resourceType === 'projet' 

    return (
      <li
        key={lesson.resourceId}
        className={`flex justify-between items-center px-6 py-3 cursor-pointer transition hover:bg-purple-50
          ${isQuiz ? 'bg-yellow-100 text-yellow-800 font-semibold' : ''}
          ${isProject ? 'bg-green-100 text-green-800 font-semibold' : ''}
        `}
        title={`${lesson.title} (${lesson.resourceType})`}
      >
        <div className="flex items-center space-x-4">
          <ResourceIcon type={lesson.resourceType} />
          <span>{lesson.title}</span>
        </div>
        <div className="text-sm text-gray-500 select-none">{lesson.order}</div>
      </li>
    )
  })}
</ul>


                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Carte d'inscription */}
        <div>
          <div className="sticky top-20 bg-white rounded-xl shadow p-6 space-y-6">
            <CourseEnrollmentCard
              courseId={course.id}
              moodleId={course.moodleId}
              imageUrl={course.imageUrl}
              fullname={course.fullname}
              fiatPrice={course.fiatPrice}
              knoPrice={course.knoPrice}
            />

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-700 font-semibold">
                <span>⚡</span>
                <span>Récompense Learn-to-Earn</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Vous recevrez des iKNO en validant <strong>tous les quiz</strong> du cours.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Durée totale</span>
              <span className="font-semibold">
  {course.duration
    ? `${Math.floor(course.duration / 60)}h${course.duration % 60 ? ` ${course.duration % 60}min` : ''}`
    : '8h'}
</span>

                
              </div>
              <div className="flex justify-between">
                <span>Leçons</span>
                <span className="font-semibold">{totalSessions}</span>
              </div>
              <div className="flex justify-between">
                <span>Niveau</span>
                <span className="font-semibold">{course.level || 'Débutant'}</span>
              </div>
              <div className="flex justify-between">
                <span>Certificat</span>
                <span className="font-semibold text-green-600">✓ Inclus</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

