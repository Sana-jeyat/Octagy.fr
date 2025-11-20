import { useState, useEffect } from "react";
import { Course, NewCourseData, courseService } from "@/services/courseService";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.fetchCourses();
      setCourses(data);
    } catch (err) {
      setError("Erreur lors du chargement des cours");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (data: NewCourseData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newCourse = await courseService.createCourse(data);
      setCourses((prev) => [...prev, newCourse]);
      return true;
    } catch (err) {
      setError("Erreur lors de l'ajout du cours");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (
    id: number,
    data: NewCourseData
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await courseService.updateCourse(id, data); // Appel API pour mettre à jour
      await fetchCourses(); // Recharge toute la liste depuis le backend
      return true;
    } catch (err) {
      setError("Erreur lors de la modification du cours");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await courseService.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      setError("Erreur lors de la suppression du cours");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses,
  };
};
