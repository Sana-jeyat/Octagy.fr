"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/context/axiosInstance";
import {
  UserPlus,
  Download,
  FileText,
  Loader2,
  UserMinus,
  Users,
  X,
} from "lucide-react";
import Papa from "papaparse";
import jsPDF from "jspdf";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  address?: string;
  birthDate?: string;
  nationality?: string;
  rpps?: string;

  socialSecurityNumber?: string;
}

interface Company {
  id: number;
  name: string;
}

const EmployeesComponent = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    address: "",
    birthDate: "",
    nationality: "",
    socialSecurityNumber: "",
    rpps: "",
  });

  // Charger les entreprises
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      try {
        const res = await axiosInstance.get("/my-companies");
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des entreprises.");
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  // Charger les départements
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!selectedCompany) return;
      try {
        const res = await axiosInstance.get(
          `/companies/${selectedCompany}/departments`
        );
        setDepartments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartments();
  }, [selectedCompany]);

  // Charger les employés
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!selectedCompany) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/companies/${selectedCompany}/employees`
        );
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des employés.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [selectedCompany]);

  // Ajouter un employé
  const handleAddEmployee = async () => {
    if (!selectedCompany) return;
    setLoading(true);
    try {
      await axiosInstance.post(
        `/companies/${selectedCompany}/employees`,
        formData
      );
      setShowModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        address: "",
        birthDate: "",
        nationality: "",
        socialSecurityNumber: "",
        rpps: "",
      });
      const res = await axiosInstance.get(
        `/companies/${selectedCompany}/employees`
      );
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'ajout de l'employé.");
    } finally {
      setLoading(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(employees);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employees.csv";
    link.click();
  };

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des employés", 10, 10);
    employees.forEach((e, i) => {
      doc.text(
        `${e.firstName} ${e.lastName} - ${e.position || "N/A"}`,
        10,
        20 + i * 10
      );
    });
    doc.save("employees.pdf");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-purple-600 w-6 h-6" /> Gestion des employés
          </h3>

          <div className="flex items-center gap-3">
            <select
              value={selectedCompany || ""}
              onChange={(e) => setSelectedCompany(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:border-purple-400 focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="">— Sélectionner une entreprise —</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {selectedCompany && (
              <>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-xl shadow hover:scale-105 transition"
                >
                  <UserPlus className="w-5 h-5" /> Inviter
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  <FileText className="w-4 h-4" /> Export PDF
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tableau des employés */}
        {selectedCompany && !loading && (
          <div className="overflow-x-auto">
            {employees.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="text-left py-3 px-4">Employé</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Poste</th>
                    <th className="text-left py-3 px-4">Département</th>
                    <th className="text-left py-3 px-4">Téléphone</th>
                    <th className="text-left py-3 px-4">Adresse</th>
                    <th className="text-left py-3 px-4">Date de naissance</th>
                    <th className="text-left py-3 px-4">Nationalité</th>
                    <th className="text-left py-3 px-4">Sécurité sociale</th>
                    <th className="text-left py-3 px-4">RPPS</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b hover:bg-purple-50/40 transition"
                    >
                      <td className="py-3 px-4 font-medium">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className="py-3 px-4">{emp.email}</td>
                      <td className="py-3 px-4">{emp.position || "-"}</td>
                      <td className="py-3 px-4">{emp.department || "-"}</td>
                      <td className="py-3 px-4">{emp.phone || "-"}</td>
                      <td className="py-3 px-4">{emp.address || "-"}</td>
                      <td className="py-3 px-4">
                        {emp.birthDate
                          ? new Date(emp.birthDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4">{emp.nationality || "-"}</td>
                      <td className="py-3 px-4">
                        {emp.socialSecurityNumber || "-"}
                      </td>
                      <td className="py-3 px-4">{emp.rpps || "-"}</td>
                      <td className="py-3 px-4">
                        <button className="p-1 text-red-500 hover:bg-red-100 rounded">
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-gray-500">
                Aucun employé ajouté pour cette entreprise.
              </div>
            )}

            {/* Pagination */}
            {employees.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition disabled:opacity-40"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-600" />
                </button>

                <span className="text-gray-700 font-medium">
                  Page <span className="text-purple-600">{currentPage}</span> /{" "}
                  {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition disabled:opacity-40"
                >
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL INVITER EMPLOYÉ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <UserPlus className="text-purple-600" /> Inviter un employé
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="Prénom"
                className="border p-2 rounded-lg"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Nom"
                className="border p-2 rounded-lg"
              />
              <input
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="border p-2 rounded-lg"
              />
              <input
                name="phoneNumber"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Téléphone"
                className="border p-2 rounded-lg"
              />
              <input
                name="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                placeholder="Poste"
                className="border p-2 rounded-lg"
              />
              <select
                name="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="border p-2 rounded-lg"
              >
                <option value="">Département</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <input
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Adresse"
                className="border p-2 rounded-lg col-span-2"
              />

              <input
                type="date"
                name="birthdate"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="border p-2 rounded-lg"
              />

              <select
                name="nationality"
                value={formData.nationality}
                onChange={(e) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
                className="border p-2 rounded-lg"
                style={{
                  maxHeight: "80px",
                }}
              >
                <option value="">Nationalité</option>
                <option value="Afghane">Afghane</option>
                <option value="Albanaise">Albanaise</option>
                <option value="Algérienne">Algérienne</option>
                <option value="Allemande">Allemande</option>
                <option value="Américaine">Américaine</option>
                <option value="Andorrane">Andorrane</option>
                <option value="Angolaise">Angolaise</option>
                <option value="Antiguaise et Barbudienne">
                  Antiguaise et Barbudienne
                </option>
                <option value="Argentine">Argentine</option>
                <option value="Arménienne">Arménienne</option>
                <option value="Australienne">Australienne</option>
                <option value="Autrichienne">Autrichienne</option>
                <option value="Azerbaïdjanaise">Azerbaïdjanaise</option>
                <option value="Bahaméenne">Bahaméenne</option>
                <option value="Bahreïnienne">Bahreïnienne</option>
                <option value="Bangladaise">Bangladaise</option>
                <option value="Barbadienne">Barbadienne</option>
                <option value="Belge">Belge</option>
                <option value="Bélizienne">Bélizienne</option>
                <option value="Béninoise">Béninoise</option>
                <option value="Bhoutanaise">Bhoutanaise</option>
                <option value="Biélorusse">Biélorusse</option>
                <option value="Birmane">Birmane</option>
                <option value="Bolivienne">Bolivienne</option>
                <option value="Bosnienne">Bosnienne</option>
                <option value="Botswanaise">Botswanaise</option>
                <option value="Brésilienne">Brésilienne</option>
                <option value="Britannique">Britannique</option>
                <option value="Brunéienne">Brunéienne</option>
                <option value="Bulgare">Bulgare</option>
                <option value="Burkinabé">Burkinabé</option>
                <option value="Burundaise">Burundaise</option>
                <option value="Cambodgienne">Cambodgienne</option>
                <option value="Camerounaise">Camerounaise</option>
                <option value="Canadienne">Canadienne</option>
                <option value="Cap-verdienne">Cap-verdienne</option>
                <option value="Centrafricaine">Centrafricaine</option>
                <option value="Chilienne">Chilienne</option>
                <option value="Chinoise">Chinoise</option>
                <option value="Chypriote">Chypriote</option>
                <option value="Colombienne">Colombienne</option>
                <option value="Comorienne">Comorienne</option>
                <option value="Congolaise (RDC)">Congolaise (RDC)</option>
                <option value="Congolaise (RC)">Congolaise (RC)</option>
                <option value="Coréenne">Coréenne</option>
                <option value="Costaricienne">Costaricienne</option>
                <option value="Croate">Croate</option>
                <option value="Cubaine">Cubaine</option>
                <option value="Danoise">Danoise</option>
                <option value="Djiboutienne">Djiboutienne</option>
                <option value="Dominicaine">Dominicaine</option>
                <option value="Égyptienne">Égyptienne</option>
                <option value="Émiratie">Émiratie</option>
                <option value="Équatorienne">Équatorienne</option>
                <option value="Érythréenne">Érythréenne</option>
                <option value="Espagnole">Espagnole</option>
                <option value="Estonienne">Estonienne</option>
                <option value="Éthiopienne">Éthiopienne</option>
                <option value="Finlandaise">Finlandaise</option>
                <option value="Française">Française</option>
                <option value="Gabonaise">Gabonaise</option>
                <option value="Gambienne">Gambienne</option>
                <option value="Géorgienne">Géorgienne</option>
                <option value="Ghanéenne">Ghanéenne</option>
                <option value="Grecque">Grecque</option>
                <option value="Grenadienne">Grenadienne</option>
                <option value="Guatémaltèque">Guatémaltèque</option>
                <option value="Guinéenne">Guinéenne</option>
                <option value="Guinéenne (Bissau)">Guinéenne (Bissau)</option>
                <option value="Guyanienne">Guyanienne</option>
                <option value="Haïtienne">Haïtienne</option>
                <option value="Hondurienne">Hondurienne</option>
                <option value="Hongroise">Hongroise</option>
                <option value="Indienne">Indienne</option>
                <option value="Indonésienne">Indonésienne</option>
                <option value="Irakienne">Irakienne</option>
                <option value="Iranienne">Iranienne</option>
                <option value="Irlandaise">Irlandaise</option>
                <option value="Islandaise">Islandaise</option>
                <option value="Israélienne">Israélienne</option>
                <option value="Italienne">Italienne</option>
                <option value="Ivoirienne">Ivoirienne</option>
                <option value="Jamaïcaine">Jamaïcaine</option>
                <option value="Japonaise">Japonaise</option>
                <option value="Jordanienne">Jordanienne</option>
                <option value="Kazakhstanaise">Kazakhstanaise</option>
                <option value="Kényane">Kényane</option>
                <option value="Kirghize">Kirghize</option>
                <option value="Kittitienne">Kittitienne</option>
                <option value="Koweïtienne">Koweïtienne</option>
                <option value="Laotienne">Laotienne</option>
                <option value="Libanaise">Libanaise</option>
                <option value="Libérienne">Libérienne</option>
                <option value="Libyenne">Libyenne</option>
                <option value="Liechtensteinoise">Liechtensteinoise</option>
                <option value="Lituanienne">Lituanienne</option>
                <option value="Luxembourgeoise">Luxembourgeoise</option>
                <option value="Macédonienne">Macédonienne</option>
                <option value="Malaisienne">Malaisienne</option>
                <option value="Malawite">Malawite</option>
                <option value="Maldivienne">Maldivienne</option>
                <option value="Malgache">Malgache</option>
                <option value="Malienne">Malienne</option>
                <option value="Maltaise">Maltaise</option>
                <option value="Marocaine">Marocaine</option>
                <option value="Mauricienne">Mauricienne</option>
                <option value="Mauritanienne">Mauritanienne</option>
                <option value="Mexicaine">Mexicaine</option>
                <option value="Monégasque">Monégasque</option>
                <option value="Mongole">Mongole</option>
                <option value="Monténégrine">Monténégrine</option>
                <option value="Mozambicaine">Mozambicaine</option>
                <option value="Namibienne">Namibienne</option>
                <option value="Néo-Zélandaise">Néo-Zélandaise</option>
                <option value="Népalaise">Népalaise</option>
                <option value="Nigériane">Nigériane</option>
                <option value="Nigérienne">Nigérienne</option>
                <option value="Norvégienne">Norvégienne</option>
                <option value="Omanaise">Omanaise</option>
                <option value="Pakistanaise">Pakistanaise</option>
                <option value="Palestinienne">Palestinienne</option>
                <option value="Panaméenne">Panaméenne</option>
                <option value="Paraguayenne">Paraguayenne</option>
                <option value="Péruvienne">Péruvienne</option>
                <option value="Philippine">Philippine</option>
                <option value="Polonaise">Polonaise</option>
                <option value="Portugaise">Portugaise</option>
                <option value="Qatarienne">Qatarienne</option>
                <option value="Roumaine">Roumaine</option>
                <option value="Russe">Russe</option>
                <option value="Rwandaise">Rwandaise</option>
                <option value="Saoudienne">Saoudienne</option>
                <option value="Sénégalaise">Sénégalaise</option>
                <option value="Serbe">Serbe</option>
                <option value="Sierra-léonaise">Sierra-léonaise</option>
                <option value="Singapourienne">Singapourienne</option>
                <option value="Slovaque">Slovaque</option>
                <option value="Slovène">Slovène</option>
                <option value="Somalienne">Somalienne</option>
                <option value="Soudanaise">Soudanaise</option>
                <option value="Sri-lankaise">Sri-lankaise</option>
                <option value="Sud-africaine">Sud-africaine</option>
                <option value="Sud-coréenne">Sud-coréenne</option>
                <option value="Suédoise">Suédoise</option>
                <option value="Suisse">Suisse</option>
                <option value="Syrienne">Syrienne</option>
                <option value="Tadjike">Tadjike</option>
                <option value="Tanzanienne">Tanzanienne</option>
                <option value="Tchadienne">Tchadienne</option>
                <option value="Tchèque">Tchèque</option>
                <option value="Thaïlandaise">Thaïlandaise</option>
                <option value="Togolaise">Togolaise</option>
                <option value="Tongienne">Tongienne</option>
                <option value="Trinidadienne">Trinidadienne</option>
                <option value="Tunisienne">Tunisienne</option>
                <option value="Turkmène">Turkmène</option>
                <option value="Turque">Turque</option>
                <option value="Ukrainienne">Ukrainienne</option>
                <option value="Uruguayenne">Uruguayenne</option>
                <option value="Vénézuélienne">Vénézuélienne</option>
                <option value="Vietnamienne">Vietnamienne</option>
                <option value="Yéménite">Yéménite</option>
                <option value="Zambienne">Zambienne</option>
                <option value="Zimbabwéenne">Zimbabwéenne</option>
                <option value="Autre">Autre</option>
              </select>

              <input
                name="socialSecurityNumber"
                value={formData.socialSecurityNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialSecurityNumber: e.target.value,
                  })
                }
                placeholder="N° Sécurité sociale"
                className="border p-2 rounded-lg"
              />

              <input
                name="rpps"
                value={formData.rpps}
                onChange={(e) =>
                  setFormData({ ...formData, rpps: e.target.value })
                }
                placeholder="Numéro RPPS"
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:scale-105 transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesComponent;
