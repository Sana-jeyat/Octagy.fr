import { Edit, Trash2, GraduationCap, Clock } from "lucide-react";
import { Course } from "@/services/courseService";

interface CoursesListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  isAdmin?: boolean;
}

const baseUrl = "http://localhost:8000";

export default function CoursesList({
  courses,
  onEdit,
  onDelete,
  isAdmin = false,
}: CoursesListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">
          Aucun cours disponible
        </h3>
        <p className="text-gray-500">Les cours seront bientôt ajoutés.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses
        .filter((course) => course.isActive)
        .map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`${baseUrl}/${course.imageUrl}` || "/default-course.png"}
              alt={course.fullname}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {course.fullname}
                </h3>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(course)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(course.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.summary}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {course.category}
                </span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    course.level === "débutant"
                      ? "bg-green-100 text-green-800"
                      : course.level === "intermédiaire"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.level}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">
                    {course.fiatPrice} €
                  </div>
                  {course.subscriberPrice > 0 && (
                    <div className="text-xs text-green-600">
                      Abonnés: {course.subscriberPrice}€
                    </div>
                  )}
                  {course.financierPrice > 0 && (
                    <div className="text-xs text-blue-600">
                      Financeurs: {course.financierPrice}€
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {course.modality}
                </span>
                {course.location && (
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    📍 {course.location}
                  </span>
                )}
              </div>

              {course.targetAudience && course.targetAudience.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Public :</strong> {course.targetAudience.join(", ")}
                  </p>
                </div>
              )}

              {course.certifications && course.certifications.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-green-600 mb-1">
                    <strong>Certifications :</strong>{" "}
                    {course.certifications.join(", ")}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>
                  Créé le{" "}
                  {new Date(course.createdAt).toLocaleDateString("fr-FR")}
                </span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    course.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.isActive ? "Actif" : "Inactif"}
                </span>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold">
                S'inscrire
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
