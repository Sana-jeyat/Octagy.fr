'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';

const StripeCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 px-4">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Paiement annulé</h1>
      <p className="text-gray-600 mb-6">
        Vous avez annulé le processus de paiement. Si c'était une erreur, vous pouvez réessayer à tout moment.
      </p>
      <Link
        href="/courses"
        className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
      >
        Retour aux cours
      </Link>
    </div>
  );
};

export default StripeCancelPage;
