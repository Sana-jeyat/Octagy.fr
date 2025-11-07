// 'use client';

// import React, { useEffect, useState } from 'react';
// import axiosInstance from '@/context/axiosInstance';
// import { useRouter } from 'next/navigation';
// import {
//   Building2,
//   Calendar,
//   CheckCircle,
//   Loader2,
//   Users,
//   Sparkles,
//   Zap,
// } from 'lucide-react';
// import dayjs from 'dayjs';
// import 'dayjs/locale/fr';
// import { motion } from 'framer-motion';

// interface Subscription {
//   id: number;
//   isActive: boolean;
//   startDate: string;
//   endDate: string;
//   plan: {
//     id: number;
//     name: string;
//     price: number;
//     duration: string;
//     employees: string;
//     features: string[];
//   };
//   company?: {
//     id: number;
//     name: string;
//   };
// }

// interface AbonnementsComponentProps {
//   abonnements?: Subscription[]; // ✅ tableau optionnel
// }

// export default function AbonnementsComponent({ abonnements }: AbonnementsComponentProps) {
//   const [subs, setSubs] = useState<Subscription[]>(abonnements ?? []);
//   const [loading, setLoading] = useState(!abonnements);
//   const router = useRouter();

//   // Fetch auto si aucune prop
//   useEffect(() => {
//     if (abonnements) return;
//     const fetchAbonnement = async () => {
//       try {
//         const res = await axiosInstance.get('/subscription/me');
//         // Même si l'API renvoie un seul objet, on le stocke dans un tableau pour uniformiser
//         setSubs(Array.isArray(res.data) ? res.data : [res.data]);
//       } catch (err) {
//         console.error('Erreur lors de la récupération de l’abonnement', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbonnement();
//   }, [abonnements]);

//   // Loader
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64 text-gray-500">
//         <Loader2 className="animate-spin mr-2" />
//         Chargement de votre abonnement...
//       </div>
//     );
//   }

//   // Aucun abonnement
//   if (!subs.length) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center p-10 bg-white/80 backdrop-blur-md shadow-lg rounded-3xl border border-gray-100"
//       >
//         <Sparkles className="mx-auto text-indigo-500 mb-4 w-10 h-10" />
//         <p className="text-gray-600 mb-4">
//           Vous n’avez aucun abonnement actif pour le moment.
//         </p>
//         <button
//           onClick={() => router.push('/entreprise')}
//           className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-90 text-white px-8 py-3 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
//         >
//           Choisir un abonnement
//         </button>
//       </motion.div>
//     );
//   }

//   // Liste des abonnements
//   return (
//     <div className="max-w-5xl mx-auto py-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8">
//       {subs.map((abonnement, index) => {
//         const { plan, company, startDate, endDate, isActive } = abonnement;

//         return (
//           <motion.div
//             key={abonnement.id}
//             initial={{ opacity: 0, y: 20, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ delay: index * 0.1, duration: 0.4 }}
//             className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden"
//           >
//             {/* Header */}
//             <div className="relative flex justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-8 py-6">
//               <div className="flex items-center gap-3">
//                 <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
//                 <h2 className="text-2xl font-bold tracking-wide">{plan.name}</h2>
//               </div>
//               <span
//                 className={`px-4 py-1 text-sm font-medium rounded-full ${
//                   isActive
//                     ? 'bg-green-400/30 text-green-100 border border-green-300/40'
//                     : 'bg-gray-400/40 text-gray-100 border border-gray-300/30'
//                 }`}
//               >
//                 {isActive ? 'Actif' : 'Inactif'}
//               </span>
//             </div>

//             {/* Body */}
//             <div className="p-8 space-y-6">
//               <div className="flex items-center gap-3">
//                 <Building2 className="text-indigo-500 w-5 h-5" />
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">
//                   Société : {company?.name || 'Non spécifiée'}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Users className="text-indigo-500 w-5 h-5" />
//                 <span className="text-gray-700 dark:text-gray-200 font-medium">
//                   Employés inclus : {plan.employees}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Calendar className="text-indigo-500 w-5 h-5" />
//                 <div className="text-gray-600 dark:text-gray-300">
//                   <div>
//                     Début : {dayjs(startDate).locale('fr').format('DD MMM YYYY')}
//                   </div>
//                   <div>
//                     Fin : {dayjs(endDate).locale('fr').format('DD MMM YYYY')}
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-gray-200/40 dark:border-gray-700/40">
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
//                   Fonctionnalités incluses :
//                 </h3>
//                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {plan.features.map((feature, i) => (
//                     <motion.li
//                       key={i}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50/60 dark:bg-gray-800/40 rounded-xl px-3 py-2 border border-gray-100/20"
//                     >
//                       <CheckCircle className="text-green-500 w-4 h-4" />
//                       {feature}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex justify-between items-center pt-6 border-t border-gray-200/40 dark:border-gray-700/40">
//                 <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
//                   {plan.price > 0
//                     ? `${plan.price}€ / ${plan.duration} mois`
//                     : 'Gratuit'}
//                 </span>
               
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/context/axiosInstance';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Calendar,
  CheckCircle,
  Loader2,
  Users,
  Sparkles,
  Zap,
} from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { motion } from 'framer-motion';

