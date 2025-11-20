import axiosInstance from "@/context/axiosInstance";

export interface NewCourseData {
  fullname: string;
  summary: string;
  category: string;
  duration: string;
  level: "débutant" | "intermédiaire" | "avancé";
  fiatPrice: number;
  subscriberPrice: number;
  financierPrice: number;
  imageUrl?: string; // Base64 ou URL
  location?: string;
  modality?: "presentiel" | "elearning" | "virtuel" | "mixte" | "webinaire";
  targetAudience?: string[];
  certifications?: string[];
}

export interface Course extends NewCourseData {
  id: number;
  createdAt: string;
  createdBy: number;
  isActive: boolean;
}

export const courseService = {
  fetchCourses: async (): Promise<Course[]> => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/courses`
    );
    if (res.data.status === "success") return res.data.data || [];
    return [];
  },

  createCourse: async (data: NewCourseData): Promise<Course> => {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/courses`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    if (res.data.status === "success") return res.data.course;
    throw new Error(res.data.message || "Erreur lors de la création du cours");
  },

  getCourseById: async (id: number): Promise<Course> => {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/courses/${id}`
    );

    if (response.data.status === "success") {
      return response.data.course;
    }

    throw new Error("Cours introuvable");
  },
  updateCourse: async (id: number, data: NewCourseData): Promise<Course> => {
    const res = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/courses/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    if (res.data.status === "success") return res.data.course;
    throw new Error(
      res.data.message || "Erreur lors de la modification du cours"
    );
  },

  deleteCourse: async (id: number): Promise<void> => {
    const res = await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/courses/${id}`
    );
    if (res.data.status !== "success")
      throw new Error(res.data.message || "Erreur lors de la suppression");
  },
};
