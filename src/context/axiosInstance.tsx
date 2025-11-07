import axios from 'axios';

//  Création d'une instance axios configurée pour les cookies sécurisés
const axiosInstance = axios.create({
  baseURL: 'https://auth.kno.academy/be/api',
  withCredentials: true, // indispensable pour envoyer automatiquement les cookies
});

//  Intercepteur de réponse : si le token est expiré, on tente un refresh automatique
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Si la session a expiré (401) et qu'on n'a pas encore essayé de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Appel au backend pour rafraîchir le cookie (HttpOnly)
        await axios.post('https://auth.kno.academy/be/api/refresh', {}, { withCredentials: true });

        // 🔁 On retente la requête initiale après refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Session expirée ou refresh échoué', refreshError);
        // On laisse remonter l’erreur : le frontend gèrera la déconnexion
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
