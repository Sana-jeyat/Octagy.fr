"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Filter,
  Search,
  X,
  Globe,
  MapPin,
  Clock,
  Users,
  Star,
  Award,
  BookOpen,
  Stethoscope,
  Heart,
  Shield,
  Brain,
  Briefcase,
  Calculator,
  TrendingUp,
  Zap,
  DollarSign,
  ChevronRight,
  Play,
  Bookmark,
  Share2,
  Grid,
  List,
  HelpCircle,
} from "lucide-react";

// Interfaces pour les formations santé
export interface HealthCourse {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  modality: string;
  audience: string[];
  themes: string[];
  certifications: string[];
  locationType: string;
  durationHours: number;
  status: "open" | "upcoming" | "closed";
  language: "fr" | "en";
  price: number;
  knoPrice: number;
  trainer: {
    id: number;
    name: string;
    specialization: string;
    organization: string;
    avatar?: string;
  };
  dates?: {
    start: string;
    end: string;
  };
  location?: {
    address: string;
    city: string;
    region: string;
    latitude?: number;
    longitude?: number;
  };
  keywords: string[];
  level: "débutant" | "intermédiaire" | "avancé";
  capacity?: number;
  enrolled?: number;
  rating?: number;
  // Champs compatibles avec l'ancienne structure
  fullname?: string;
  summary?: string;
  fiatPrice?: number;
  category?: string;
}

const baseUrl = "http://localhost:8000";
// FILTRES SPÉCIALISÉS SANTÉ

// Modalités pédagogiques
const modalities = [
  {
    id: "elearning",
    label: "E-learning",
    icon: "💻",
    description: "Formation 100% en ligne",
  },
  {
    id: "presentiel",
    label: "Présentiel",
    icon: "🏫",
    description: "En salle avec formateur",
  },
  {
    id: "virtuel",
    label: "Classe virtuelle",
    icon: "📡",
    description: "Visioconférence horaire fixe",
  },
  {
    id: "mixte",
    label: "Mixte / Blended",
    icon: "🔄",
    description: "E-learning + présentiel",
  },
  {
    id: "webinaire",
    label: "Webinaire",
    icon: "🎙️",
    description: "Session courte découverte",
  },
];

// Publics cibles santé
const audiences = [
  { id: "Tous publics", label: "Tous publics", icon: "🌍" },
  { id: "Pharmacien titulaire", label: "Pharmacien titulaire", icon: "🧑‍⚕️" },
  { id: "Pharmacien adjoint", label: "Pharmacien adjoint", icon: "⚕️" },
  {
    id: "Préparateur en pharmacie",
    label: "Préparateur en pharmacie",
    icon: "💊",
  },
  { id: "Infirmier(e)", label: "Infirmier(e)", icon: "👨‍⚕️" },
  { id: "Médecin", label: "Médecin", icon: "👩‍⚕️" },
  { id: "Kinésithérapeute", label: "Kinésithérapeute", icon: "💪" },
  { id: "Chirurgien-dentiste", label: "Chirurgien-dentiste", icon: "🦷" },
  {
    id: "Autre professionnel de santé",
    label: "Autre professionnel de santé",
    icon: "🏥",
  },
];

// Thématiques santé
const themes = [
  {
    id: "Santé publique / prévention",
    label: "Santé publique / prévention",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "Urgences et premiers secours",
    label: "Urgences et premiers secours",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "Pratique officinale",
    label: "Pratique officinale",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "Actualités thérapeutiques",
    label: "Actualités thérapeutiques",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "Réglementaire / conformité",
    label: "Réglementaire / conformité",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "Management & RH santé",
    label: "Management & RH santé",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "Digital santé",
    label: "Digital santé",
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    id: "Bien-être & prévention",
    label: "Bien-être & prévention",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: "Innovation médicale",
    label: "Innovation médicale",
    color: "bg-teal-100 text-teal-800",
  },
];

