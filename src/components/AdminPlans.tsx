// components/AdminPlans.tsx
"use client";

import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "@/context/axiosInstance";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import {
  Building,
  Edit3,
  Trash2,
  Plus,
  Search,
  X,
  CheckCircle,
  Users,
  Crown,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";

interface PriceTier {
  minEmployees: number;
  maxEmployees: number | null;
  price: number;
  label: string;
  duration?: string;
  employees?: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  duration: string;
  employees: string;
  features: string[];
  popular?: boolean;
  color?: string;
  period?: string;
  hasVariablePricing?: boolean;
  priceTiers?: PriceTier[];
  createdAt?: string;
  updatedAt?: string;
  // Ajoutez cette propriété si elle existe dans votre API
  tiers?: any[];
}

const AdminPlans = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user && !user.roles?.includes("ROLE_ADMIN")) {
      router.push("/dashboard");
      return;
    }
  }, [user, router]);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    employees: "",
    features: [] as string[],
    newFeature: "",
    popular: false,
    color: "from-blue-500 to-blue-400",
    period: "month",
    hasVariablePricing: false,
    priceTiers: [] as PriceTier[],
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);

  // Fetch plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/plans");
      console.log("📋 Plans reçus:", res.data);
      setPlans(res.data);
    } catch (err) {
      console.error("Erreur Plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter by search
  const filteredPlans = plans.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (showModal) {
      console.log("📝 Données du formulaire:", {
        editingPlan: editingPlan,
        formData: formData,
        hasVariablePricing: formData.hasVariablePricing,
        priceTiersCount: formData.priceTiers.length,
      });
    }
  }, [showModal, formData, editingPlan]);

  // Open modal create/edit - CORRIGÉ
  const openModal = (plan: any = null) => {
    console.log("📝 Ouverture modal pour:", plan);

    if (plan) {
      setEditingPlan(plan);

      // CORRECTION: Extraire les données du premier tier
      const firstTier =
        plan.tiers && plan.tiers.length > 0 ? plan.tiers[0] : {};

      console.log("🔍 Premier tier:", firstTier);

      // Déterminer si c'est un prix variable
      const isVariablePricing =
        firstTier.priceTiers && firstTier.priceTiers.length > 0;

      const formDataToSet = {
        name: plan.name || "",
        price: isVariablePricing ? "" : firstTier.price?.toString() || "",
        duration: firstTier.duration || "",
        employees: firstTier.employees || "",
        features: firstTier.features || [],
        newFeature: "",
        popular: plan.popular || false,
        color: plan.color || "from-blue-500 to-blue-400",
        period: plan.period || "month",
        hasVariablePricing: isVariablePricing,
        priceTiers:
          firstTier.priceTiers?.map((tier: any) => ({
            minEmployees: tier.minEmployees || 0,
            maxEmployees: tier.maxEmployees,
            price: tier.price || 0,
            duration: tier.duration || firstTier.duration || "",
            employees: tier.employees || firstTier.employees || "",
            label: tier.label || "",
          })) || [],
      };

      console.log("📋 Données préparées pour formulaire:", formDataToSet);
      setFormData(formDataToSet);
    } else {
      // Reset pour création
      setEditingPlan(null);
      setFormData({
        name: "",
        price: "",
        duration: "",
        employees: "",
        features: [],
        newFeature: "",
        popular: false,
        color: "from-blue-500 to-blue-400",
        period: "month",
        hasVariablePricing: false,
        priceTiers: [],
      });
    }
    setShowModal(true);
  };

  // Add feature
  const addFeature = () => {
    const val = formData.newFeature.trim();
    if (val && !formData.features.includes(val)) {
      setFormData({
        ...formData,
        features: [...formData.features, val],
        newFeature: "",
      });
    }
  };

  // Remove feature
  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
  };

  // Gestion des price tiers - CORRIGÉ
  const updatePriceTier = (
    index: number,
    field: keyof PriceTier,
    value: any
  ) => {
    const updatedTiers = [...formData.priceTiers];

    let processedValue = value;

    // Conversion en number pour les champs numériques
    if (field === "minEmployees" || field === "price") {
      processedValue = value === "" ? 0 : Number(value);
      if (isNaN(processedValue)) processedValue = 0;
    } else if (field === "maxEmployees") {
      processedValue = value === "" || value === "0" ? null : Number(value);
      if (processedValue !== null && isNaN(processedValue))
        processedValue = null;
    }

    // Mise à jour du tier
    updatedTiers[index] = {
      ...updatedTiers[index],
      [field]: processedValue,
    };

    // Auto-génération du label
    if (field === "minEmployees" || field === "maxEmployees") {
      const tier = updatedTiers[index];
      let label = "";

      if (tier.maxEmployees === null) {
        label = `Plus de ${tier.minEmployees} salariés`;
      } else if (tier.minEmployees === tier.maxEmployees) {
        label = `${tier.minEmployees} salarié${
          tier.minEmployees > 1 ? "s" : ""
        }`;
      } else {
        label = `${tier.minEmployees}-${tier.maxEmployees} salariés`;
      }

      updatedTiers[index].label = label;
    }

    setFormData({ ...formData, priceTiers: updatedTiers });
  };

  // SEULE fonction addPriceTier - CORRIGÉE
  const addPriceTier = () => {
    const lastTier = formData.priceTiers[formData.priceTiers.length - 1];

    let newMin = 1;
    let newMax = 10;
    let newPrice = 100;

    if (lastTier) {
      newMin = (lastTier.maxEmployees || lastTier.minEmployees) + 1;
      newMax = newMin + 9;
      newPrice = lastTier.price + 50;
    }

    const newTier: PriceTier = {
      minEmployees: newMin,
      maxEmployees: newMax,
      price: newPrice,
      label: `${newMin}-${newMax} salariés`,
      duration: formData.duration,
      employees: formData.employees,
    };

    setFormData({
      ...formData,
      priceTiers: [...formData.priceTiers, newTier],
    });
  };
  const removePriceTier = (index: number) => {
    const updatedTiers = formData.priceTiers.filter((_, i) => i !== index);
    setFormData({ ...formData, priceTiers: updatedTiers });
  };

  // Submit create/edit - CORRIGÉ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔍 [SUBMIT] Données du formulaire:", formData);

      // VALIDATION
      if (formData.hasVariablePricing) {
        if (formData.priceTiers.length === 0) {
          alert(
            "Veuillez ajouter au moins une tranche de prix pour le prix variable"
          );
          setLoading(false);
          return;
        }

        const invalidTiers = formData.priceTiers.filter(
          (tier) => tier.price <= 0 || isNaN(tier.price)
        );

        if (invalidTiers.length > 0) {
          alert(
            "Toutes les tranches de prix doivent avoir un prix valide supérieur à 0"
          );
          setLoading(false);
          return;
        }
      } else {
        if (!formData.price || parseFloat(formData.price) <= 0) {
          alert("Veuillez saisir un prix valide");
          setLoading(false);
          return;
        }
      }

      // PRÉPARATION DES DONNÉES - Structure CORRECTE pour votre API
      const payload: any = {
        name: formData.name,
        duration: formData.duration,
        employees: formData.employees,
        features: formData.features,
        popular: formData.popular,
        color: formData.color,
        period: formData.period,
        hasVariablePricing: formData.hasVariablePricing,
      };

      // Gestion du prix selon le type
      if (formData.hasVariablePricing) {
        payload.price = 0;
        payload.priceTiers = formData.priceTiers.map((tier) => ({
          minEmployees: Number(tier.minEmployees) || 0,
          maxEmployees: tier.maxEmployees,
          price: Number(tier.price) || 0,
          label: tier.label || "",
          duration: tier.duration || formData.duration,
          employees: tier.employees || formData.employees,
        }));
      } else {
        payload.price = parseFloat(formData.price);
        payload.priceTiers = [];
      }

      console.log("🎯 Payload envoyé:", JSON.stringify(payload, null, 2));

      // ENVOI
      let response;
      if (editingPlan) {
        console.log(`🔄 Modification du plan ${editingPlan.id}`);
        response = await axiosInstance.put(`/plans/${editingPlan.id}`, payload);
      } else {
        console.log("🔄 Création d'un nouveau plan");
        response = await axiosInstance.post("/plans", payload);
      }

      console.log("✅ Succès:", response.data);

      // SUCCÈS
      setShowModal(false);
      await fetchPlans(); // Recharger la liste
    } catch (err: any) {
      console.error("❌ Erreur détaillée:", err);
      console.error("❌ Response error:", err.response?.data);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Erreur lors de l'enregistrement";

      alert(`Erreur: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  // Delete plan
  const confirmDelete = (plan: Plan) => {
    setPlanToDelete(plan);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!planToDelete) return;
    try {
      await axiosInstance.delete(`/plans/${planToDelete.id}`);
      fetchPlans();
    } catch (err) {
      alert("Erreur suppression");
    } finally {
      setShowDeleteModal(false);
      setPlanToDelete(null);
    }
  };

  // Gradient colors for plans
  const gradientColors = [
    "from-blue-500 to-blue-400",
    "from-green-500 to-green-400",
    "from-yellow-500 to-yellow-400",
    "from-red-500 to-red-400",
    "from-purple-500 to-purple-400",
    "from-pink-500 to-pink-400",
  ];

  // Fonction pour afficher le prix d'un plan
  const renderPlanPrice = (plan: Plan) => {
    if (plan.hasVariablePricing && plan.priceTiers?.length) {
      const validTiers = plan.priceTiers.filter(
        (tier) => tier.price != null && !isNaN(tier.price)
      );

      if (validTiers.length === 0) {
        return <div className="font-semibold text-gray-900">—</div>;
      }

      const minPrice = Math.min(...validTiers.map((tier) => tier.price));
      const maxPrice = Math.max(...validTiers.map((tier) => tier.price));

      return (
        <div>
          <div className="font-semibold text-gray-900">
            {minPrice}€{minPrice !== maxPrice ? ` - ${maxPrice}€` : ""}
          </div>
          <div className="text-sm text-gray-500">
            /{plan.period === "year" ? "an" : "mois"}
          </div>
          <div className="text-xs text-purple-600 font-medium">
            Prix variable
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="font-semibold text-gray-900">
            {plan.price != null ? `${plan.price}€` : "—"}
          </div>
          <div className="text-sm text-gray-500">
            /{plan.period === "year" ? "an" : "mois"}
          </div>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Gestion des Abonnements
          </h2>
          <p className="text-gray-600 mt-2">
            Gérez les plans d'abonnement Knowledge Stipend
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter un plan</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type de Prix
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedPlans.map((plan, idx) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                      >
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {plan.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{plan.employees}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{renderPlanPrice(plan)}</td>
                  <td className="px-6 py-4">
                    {plan.hasVariablePricing ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Variable
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Fixe
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{plan.duration}</span>
                  </td>
                  <td className="px-6 py-4">
                    {plan.popular ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Crown className="w-3 h-3 mr-1" />
                        Populaire
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(plan)}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(plan)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedPlans.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun plan trouvé</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>‹ Précédent</span>
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Suivant ›</span>
          </button>
        </div>
      )}

      {/* Modal create/edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  {editingPlan ? "Modifier le plan" : "Ajouter un plan"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du plan
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Startup, Business, Pharmacie..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Période
                  </label>
                  <select
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="month">Mensuel</option>
                    <option value="year">Annuel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Mensuel, Flexible..."
                    required
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="hasVariablePricing"
                      checked={formData.hasVariablePricing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hasVariablePricing: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="hasVariablePricing"
                      className="text-sm font-medium text-gray-700"
                    >
                      Prix variable selon le nombre de salariés
                    </label>
                  </div>
                </div>

                {!formData.hasVariablePricing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix fixe (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="29.99"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description employés
                  </label>
                  <input
                    type="text"
                    value={formData.employees}
                    onChange={(e) =>
                      setFormData({ ...formData, employees: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 1-10, 11-50, Illimité..."
                    required
                  />
                </div>
              </div>

              {/* Section Prix Variables */}
              {formData.hasVariablePricing && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      Tranches de prix par effectif
                    </h4>
                    <button
                      type="button"
                      onClick={addPriceTier}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter une tranche</span>
                    </button>
                  </div>

                  {formData.priceTiers.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      Aucune tranche de prix définie
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {formData.priceTiers.map((tier, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1 grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Salariés min
                              </label>
                              <input
                                type="number"
                                value={tier.minEmployees}
                                onChange={(e) =>
                                  updatePriceTier(
                                    index,
                                    "minEmployees",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Salariés max
                              </label>
                              <input
                                type="number"
                                value={
                                  tier.maxEmployees === null
                                    ? ""
                                    : tier.maxEmployees
                                }
                                onChange={(e) =>
                                  updatePriceTier(
                                    index,
                                    "maxEmployees",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="0 pour illimité"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Prix (€)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={tier.price}
                                onChange={(e) =>
                                  updatePriceTier(
                                    index,
                                    "price",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="120.00"
                                required
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePriceTier(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur du gradient
                </label>
                <select
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {gradientColors.map((color, index) => (
                    <option key={index} value={color}>
                      Option {index + 1} - {color.split("-")[1]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fonctionnalités
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.newFeature}
                    onChange={(e) =>
                      setFormData({ ...formData, newFeature: e.target.value })
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ajouter une fonctionnalité..."
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) =>
                    setFormData({ ...formData, popular: e.target.checked })
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium text-gray-700"
                >
                  Marquer comme plan populaire
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold disabled:opacity-50"
                >
                  {loading
                    ? "Enregistrement..."
                    : editingPlan
                    ? "Modifier"
                    : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && planToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Confirmer la suppression
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Voulez-vous vraiment supprimer le plan{" "}
                <strong>{planToDelete.name}</strong> ?
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ Cette action est irréversible. Tous les abonnements
                  associés à ce plan seront affectés.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

export default AdminPlans;
