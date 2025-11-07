"use client";
import { createPortal } from "react-dom";
import { Building, Users, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";



interface OwnerData {
  gender: string; 
  firstName: string;
  lastName: string;
  personalEmail: string;
  mobilePhone: string;
}


interface CompanyModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
  companyName: string;
  setCompanyName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  siretNumber: string;
  setSiretNumber: (v: string) => void;
  ownerData: OwnerData;
  handleOwnerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
  show,
  onClose,
  onSubmit,
  loading,
  companyName,
  setCompanyName,
  description,
  setDescription,
  address,
  setAddress,
  email,
  setEmail,
  phone,
  setPhone,
  siretNumber,
  setSiretNumber,
  ownerData,
  handleOwnerChange,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !show) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300"
      style={{ WebkitBackdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl w-[95%] max-w-3xl p-8 animate-[fadeIn_0.3s_ease] relative"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()} // ✅ évite de fermer si on clique dans le modal
      >
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Créer votre entreprise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SECTION ENTREPRISE */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 flex items-center gap-2">
              <Building className="w-5 h-5" /> Informations de l’entreprise
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom de l'entreprise"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email de contact"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                placeholder="Numéro SIRET"
                value={siretNumber}
                onChange={(e) => setSiretNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Description de l’entreprise"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* SECTION RESPONSABLE */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 flex items-center gap-2">
              <Users className="w-5 h-5" /> Responsable de l’entreprise
            </h3>
            <div className="space-y-3">
           <div className="flex gap-6">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="gender"
      value="M"
      checked={ownerData.gender === "M"}
      onChange={handleOwnerChange}
      className="text-purple-500 focus:ring-purple-400"
    />
    <span>Monsieur</span>
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="gender"
      value="F"
      checked={ownerData.gender === "F"}
      onChange={handleOwnerChange}
      className="text-purple-500 focus:ring-purple-400"
    />
    <span>Madame</span>
  </label>

 
</div>

              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={ownerData.lastName}
                onChange={handleOwnerChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={ownerData.firstName}
                onChange={handleOwnerChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="email"
                name="personalEmail"
                placeholder="Email personnel"
                value={ownerData.personalEmail}
                onChange={handleOwnerChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="tel"
                name="mobilePhone"
                placeholder="Téléphone"
                value={ownerData.mobilePhone}
                onChange={handleOwnerChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
          >
            Annuler
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-xl font-semibold shadow-md transition-all flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Chargement...
              </>
            ) : (
              "Créer l'entreprise"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CompanyModal;
