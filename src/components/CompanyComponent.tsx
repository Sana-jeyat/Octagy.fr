'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/context/axiosInstance';
import { Building, Edit, Loader2, Save, User, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Owner {
  id: number;
  gender?: 'M' | 'F' | '';
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Company {
  id: number;
  name: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  siretNumber?: string;
  owner?: Owner;
}

const CompanyComponent = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [companyForm, setCompanyForm] = useState<Partial<Company>>({});
  const [ownerForm, setOwnerForm] = useState<Partial<Owner>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🟣 Charger les entreprises avec leur propriétaire
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axiosInstance.get('/my-companies');
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des entreprises.');
      }
    };
    fetchCompanies();
  }, []);

  // ✏️ Gestion des changements
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOwnerForm((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Sauvegarde entreprise
  const handleSaveCompany = async () => {
    if (!company) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: companyForm.name,
        description: companyForm.description,
        address: companyForm.address,
        email: companyForm.email,
        phone: companyForm.phone,
        siretNumber: companyForm.siretNumber,
      };
      const res = await axiosInstance.put(`/companies/${company.id}`, payload);
      setCompany(res.data);
    } catch {
      setError('Erreur lors de la mise à jour de la société.');
    } finally {
      setLoading(false);
    }
  };

  // 💾 Sauvegarde responsable
  const handleSaveOwner = async () => {
    if (!company) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        gender: ownerForm.gender,
        firstName: ownerForm.firstName,
        lastName: ownerForm.lastName,
        email: ownerForm.email,
        phoneNumber: ownerForm.phoneNumber,
      };
      await axiosInstance.put(`/companies/${company.id}/owner`, payload);
    } catch {
      setError('Erreur lors de la mise à jour du responsable.');
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  // 💾 Sauvegarde globale
  const handleSaveAll = async () => {
    await Promise.all([handleSaveCompany(), handleSaveOwner()]);
  };

  // 🧭 Chargement global
  if (loading && !editing) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
      </div>
    );
  }

  // ⚠️ Erreur
  if (error) {
    return (
      <div className="text-red-500 text-center bg-red-50 border border-red-200 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  // 🎨 Rendu principal
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-xl space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Building className="w-6 h-6 mr-2 text-purple-600" />
          Gestion des entreprises
        </h2>
        {!editing && company && (
          <button
            onClick={() => setEditing(true)}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" /> Modifier
          </button>
        )}
      </div>

      {/* Sélecteur d’entreprise */}
      <div className="relative">
        <label className="block font-medium mb-2 text-gray-700">
          Choisissez une entreprise :
        </label>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex justify-between items-center border border-gray-300 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 transition-all"
          >
            <span className="text-gray-800 font-medium">
              {selectedCompany
                ? companies.find((c) => c.id === selectedCompany)?.name
                : 'Sélectionnez une entreprise'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 text-purple-600 transform transition-transform ${
                showDropdown ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-xl overflow-hidden"
            >
              {companies.map((c) => (
                <li
                  key={c.id}
                  onClick={() => {
                    setSelectedCompany(c.id);
                    setCompany(c);
                    setCompanyForm(c);
                    if (c.owner) {
                      setOwnerForm({
                        id: c.owner.id,
                        gender: c.owner.gender || '',
                        firstName: c.owner.firstName || '',
                        lastName: c.owner.lastName || '',
                        email: c.owner.email || '',
                        phoneNumber: c.owner.phoneNumber || '',
                      });
                    } else {
                      setOwnerForm({});
                    }
                    setShowDropdown(false);
                  }}
                  className={`px-4 py-3 hover:bg-purple-50 cursor-pointer transition-colors ${
                    selectedCompany === c.id ? 'bg-purple-100 font-semibold' : ''
                  }`}
                >
                  <div className="text-gray-800">{c.name}</div>
                  {c.siretNumber && (
                    <div className="text-sm text-gray-500">SIRET : {c.siretNumber}</div>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      {!selectedCompany && (
        <div className="text-gray-500 text-center py-8">
          Sélectionnez une entreprise pour afficher ses informations.
        </div>
      )}

      {company && selectedCompany && (
        <>
          {/* Section Responsable */}
          <section className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-purple-800 flex items-center">
              <User className="w-5 h-5 mr-2" /> Responsable
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Civilité</label>
                <div className="flex space-x-6">
                  {['M', 'F'].map((gender) => (
                    <label key={gender} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={ownerForm.gender === gender}
                        onChange={handleOwnerChange}
                        disabled={!editing}
                        className="accent-purple-600"
                      />
                      <span className="ml-2">{gender === 'M' ? 'Monsieur' : 'Madame'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {[
                { label: 'Nom', name: 'lastName' },
                { label: 'Prénom', name: 'firstName' },
                { label: 'Email personnel', name: 'email', type: 'email', icon: Mail },
                { label: 'Téléphone mobile', name: 'phoneNumber', type: 'tel', icon: Phone },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <div className="flex items-center border rounded-lg p-2 bg-white">
                    {field.icon && <field.icon className="w-4 h-4 mr-2 text-gray-400" />}
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={(ownerForm as any)[field.name] || ''}
                      onChange={handleOwnerChange}
                      disabled={!editing}
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Société */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <Building className="w-5 h-5 mr-2 text-purple-500" />
              Informations de la société
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Nom de l'entreprise", name: 'name' },
                { label: 'Adresse', name: 'address', icon: MapPin },
                { label: 'Email', name: 'email', type: 'email', icon: Mail },
                { label: 'Téléphone', name: 'phone', icon: Phone },
                { label: 'Numéro de SIRET', name: 'siretNumber' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <div className="flex items-center border rounded-lg p-2 bg-white">
                    {field.icon && <field.icon className="w-4 h-4 mr-2 text-gray-400" />}
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={(companyForm as any)[field.name] || ''}
                      onChange={handleCompanyChange}
                      disabled={!editing}
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={companyForm.description || ''}
                  onChange={handleCompanyChange}
                  disabled={!editing}
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-400"
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* Boutons */}
          {editing && (
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setEditing(false);
                  setCompanyForm(company || {});
                  setOwnerForm(company?.owner || {});
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveAll}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white flex items-center hover:bg-purple-700 transition-colors"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Sauvegarder
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default CompanyComponent;