// Certifications & financement santé
const certifications = [
  { id: "Éligible au DPC", label: "Éligible au DPC", icon: "📋" },
  { id: "FIFPL (pharmaciens)", label: "FIFPL (pharmaciens)", icon: "💰" },
  { id: "OPCO Santé", label: "OPCO Santé", icon: "🏢" },
  {
    id: "Compte Personnel de Formation",
    label: "Compte Personnel de Formation",
    icon: "👤",
  },
  { id: "Formation certifiante", label: "Formation certifiante", icon: "🎓" },
  { id: "Recommandation HAS", label: "Recommandation HAS", icon: "⭐" },
];

// Localisations
const locations = [
  { id: "en_ligne", label: "En ligne", icon: "💻" },
  { id: "ile_de_france", label: "Île-de-France", icon: "🏛️" },
  { id: "paca", label: "Provence-Alpes-Côte d'Azur", icon: "🌊" },
  { id: "hauts_de_france", label: "Hauts-de-France", icon: "🏭" },
  { id: "auvergne_rhone_alpes", label: "Auvergne-Rhône-Alpes", icon: "⛰️" },
  { id: "occitanie", label: "Occitanie", icon: "☀️" },
  { id: "nouvelle_aquitaine", label: "Nouvelle-Aquitaine", icon: "🏖️" },
  { id: "autres_regions", label: "Autres régions", icon: "🗺️" },
];

// Niveaux
const levels = [
  { id: "all", name: "Tous niveaux", color: "bg-gray-100 text-gray-800" },
  { id: "débutant", name: "Débutant", color: "bg-green-100 text-green-800" },
  {
    id: "intermédiaire",
    name: "Intermédiaire",
    color: "bg-yellow-100 text-yellow-800",
  },
  { id: "avancé", name: "Avancé", color: "bg-red-100 text-red-800" },
];

// Options de tri
const sortOptions = [
  { id: "popular", name: "Plus populaires", icon: TrendingUp },
  { id: "rating", name: "Mieux notés", icon: Star },
  { id: "newest", name: "Plus récents", icon: Clock },
  { id: "reward", name: "Plus de $KNO", icon: Zap },
  { id: "duration", name: "Durée croissante", icon: Clock },
  { id: "price", name: "Prix croissant", icon: DollarSign },
];

// Mots-clés santé
const suggestedKeywords = [
  "vaccination",
  "dépistage",
  "TROD",
  "nutrition",
  "diabète",
  "hypertension",
  "AFGSU",
  "premiers secours",
  "officine",
  "délivrance",
  "pharmacie clinique",
  "DPC",
  "FIFPL",
  "Qualiopi",
  "e-learning",
  "présentiel",
  "blended",
  "réglementaire",
  "RGPD",
  "santé publique",
  "bien-être",
  "prévention",
  "innovation",
  "thérapeutique",
  "management",
  "digital santé",
];

