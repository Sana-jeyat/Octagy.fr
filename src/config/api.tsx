// Configuration des endpoints API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  // Users
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
    UPLOAD_AVATAR: `${API_BASE_URL}/users/upload-avatar`,
  },
  // Courses (à venir)
  COURSES: {
    LIST: `${API_BASE_URL}/courses`,
    DETAIL: (id: string) => `${API_BASE_URL}/courses/${id}`,
    ENROLL: (id: string) => `${API_BASE_URL}/courses/${id}/enroll`,
  },
};

// Headers communs pour les requêtes API
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper pour les requêtes API
export const apiClient = {
  async get(url: string) {
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  async post(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async put(url: string, data: any) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(url: string) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};