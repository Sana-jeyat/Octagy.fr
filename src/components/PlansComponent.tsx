"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/context/axiosInstance";
import { Building, CheckCircle, Loader2 } from "lucide-react";
import CompanyModal from "./CompanyModal";
import { AuthContext } from "@/context/AuthContext";

interface PriceTier {
  id?: number;
  minEmployees: number;
  maxEmployees: number | null;
  price: number;
  label: string;
  duration?: string;
  employees?: string;
}
interface Tier {
  id?: number;
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
  popular: boolean;
  color: string;
  period: string;
  hasVariablePricing: boolean;
  priceTiers: PriceTier[];
  tiers: Tier[];
}

interface PlansComponentProps {
  plans: Plan[];
  tiers: Tier[];
}

const PlansComponent: React.FC<PlansComponentProps> = ({ plans }) => {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [siretNumber, setSiretNumber] = useState<string>("");
  const [showCompanyForm, setShowCompanyForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  const [ownerData, setOwnerData] = useState({
    gender: "M",
    firstName: "",
    lastName: "",
    personalEmail: "",
    mobilePhone: "",
  });

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useContext(AuthContext);

  // CORRECTION : Fonction handlePurchase améliorée
  const handlePurchase = (tierId: string) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    console.log("🛒 Achat du tier:", tierId);
    setSelectedPlanId(tierId);
    setShowCompanyForm(true);
  };

  const handleSubmitCompany = async () => {
    if (
      !companyName ||
      !selectedPlanId ||
      !ownerData.firstName ||
      !ownerData.lastName ||
      !ownerData.personalEmail
    ) {
      alert(
        "Veuillez remplir toutes les informations du responsable et de l'entreprise."
      );
      return;
    }

    try {
      setLoading(true);

      // CORRECTION : Log pour debug
      console.log("📤 Envoi des données:", {
        planId: selectedPlanId,
        companyName,
        period: isAnnual ? "year" : "month",
      });

      const response = await axiosInstance.post("/pay/stripe-subscription", {
        planId: selectedPlanId,
        companyName,
        description,
        companyAddress: address,
        companyEmail: email,
        companyPhone: phone,
        companySiret: siretNumber,
        owner: ownerData,
        period: isAnnual ? "year" : "month",
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la création de la session Stripe:", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const planColors = [
    "from-blue-500 to-blue-400",
    "from-green-500 to-green-400",
    "from-yellow-500 to-yellow-400",
    "from-red-500 to-red-400",
    "from-pink-500 to-pink-400",
  ];

  const [selectedTier, setSelectedTier] = useState<Record<string, string>>({});

  // CORRECTION : Fonction pour calculer le prix selon la période
  const getTierPrice = (
    basePrice: number,
    planPeriod: string,
    isAnnualSelected: boolean
  ) => {
    // Si le plan est déjà en annuel et l'utilisateur sélectionne annuel
    if (planPeriod === "year" && isAnnualSelected) {
      return basePrice;
    }
    // Si le plan est mensuel et l'utilisateur sélectionne annuel
    else if (planPeriod === "month" && isAnnualSelected) {
      return basePrice * 10; // 10 mois au lieu de 12 pour la promotion
    }
    // Sinon (mensuel sélectionné ou plan annuel avec mensuel)
    else {
      return basePrice;
    }
  };

  // CORRECTION : Fonction pour obtenir l'affichage de la période
  const getPeriodDisplay = (planPeriod: string, isAnnualSelected: boolean) => {
    if (isAnnualSelected) {
      return "an";
    }
    return planPeriod === "year" ? "an" : "mois";
  };

  // CORRECTION : Debug des données
  console.log("📊 Plans reçus:", plans);
  console.log("🎯 Tiers sélectionnés:", selectedTier);

  return (
    <div className="space-y-8 px-4 py-12 md:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Titre */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Choisissez votre plan Knowledge Stipend
        </h2>
        <p className="text-lg text-gray-600">
          Des solutions adaptées à la taille de votre entreprise.
        </p>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="flex justify-center">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-l-lg font-semibold border transition-all duration-300 ${
              !isAnnual
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-r-lg font-semibold border transition-all duration-300 ${
              isAnnual
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Annuel
          </button>
        </div>

        <p className="mt-3 text-lg font-bold text-yellow-500 flex items-center gap-2">
          <span className="text-2xl animate-bounce">🔥</span>
          <span>
            <span className="text-gray-800">Économisez</span>{" "}
            <span className="text-purple-600 text-xl font-extrabold">
              2 mois
            </span>{" "}
            <span className="text-gray-800">avec le plan annuel !</span>
          </span>
        </p>
      </div>

      {/* Cartes de plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const planColor = planColors[index % planColors.length];
          const activeTierId = selectedTier[plan.name];

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                plan.popular ? "border-purple-500" : "border-gray-200"
              } flex flex-col justify-between min-h-[400px]`}
            >
              {/* POPULAIRE */}
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 translate-y-[-50%]">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ⭐ Populaire
                  </span>
                </div>
              )}

              {/* LOGO */}
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${planColor} flex items-center justify-center mb-6 mx-auto`}
              >
                <Building className="w-10 h-10 text-white" />
              </div>

              {/* TITRE */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                {plan.tiers.some(
                  (tier) => tier.priceTiers && tier.priceTiers.length > 0
                ) && (
                  <p className="text-sm text-purple-600 font-medium">
                    Plusieurs options disponibles
                  </p>
                )}
              </div>

              {/* 🚀 LISTE DES OPTIONS DE PRIX CLIQUABLES */}
              <div className="space-y-4 flex-grow mb-6">
                {/* AFFICHER LES PRICETIERS SI DISPONIBLES, SINON LES TIERS NORMAUX */}
                {(() => {
                  // Vérifier si un tier a des priceTiers
                  const tierWithPriceTiers = plan.tiers.find(
                    (tier) => tier.priceTiers && tier.priceTiers.length > 0
                  );

                  if (tierWithPriceTiers) {
                    // Afficher les priceTiers comme blocs séparés
                    return tierWithPriceTiers.priceTiers.map(
                      (priceTier, priceTierIndex) => {
                        const priceTierId = `priceTier-${tierWithPriceTiers.id}-${priceTierIndex}`;
                        const isSelected = priceTierId === activeTierId;
                        const displayPrice = getTierPrice(
                          priceTier.price,
                          priceTier.duration,
                          isAnnual
                        );

                        return (
                          <div
                            key={priceTierId}
                            onClick={() => {
                              console.log(
                                `🎯 Sélection du priceTier: ${priceTier.label} pour le plan: ${plan.name}`
                              );
                              setSelectedTier((prev) => ({
                                ...prev,
                                [plan.name]: priceTierId,
                              }));
                            }}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "bg-purple-50 border-purple-500 shadow-md"
                                : "bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-lg font-bold text-gray-900">
                                  {displayPrice}€
                                  <span className="text-sm font-normal text-gray-600 ml-1">
                                    {priceTier.duration === "12"
                                      ? "/mois"
                                      : "/an"}
                                  </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  {priceTier.label}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="bg-purple-500 text-white p-1 rounded-full">
                                  <CheckCircle className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    );
                  } else {
                    // Afficher les tiers normaux
                    return plan.tiers.map((tier, tierIndex) => {
                      const tierId = tier.id.toString();
                      const isSelected = tierId === activeTierId;
                      const displayPrice = getTierPrice(
                        tier.price,
                        tier.duration,
                        isAnnual
                      );

                      return (
                        <div
                          key={tierId}
                          onClick={() => {
                            console.log(
                              `🎯 Sélection du tier: ${tierId} pour le plan: ${plan.name}`
                            );
                            setSelectedTier((prev) => ({
                              ...prev,
                              [plan.name]: tierId,
                            }));
                          }}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "bg-purple-50 border-purple-500 shadow-md"
                              : "bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                {tier.price !== 0
                                  ? `${displayPrice}€`
                                  : "Sur devis"}
                                <span className="text-sm font-normal text-gray-600 ml-1">
                                  {tier.duration === "12" ? "/mois" : "/an"}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                {tier.employees} employés
                              </p>
                            </div>
                            {isSelected && (
                              <div className="bg-purple-500 text-white p-1 rounded-full">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  }
                })()}
              </div>

              {/* FEATURES COMMUNES - AFFICHÉES UNE SEULE FOIS POUR TOUS LES BLOCS */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  Fonctionnalités incluses :
                </h4>
                <ul className="space-y-3">
                  {(() => {
                    // Récupérer les features du premier tier (ou du tier avec priceTiers)
                    const tierWithPriceTiers = plan.tiers.find(
                      (tier) => tier.priceTiers && tier.priceTiers.length > 0
                    );
                    const featuresSource = tierWithPriceTiers || plan.tiers[0];

                    return featuresSource.features &&
                      featuresSource.features.length > 0 ? (
                      featuresSource.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic text-sm">
                        Aucune fonctionnalité spécifique
                      </li>
                    );
                  })()}
                </ul>
              </div>

              {/* FEATURES GÉNÉRALES DU PLAN (si différentes des features des tiers) */}
              {plan.features && plan.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">
                    Fonctionnalités du plan :
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* BOUTON D'ACHAT */}
              <button
                onClick={() => {
                  if (!activeTierId) {
                    alert("Veuillez sélectionner une option de prix");
                    return;
                  }

                  // Trouver l'option sélectionnée (tier ou priceTier)
                  let selectedOption;
                  const tierWithPriceTiers = plan.tiers.find(
                    (tier) => tier.priceTiers && tier.priceTiers.length > 0
                  );

                  if (
                    tierWithPriceTiers &&
                    activeTierId.startsWith("priceTier-")
                  ) {
                    // C'est un priceTier sélectionné
                    const priceTierIndex = parseInt(activeTierId.split("-")[2]);
                    selectedOption =
                      tierWithPriceTiers.priceTiers[priceTierIndex];
                  } else {
                    // C'est un tier normal sélectionné
                    selectedOption = plan.tiers.find(
                      (tier) => tier.id.toString() === activeTierId
                    );
                  }

                  console.log(`🛒 Achat du plan: ${plan.name}`, selectedOption);
                  handlePurchase(plan, selectedOption);
                }}
                className={`w-full mt-2 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "bg-purple-600 hover:bg-purple-700"
                } ${!activeTierId ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!activeTierId || loading}
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <Loader2 className="animate-spin w-5 h-5 mr-2 text-white" />
                    Chargement...
                  </span>
                ) : activeTierId ? (
                  "Acheter cette option"
                ) : (
                  "Sélectionne une option"
                )}
              </button>
            </div>
          );
        })}
      </div>
      {/* Modal de création d'entreprise */}
      <CompanyModal
        show={showCompanyForm}
        onClose={() => setShowCompanyForm(false)}
        onSubmit={handleSubmitCompany}
        loading={loading}
        companyName={companyName}
        setCompanyName={setCompanyName}
        description={description}
        setDescription={setDescription}
        address={address}
        setAddress={setAddress}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        siretNumber={siretNumber}
        setSiretNumber={setSiretNumber}
        ownerData={ownerData}
        handleOwnerChange={handleOwnerChange}
      />
    </div>
  );
};

export default PlansComponent;