// Fonction utilitaire pour transformer les données API
const transformCourseData = (apiCourse: any): HealthCourse => {
  // Fonction de normalisation du niveau
  const normalizeLevel = (
    level: string
  ): "débutant" | "intermédiaire" | "avancé" => {
    if (!level) return "intermédiaire";

    const levelStr = level.toLowerCase().trim();
    if (levelStr.includes("débutant") || levelStr.includes("beginner"))
      return "débutant";
    if (
      levelStr.includes("intermédiaire") ||
      levelStr.includes("intermediaire") ||
      levelStr.includes("intermediate")
    )
      return "intermédiaire";
    if (
      levelStr.includes("avancé") ||
      levelStr.includes("avance") ||
      levelStr.includes("advanced")
    )
      return "avancé";

    return "intermédiaire";
  };

  // Mapping pour targetAudience - fait correspondre API → filtres
  const mapAudience = (audience: string[]): string[] => {
    const audienceMap: { [key: string]: string } = {
      "Pharmacien titulaire": "Pharmacien titulaire",
      "Pharmacien adjoint": "Pharmacien adjoint",
      "Préparateur en pharmacie": "Préparateur en pharmacie",
      "Infirmier(e)": "Infirmier(e)",
      Médecin: "Médecin",
      Kinésithérapeute: "Kinésithérapeute",
      "Chirurgien-dentiste": "Chirurgien-dentiste",
      "Autre professionnel de santé": "Autre professionnel de santé",
      "Tous publics": "Tous publics",
    };

    return audience.map((aud) => audienceMap[aud] || aud);
  };

  // Mapping pour certifications - fait correspondre API → filtres
  const mapCertifications = (certs: string[]): string[] => {
    const certMap: { [key: string]: string } = {
      "Éligible au DPC": "Éligible au DPC",
      "FIFPL (pharmaciens)": "FIFPL (pharmaciens)",
      "OPCO Santé": "OPCO Santé",
      "Compte Personnel de Formation": "Compte Personnel de Formation",
      "Formation certifiante": "Formation certifiante",
      "Recommandation HAS": "Recommandation HAS",
    };

    return certs.map((cert) => certMap[cert] || cert);
  };

  // Déterminer le type de localisation
  const getLocationType = (location: string | null, format: string): string => {
    if (
      !location ||
      format === "elearning" ||
      format === "virtuel" ||
      format === "webinaire"
    ) {
      return "en_ligne";
    }
    return "presentiel";
  };

  // Convertir la durée
  const durationToHours = (duration: number | string): number => {
    if (typeof duration === "string") {
      if (duration.includes("heure") || duration.includes("h")) {
        return parseInt(duration) || 14;
      }
      if (duration.includes("jour") || duration.includes("day")) {
        return (parseInt(duration) || 1) * 7;
      }
    }
    const numDuration =
      typeof duration === "string" ? parseInt(duration) : duration;
    return Math.round((numDuration || 840) / 60);
  };

  return {
    id: apiCourse.id,
    title: apiCourse.fullname || apiCourse.title,
    description: apiCourse.summary || apiCourse.description,
    imageUrl: apiCourse.imageUrl,
    modality: apiCourse.modality || "elearning",
    audience: mapAudience(
      apiCourse.targetAudience || apiCourse.audience || ["Tous publics"]
    ),
    // audience: apiCourse.audience || ["tous_publics"],
    themes:
      apiCourse.themes || apiCourse.category
        ? [apiCourse.category]
        : ["sante_publique"],
    certifications: mapCertifications(apiCourse.certifications || []),
    locationType: getLocationType(apiCourse.location, apiCourse.modality),
    durationHours: durationToHours(apiCourse.duration),
    status: apiCourse.status || "open",
    language: apiCourse.language || "fr",
    price: apiCourse.fiatPrice || apiCourse.price || 0,
    knoPrice: apiCourse.knoPrice || 0,
    trainer: apiCourse.createdBy
      ? {
          id: apiCourse.createdBy.id,
          name: apiCourse.createdBy.name,
          specialization: "Spécialiste santé",
          organization: "Organisation partenaire",
        }
      : {
          id: 1,
          name: "Expert Santé KNO",
          specialization: "Médecine",
          organization: "KNO Academy",
        },
    keywords: apiCourse.keywords || ["santé", "formation"],
    level: apiCourse.level || "intermediate",
    // level: decodeURIComponent(escape(apiCourse.level)),
    capacity: apiCourse.capacity || 30,
    enrolled: apiCourse.enrolled || Math.floor(Math.random() * 30),
    rating: apiCourse.rating || 4.5,
    // Garder la compatibilité
    fullname: apiCourse.fullname,
    summary: apiCourse.summary,
    fiatPrice: apiCourse.fiatPrice,
  };
};

