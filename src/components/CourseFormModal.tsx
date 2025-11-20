import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { Course, NewCourseData } from "@/services/courseService";
import { courseService } from "@/services/courseService"; // Ajout de l'import manquant

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewCourseData) => Promise<boolean>;
  editingCourse?: Course | null;
  isLoading?: boolean;
  refetch: () => void; // Ajout de la fonction refetch
}

const CATEGORIES = [
  "Santé publique / prévention",
  "Urgences et premiers secours",
  "Pratique officinale",
  "Actualités thérapeutiques",
  "Réglementaire / conformité",
  "Management & RH santé",
  "Digital santé",
  "Bien-être & prévention",
  "Innovation médicale",
];

const MODALITY = [
  { value: "presentiel", label: "Présentiel" },
  { value: "elearning", label: "E-learning" },
  { value: "virtuel", label: "Virtuel" },
  { value: "mixte", label: "Mixte" },
  { value: "webinaire", label: "Webinaire" },
];

const TARGET_AUDIENCE = [
  "Tous publics",
  "Pharmacien titulaire",
  "Pharmacien adjoint",
  "Préparateur en pharmacie",
  "Infirmier(e)",
  "Médecin",
  "Kinésithérapeute",
  "Chirurgien-dentiste",
  "Autre professionnel de santé",
];

const CERTIFICATIONS = [
  "Éligible au DPC",
  "FIFPL (pharmaciens)",
  "OPCO Santé",
  "Compte Personnel de Formation",
  "Formation certifiante",
  "Recommandation HAS",
];

const initialFormData: NewCourseData = {
  fullname: "",
  summary: "",
  category: "",
  duration: "",
  level: "débutant",
  fiatPrice: 0,
  subscriberPrice: 0,
  financierPrice: 0,
  imageUrl: "",
  location: "",
  modality: "presentiel",
  targetAudience: [],
  certifications: [],
};

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCourse,
  isLoading = false,
  refetch,
}: Props) {
  const [formData, setFormData] = useState<NewCourseData>(initialFormData);

  // Correction du useEffect
  useEffect(() => {
    if (editingCourse) {
      // Si editingCourse contient déjà les données complètes
      setFormData({
        fullname: editingCourse.fullname || "",
        summary: editingCourse.summary || "",
        category: editingCourse.category || "",
        duration: editingCourse.duration || "",
        level: editingCourse.level || "débutant",
        fiatPrice: editingCourse.fiatPrice || 0,
        subscriberPrice: editingCourse.subscriberPrice || 0,
        financierPrice: editingCourse.financierPrice || 0,
        imageUrl: editingCourse.imageUrl || "",
        location: editingCourse.location || "",
        modality: editingCourse.modality || "presentiel",
        targetAudience: editingCourse.targetAudience || [],
        certifications: editingCourse.certifications || [],
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingCourse, isOpen]); // Ajout de isOpen pour reset à l'ouverture

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024)
      return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, imageUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleCheckboxChange = (
    field: "targetAudience" | "certifications",
    value: string
  ) => {
    setFormData((prev) => {
      const arr = prev[field] || [];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData); // Création ou modification
    if (success) {
      setFormData(initialFormData); // réinitialise le formulaire
      onClose(); // ferme le modal
      refetch(); // Recharge la liste des cours
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold">
            {editingCourse ? "Modifier le cours" : "Ajouter un cours"}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du cours *
              </label>
              <input
                type="text"
                required
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Titre du cours"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Description du cours"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Catégorie, Durée et Format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="">Sélectionnez une catégorie</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: 2 heures, 5 jours"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                modalités *
              </label>
              <select
                required
                value={formData.modality}
                onChange={(e) =>
                  setFormData({ ...formData, modality: e.target.value as any })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              >
                {MODALITY.map((modality) => (
                  <option key={modality.value} value={modality.value}>
                    {modality.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Localisation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localisation
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Paris, En ligne, etc."
              disabled={isLoading}
            />
          </div>

          {/* Public visé */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Public visé
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {TARGET_AUDIENCE.map((audience) => (
                <label key={audience} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.targetAudience?.includes(audience)}
                    onChange={() =>
                      handleCheckboxChange("targetAudience", audience)
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm">{audience}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Certifications
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {CERTIFICATIONS.map((certification) => (
                <label
                  key={certification}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.certifications?.includes(certification)}
                    onChange={() =>
                      handleCheckboxChange("certifications", certification)
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm">{certification}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Niveau et Prix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau *
              </label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value as any })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="avancé">Avancé</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix Standard *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={formData.fiatPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fiatPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix Abonnés
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.subscriberPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subscriberPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix Financeurs
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.financierPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financierPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image du cours
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Choisir une image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            >
              {isLoading
                ? "Chargement..."
                : editingCourse
                ? "Modifier"
                : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