interface Subscription {
  id: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  plan: {
    id: number;
    name: string;
    price: number;
    duration: string;
    employees: string;
    features: string[];
  };
  company?: {
    id: number;
    name: string;
  };
}

interface AbonnementsComponentProps {
  abonnements?: Subscription[];
}

export default function AbonnementsComponent({ abonnements }: AbonnementsComponentProps) {
  const [subs, setSubs] = useState<Subscription[]>(abonnements ?? []);
  const [loading, setLoading] = useState(!abonnements);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const router = useRouter();

  useEffect(() => {
    if (abonnements) return;
    const fetchAbonnement = async () => {
      try {
        const res = await axiosInstance.get('/subscription/me');
        setSubs(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error('Erreur lors de la récupération de l’abonnement', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbonnement();
  }, [abonnements]);

  const handleReactivate = async (subId: number) => {
    try {
      await axiosInstance.post(`/subscription/${subId}/reactivate`);
      setSubs((prev) =>
        prev.map((s) =>
          s.id === subId ? { ...s, isActive: true } : s
        )
      );
    } catch (err) {
      console.error('Erreur lors de la réactivation', err);
    }
  };

  const filteredSubs = subs.filter((s) => {
    if (filter === 'active') return s.isActive;
    if (filter === 'inactive') return !s.isActive;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" />
        Chargement de vos abonnements...
      </div>
    );
  }

  if (!filteredSubs.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-10 bg-white/80 backdrop-blur-md shadow-lg rounded-3xl border border-gray-100"
      >
        <Sparkles className="mx-auto text-indigo-500 mb-4 w-10 h-10" />
        <p className="text-gray-600 mb-4">Aucun abonnement trouvé.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* Filtre */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl border ${
            filter === 'all' ? 'bg-pink-400 text-white' : 'bg-white/70'
          }`}
          onClick={() => setFilter('all')}
        >
          Tous
        </button>
        <button
          className={`px-4 py-2 rounded-xl border ${
            filter === 'active' ? 'bg-purple-700 text-white' : 'bg-white/70'
          }`}
          onClick={() => setFilter('active')}
        >
          Actifs
        </button>
        <button
          className={`px-4 py-2 rounded-xl border ${
            filter === 'inactive' ? 'bg-gray-400 text-white' : 'bg-white/70'
          }`}
          onClick={() => setFilter('inactive')}
        >
          Inactifs
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSubs.map((abonnement, index) => {
          const { plan, company, startDate, endDate, isActive } = abonnement;

          return (
        <motion.div
  key={abonnement.id}
  initial={{ opacity: 0, y: 20, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: index * 0.1, duration: 0.4 }}
  className={`relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden ${
    !isActive ? 'filter blur-[1.25px] opacity-80' : ''
  }`}
>

              {/* Header */}
              <div className="relative flex justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-8 py-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
                  <h2 className="text-2xl font-bold tracking-wide">{plan.name}</h2>
                </div>
                <span
                  className={`px-4 py-1 text-sm font-medium rounded-full ${
                    isActive
                      ? 'bg-green-400/30 text-green-100 border border-green-300/40'
                      : 'bg-gray-400/40 text-gray-100 border border-gray-300/30'
                  }`}
                >
                  {isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Building2 className="text-indigo-500 w-5 h-5" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    Société : {company?.name || 'Non spécifiée'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="text-indigo-500 w-5 h-5" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    Employés inclus : {plan.employees}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-indigo-500 w-5 h-5" />
                  <div className="text-gray-600 dark:text-gray-300">
                    <div>
                      Début : {dayjs(startDate).locale('fr').format('DD MMM YYYY')}
                    </div>
                    <div>
                      Fin : {dayjs(endDate).locale('fr').format('DD MMM YYYY')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/40 dark:border-gray-700/40">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Fonctionnalités incluses :
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50/60 dark:bg-gray-800/40 rounded-xl px-3 py-2 border border-gray-100/20"
                      >
                        <CheckCircle className="text-green-500 w-4 h-4" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200/40 dark:border-gray-700/40">
                  <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                    {plan.price > 0 ? `${plan.price}€ / ${plan.duration} mois` : 'Gratuit'}
                  </span>
                  {/* {!isActive && (
                    <button
                      onClick={() => handleReactivate(abonnement.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                    >
                      Réactiver
                    </button>
                  )} */}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
