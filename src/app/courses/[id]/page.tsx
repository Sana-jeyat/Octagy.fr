import CourseDetailClient from "./CourseDetailClient";

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetailClient id={params.id} />;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/courses`);
  if (!res.ok) return [];

  const data = await res.json();

  // data.data = tableau de cours
  return data.data.map((course: any) => ({
    id: course.id.toString(),
  }));
}
