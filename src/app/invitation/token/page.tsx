'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function InvitationPage() {
  const router = useRouter();
  const { token } = useParams() as { token: string };

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');

  
  useEffect(() => {
    if (!token) return;

    fetch(`https://auth.kno.academy/be/api/invitation/${token}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setValid(true);
          setEmail(data.email);
        } else {
          const error = await res.json();
          setValid(false);
          setMessage(error.message || 'Lien invalide ou expiré.');
        }
      })
      .catch(() => {
        setValid(false);
        setMessage('Erreur réseau.');
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const res = await fetch(`https://auth.kno.academy/be/api/invitation/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Mot de passe défini avec succès ! Redirection...');
      setTimeout(() => {
        router.push('auth//login'); 
      }, 3000);
    } else {
      setMessage(data.message || 'Une erreur est survenue.');
    }
  };

  if (valid === false) {
    return <div className="p-6 text-red-600">{message}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Créer un mot de passe pour {email}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Valider
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
