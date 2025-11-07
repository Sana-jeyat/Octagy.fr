'use client';  // Assurez-vous d'utiliser 'use client' pour activer le rendu côté client

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Contenu de la page GoogleSuccess
function GoogleSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const email = searchParams.get('email');
  const firstName = searchParams.get('firstName');
  const profileImage = searchParams.get('profileImage');
  const role = searchParams.get('role') || 'user';
  const hasCompletedSurvey = searchParams.get('hasCompletedSurvey');
  const isTrainer = searchParams.get('isTrainer');

  useEffect(() => {
    if (token) {
      const cleanedRole = (role as string).replace('ROLE_', '').toLowerCase();

      // Sauvegarde dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: userId,
          email,
          firstName,
          profileImage,
          role: cleanedRole,
          hasCompletedSurvey: hasCompletedSurvey === 'true',
          isTrainer: isTrainer === 'true',
        })
      );

      // Rediriger vers /dashboard
      router.replace('/dashboard');
    }
  }, [router, token, userId, email, firstName, profileImage, role, hasCompletedSurvey, isTrainer]);

  return null; // Aucun rendu nécessaire ici
}

// Page GoogleSuccess
export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleSuccessContent />
    </Suspense>
  );
}