// Composant pour l'image avec gestion d'erreur
const CourseImage = ({ course }: { course: HealthCourse }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log(`🖼️ Course ${course.id} image:`, {
      imageUrl: course.imageUrl,
      title: course.title,
    });
  }, [course]);

  if (!course.imageUrl || imageError) {
    return (
      <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center rounded-t-2xl">
        <Stethoscope className="w-16 h-16 text-white" />
      </div>
    );
  }

  return (
    <div className="h-48 bg-gray-200 rounded-t-2xl overflow-hidden">
      <img
        src={`${baseUrl}/${course.imageUrl}`}
        alt={course.fullname}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default function HealthCoursesPage() {
  // États principaux
  const [courses, setCourses] = useState<HealthCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<HealthCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  // Debug
  useEffect(() => {
    console.log("🔄 Formations chargées:", courses);
    console.log("🔍 Formations filtrées:", filteredCourses);
    console.log(
      "📊 URL API:",
      `${process.env.NEXT_PUBLIC_APP_API_URL}/courses`
    );
  }, [courses, filteredCourses]);

  // États de filtrage
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<
    string[]
  >([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [durationRange, setDurationRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // États d'affichage
  const [displayLimit, setDisplayLimit] = useState(12);

  // Chargement des formations santé depuis votre API
  useEffect(() => {
    const loadHealthCourses = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_APP_API_URL}/courses`;
        console.log("🔄 Tentative de chargement depuis:", apiUrl);

        // Appel à votre API formations personnalisée
        // const resp = await fetch(apiUrl);
        const resp = await fetch(apiUrl, {
          credentials: "include", // ✅ pour envoyer le cookie de session
          headers: {
            Accept: "application/json",
          },
        });

        console.log("📡 Statut de la réponse:", resp.status);
        console.log("📡 OK?", resp.ok);

        if (!resp.ok) {
          throw new Error(
            `HTTP error! status: ${resp.status} - ${resp.statusText}`
          );
        }

        const apiData = await resp.json();
        console.log("📦 Données API formations:", apiData);

        if (apiData.data) {
          // Transformer les données de votre API en format HealthCourse
          const healthCourses: HealthCourse[] =
            apiData.data.map(transformCourseData);
          console.log("✅ Formations transformées:", healthCourses);
          setCourses(healthCourses);
          setFilteredCourses(healthCourses);
        } else {
          throw new Error(apiData.error || "Structure de données API invalide");
        }
      } catch (error) {
        console.error("💥 Erreur détaillée:", error);
        console.error(
          "💥 Type d'erreur:",
          error instanceof Error ? error.message : "Unknown error"
        );
        // En cas d'erreur, on laisse les tableaux vides
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHealthCourses();
  }, []);

  // Filtrage des formations
  useEffect(() => {
    let filtered = courses;

    // Recherche texte
    if (searchQuery.trim() !== "") {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(lower) ||
          course.description.toLowerCase().includes(lower) ||
          course.keywords.some((kw) => kw.toLowerCase().includes(lower)) ||
          course.trainer.name.toLowerCase().includes(lower)
      );
    }

    // Filtres multiples
    if (selectedModalities.length > 0) {
      filtered = filtered.filter((course) =>
        selectedModalities.includes(course.modality)
      );
    }

    if (selectedAudiences.length > 0) {
      filtered = filtered.filter((course) =>
        course.audience.some((aud) => selectedAudiences.includes(aud))
      );
    }

    if (selectedThemes.length > 0) {
      filtered = filtered.filter((course) =>
        course.themes.some((theme) => selectedThemes.includes(theme))
      );
    }

    if (selectedCertifications.length > 0) {
      filtered = filtered.filter((course) =>
        course.certifications.some((cert) =>
          selectedCertifications.includes(cert)
        )
      );
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((course) =>
        selectedLocations.includes(course.locationType)
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((course) => course.status === selectedStatus);
    }

    // Filtres prix et durée
    filtered = filtered.filter(
      (course) =>
        course.price >= priceRange[0] &&
        course.price <= priceRange[1] &&
        course.durationHours >= durationRange[0] &&
        course.durationHours <= durationRange[1]
    );

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.enrolled || 0) - (a.enrolled || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return b.id - a.id;
        case "reward":
          return b.knoPrice - a.knoPrice;
        case "duration":
          return a.durationHours - b.durationHours;
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [
    courses,
    searchQuery,
    selectedModalities,
    selectedAudiences,
    selectedThemes,
    selectedCertifications,
    selectedLocations,
    selectedLevel,
    selectedStatus,
    priceRange,
    durationRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedModalities([]);
    setSelectedAudiences([]);
    setSelectedThemes([]);
    setSelectedCertifications([]);
    setSelectedLocations([]);
    setSelectedLevel("all");
    setSelectedStatus("all");
    setPriceRange([0, 1000]);
    setDurationRange([0, 50]);
    setSortBy("popular");
  };

  const activeFiltersCount = [
    searchQuery !== "",
    selectedModalities.length > 0,
    selectedAudiences.length > 0,
    selectedThemes.length > 0,
    selectedCertifications.length > 0,
    selectedLocations.length > 0,
    selectedLevel !== "all",
    selectedStatus !== "all",
    priceRange[0] !== 0 || priceRange[1] !== 1000,
    durationRange[0] !== 0 || durationRange[1] !== 50,
  ].filter(Boolean).length;

  const coursesToDisplay = filteredCourses.slice(0, displayLimit);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Chargement des formations santé...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Santé */}
      <section className="bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Formations{" "}
              <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
                Santé
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Formations continues pour les professionnels de santé. DPC, FIFPL,
              certifications et innovations.
            </p>

            {/* Stats spécialisées santé */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{courses.length}+</div>
                <div className="text-blue-200 text-sm">Formations santé</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-blue-200 text-sm">Conformes DPC</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-blue-200 text-sm">
                  Professionnels formés
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher formations, thématiques, formateurs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Contrôles rapides */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters || activeFiltersCount > 0
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtres avancés santé */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Modalités */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📚 Modalités
                  </label>
                  <div className="space-y-2">
                    {modalities.map((modality) => (
                      <label key={modality.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedModalities.includes(modality.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedModalities([
                                ...selectedModalities,
                                modality.id,
                              ]);
                            } else {
                              setSelectedModalities(
                                selectedModalities.filter(
                                  (m) => m !== modality.id
                                )
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {modality.icon} {modality.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Publics cibles */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👥 Publics cibles
                  </label>
                  <div className="space-y-2">
                    {audiences.map((audience) => (
                      <label key={audience.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAudiences.includes(audience.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAudiences([
                                ...selectedAudiences,
                                audience.id,
                              ]);
                            } else {
                              setSelectedAudiences(
                                selectedAudiences.filter(
                                  (a) => a !== audience.id
                                )
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {audience.icon} {audience.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Thématiques santé */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Thématiques
                  </label>
                  <div className="space-y-2">
                    {themes.map((theme) => (
                      <label key={theme.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedThemes.includes(theme.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedThemes([...selectedThemes, theme.id]);
                            } else {
                              setSelectedThemes(
                                selectedThemes.filter((t) => t !== theme.id)
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{theme.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📋 Certifications
                  </label>
                  <div className="space-y-2">
                    {certifications.map((cert) => (
                      <label key={cert.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCertifications.includes(cert.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCertifications([
                                ...selectedCertifications,
                                cert.id,
                              ]);
                            } else {
                              setSelectedCertifications(
                                selectedCertifications.filter(
                                  (c) => c !== cert.id
                                )
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {cert.icon} {cert.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Localisation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📍 Localisation
                  </label>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <label key={location.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(location.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLocations([
                                ...selectedLocations,
                                location.id,
                              ]);
                            } else {
                              setSelectedLocations(
                                selectedLocations.filter(
                                  (l) => l !== location.id
                                )
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {location.icon} {location.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Niveau */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎓 Niveau
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Statut */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Statut
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="open">Inscriptions ouvertes</option>
                    <option value="upcoming">À venir</option>
                    <option value="closed">Terminée</option>
                  </select>
                </div>

                {/* Prix */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💰 Prix : {priceRange[0]}€ - {priceRange[1]}€
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ⏱️ Durée : {durationRange[0]}h - {durationRange[1]}h
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={durationRange[1]}
                    onChange={(e) =>
                      setDurationRange([
                        durationRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Mots-clés santé */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔍 Mots-clés santé
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => setSearchQuery(keyword)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      #{keyword}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {showMap ? "Masquer la carte" : "Afficher la carte"}
                  </span>
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Effacer tous les filtres
                  </button>
                  <div className="text-sm text-gray-600">
                    {filteredCourses.length} formation
                    {filteredCourses.length > 1 ? "s" : ""} trouvée
                    {filteredCourses.length > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carte Interactive */}
        {showMap && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">
              📍 Formations par région (
              {
                filteredCourses.filter((c) => c.modality === "presentiel")
                  .length
              }
              )
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses
                .filter((course) => course.modality === "presentiel")
                .map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          {course.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {course.location?.city || "Non spécifié"}
                        </p>
                        <Link
                          href={`/health-courses/${course.id}`}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Voir détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {filteredCourses.filter((c) => c.modality === "presentiel")
              .length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune formation présentielle trouvée</p>
              </div>
            )}
          </div>
        )}

        {/* Liste des formations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Formations Santé ({filteredCourses.length})
            </h3>
            <div className="text-sm text-gray-600">
              {coursesToDisplay.length} affichée
              {coursesToDisplay.length > 1 ? "s" : ""}
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <Stethoscope className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                Aucune formation trouvée
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {courses.length === 0
                  ? "Aucune formation n'est disponible pour le moment."
                  : "Aucune formation ne correspond à vos critères de recherche."}
              </p>
              {courses.length === 0 ? (
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Réessayer
                </button>
              ) : (
                <button
                  onClick={clearFilters}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {coursesToDisplay.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative">
                    {/* CHANGEMENT PRINCIPAL : Utilisation du composant CourseImage */}
                    <CourseImage course={course} />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {course.certifications.includes("DPC") && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          DPC
                        </span>
                      )}
                      {course.certifications.includes("FIFPL") && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          FIFPL
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          levels.find((l) => l.id === course.level)?.color
                        }`}
                      >
                        {levels.find((l) => l.id === course.level)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.durationHours}h
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrolled}/{course.capacity}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      <Link href={`/health-course/${course.id}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        {/* <div className="font-bold text-blue-600">
                          {course.knoPrice} $KNO
                        </div> */}
                        <div className="font-bold text-blue-600">
                          {course.price}€
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center text-sm"
                    >
                      Voir la formation
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {coursesToDisplay.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      {/* CHANGEMENT : Image aussi en mode liste */}
                      {course.imageUrl ? (
                        <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={`${baseUrl}/${course.imageUrl}`}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-24 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {course.certifications.includes("DPC") && (
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                DPC
                              </span>
                            )}
                            {course.certifications.includes("FIFPL") && (
                              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                FIFPL
                              </span>
                            )}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                levels.find((l) => l.id === course.level)?.color
                              }`}
                            >
                              {levels.find((l) => l.id === course.level)?.name}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                            <Link href={`/health-courses/${course.id}`}>
                              {course.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {course.description}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">
                            {course.knoPrice} KNO
                          </div>
                          <div className="text-sm text-gray-500">
                            ou {course.price}€
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.durationHours}h
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.enrolled} inscrits
                          </span>
                          {course.rating && (
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              {course.rating}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/health-courses/${course.id}`}
                          className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center"
                        >
                          Voir la formation
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charger plus */}
        {filteredCourses.length > displayLimit && (
          <div className="text-center mt-12">
            <button
              onClick={() => setDisplayLimit(displayLimit + 12)}
              className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-teal-700 transition-all duration-300 font-semibold"
            >
              Charger plus de formations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
