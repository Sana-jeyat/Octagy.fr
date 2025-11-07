import CourseDetailClient from './CourseDetailClient'

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailClient id={params.id} />
}

export async function generateStaticParams() {
  const res = await fetch('https://auth.kno.academy/be/api/courses/local', { cache: 'no-store' })
  if (!res.ok) return []
  const courses = await res.json()

  return courses.map((course: any) => ({
    id: course.id.toString(),
  }))
}
