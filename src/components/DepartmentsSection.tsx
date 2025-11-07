
'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/context/axiosInstance';
import { Building2, Plus, Users, X, Edit2, Trash2 } from 'lucide-react';

const DepartmentsSection = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Modal état
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [editingDept, setEditingDept] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<number | null>(null);


  // 🏢 Charger les entreprises
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      try {
        const res = await axiosInstance.get('/my-companies');
        setCompanies(res.data);
      } catch (err) {
        setError('Erreur lors du chargement des entreprises.');
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  // 👥 Charger les départements
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!selectedCompany) return;
      setLoadingDepartments(true);
      try {
        const res = await axiosInstance.get(`/companies/${selectedCompany}/departments`);
        setDepartments(res.data);
      } catch (err) {
        setError('Erreur lors du chargement des départements.');
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, [selectedCompany]);

  // ➕ Créer ou modifier un département
  const handleSaveDepartment = async () => {
    if (!newDeptName.trim() || !selectedCompany) return;

    try {
      if (editingDept) {
        // ✏️ Modification
        await axiosInstance.put(
          `/companies/${selectedCompany}/departments/${editingDept.id}`,
          { name: newDeptName }
        );
      } else {
        
        await axiosInstance.post(`/companies/${selectedCompany}/departments`, {
          name: newDeptName,
        });
      }

      // Rechargement
      const res = await axiosInstance.get(`/companies/${selectedCompany}/departments`);
      setDepartments(res.data);

      // Reset
      setNewDeptName('');
      setEditingDept(null);
      setIsModalOpen(false);
    } catch (err) {
      setError('Erreur lors de l’enregistrement du département.');
    }
  };

  //  Supprimer un département
const handleDeleteDepartment = async () => {
  if (!selectedCompany || !deptToDelete) return;

  try {
    await axiosInstance.delete(`/companies/${selectedCompany}/departments/${deptToDelete}`);
    setDepartments((prev) => prev.filter((d) => d.id !== deptToDelete));
    setShowDeleteModal(false);
    setDeptToDelete(null);
  } catch (err) {
    setError('Erreur lors de la suppression du département.');
  }
};


  //  Couleurs dynamiques
const getColorClasses = (name: string) => {
  const lower = name.toLowerCase();

  //  --- DÉPARTEMENTS DE PHARMACIE / SANTÉ ---
  if (
    lower.includes('pharma') ||
    lower.includes('pharmacie') ||
    lower.includes('santé') ||
    lower.includes('soin') ||
    lower.includes('médical') ||
    lower.includes('médicament')
  )
    return 'from-emerald-50 to-green-100 border-emerald-200';

  if (lower.includes('préparation') || lower.includes('laboratoire') || lower.includes('galénique'))
    return 'from-teal-50 to-cyan-100 border-teal-200';

  if (lower.includes('qualité') || lower.includes('contrôle') || lower.includes('analyse'))
    return 'from-lime-50 to-green-100 border-lime-200';

  if (lower.includes('stock') || lower.includes('approvisionnement') || lower.includes('logistique'))
    return 'from-green-50 to-emerald-100 border-green-200';

  if (lower.includes('vente') || lower.includes('client') || lower.includes('conseil'))
    return 'from-sky-50 to-blue-100 border-sky-200';

  if (lower.includes('ordonnance') || lower.includes('dispensation'))
    return 'from-cyan-50 to-emerald-100 border-cyan-200';

  // 💼 --- DÉPARTEMENTS GÉNÉRAUX ---
  if (lower.includes('compta') || lower.includes('finance') || lower.includes('comptabilité'))
    return 'from-amber-50 to-yellow-100 border-amber-200';

  if (lower.includes('rh') || lower.includes('humaine') || lower.includes('recrutement'))
    return 'from-pink-50 to-rose-100 border-pink-200';

  if (lower.includes('tech') || lower.includes('informatique') || lower.includes('it') || lower.includes('développement'))
    return 'from-blue-50 to-cyan-100 border-blue-200';

  if (lower.includes('marketing') || lower.includes('communication'))
    return 'from-purple-50 to-fuchsia-100 border-purple-200';

  if (lower.includes('commercial') || lower.includes('business'))
    return 'from-indigo-50 to-purple-100 border-indigo-200';

  if (lower.includes('juridique') || lower.includes('légal'))
    return 'from-slate-50 to-gray-100 border-slate-200';

  if (lower.includes('maintenance') || lower.includes('production') || lower.includes('atelier'))
    return 'from-orange-50 to-amber-100 border-orange-200';

  if (lower.includes('recherche') || lower.includes('développement'))
    return 'from-cyan-50 to-sky-100 border-cyan-200';

  if (lower.includes('direction') || lower.includes('management'))
    return 'from-gray-50 to-slate-100 border-gray-200';

  // 🎨 PAR DÉFAUT
  return 'from-gray-50 to-gray-100 border-gray-200';
};

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="text-purple-600 w-6 h-6" /> Départements
          </h3>

          <div className="flex items-center gap-4">
            <select
              value={selectedCompany || ''}
              onChange={(e) => setSelectedCompany(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:border-purple-400 focus:ring-2 focus:ring-purple-500 transition duration-200"
            >
              <option value="">— Sélectionner une entreprise —</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>

            {selectedCompany && (
              <button
                onClick={() => {
                  setEditingDept(null);
                  setNewDeptName('');
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                <Plus className="w-5 h-5" /> Ajouter
              </button>
            )}
          </div>
        </div>

        {/* DÉPARTEMENTS */}
        {!selectedCompany ? (
          <div className="text-gray-500 text-center py-6 italic">
            Veuillez sélectionner une entreprise pour voir ses départements.
          </div>
        ) : loadingDepartments ? (
          <div className="text-center text-gray-500 py-6">
            Chargement des départements...
          </div>
        ) : departments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-4">
              Aucun département trouvé pour cette entreprise.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={`relative bg-gradient-to-br ${getColorClasses(
                  dept.name
                )} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
              >
                <div className="absolute top-3 right-3 flex gap-2 z-20  group-hover:opacity-100 transition-opacity duration-300">
  <button
    onClick={() => {
      setEditingDept(dept);
      setNewDeptName(dept.name);
      setIsModalOpen(true);
    }}
    className="p-2 rounded-full  text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-md transition"
  >
    <Edit2 className="w-4 h-4" />
  </button>
 <button
  onClick={() => {
    setDeptToDelete(dept.id);
    setShowDeleteModal(true);
  }}
  className="p-2 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 shadow-md transition"
>
  <Trash2 className="w-4 h-4" />
</button>

</div>


                <h4 className="font-semibold text-gray-900 text-xl mb-4 border-b pb-2">
                  {dept.name}
                </h4>

                <div className="flex justify-between items-center text-gray-700">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Employés</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {dept.employeeCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL AJOUT / MODIF */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingDept(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              {editingDept ? 'Modifier le département' : 'Nouveau département'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nom du département
                </label>
                <input
                  type="text"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="Ex : Ressources Humaines"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveDepartment}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:scale-105 transition"
                >
                  {editingDept ? 'Mettre à jour' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Confirmer la suppression
      </h3>
      <p className="text-gray-600 mb-6">
        Êtes-vous sûr de vouloir supprimer ce département ? Cette action est irréversible.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setDeptToDelete(null);
          }}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Annuler
        </button>
        <button
          onClick={handleDeleteDepartment}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default DepartmentsSection;
