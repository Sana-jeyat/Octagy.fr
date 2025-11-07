


'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, AlertTriangle, User,Camera ,Edit } from 'lucide-react'
import toast from 'react-hot-toast'
import axiosInstance from '@/context/axiosInstance'

interface ProfileProps {
  userId: number
}

interface UserProfile {
  id: number
  firstName: string | null
  lastName: string | null
  email: string
  profileImage: string | null
  isVerified: boolean
  knoTokens: number
  createdAt: string
  nationality: string | null
  address: string | null
  phoneNumber: string
}

const countries = [
  "Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola",
  "Antigua-et-Barbuda","Arabie Saoudite","Argentine","Arménie","Australie","Autriche",
  "Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Belize","Bénin",
  "Bhoutan","Biélorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil",
  "Brunei","Bulgarie","Burkina Faso","Burundi","Cambodge","Cameroun","Canada","Cap-Vert",
  "Chili","Chine","Chypre","Colombie","Comores","Congo-Brazzaville","Congo-Kinshasa",
  "Corée du Nord","Corée du Sud","Costa Rica","Côte d’Ivoire","Croatie","Cuba","Danemark",
  "Djibouti","Dominique","Égypte","Émirats arabes unis","Équateur","Érythrée","Espagne",
  "Estonie","États-Unis","Éthiopie","Fidji","Finlande","France","Gabon","Gambie","Géorgie",
  "Ghana","Grèce","Grenade","Guatemala","Guinée","Guinée-Bissau","Guinée équatoriale",
  "Guyana","Haïti","Honduras","Hongrie","Inde","Indonésie","Irak","Iran","Irlande","Islande",
  "Israël","Italie","Jamaïque","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan",
  "Kiribati","Koweït","Laos","Lesotho","Lettonie","Liban","Libéria","Libye","Liechtenstein",
  "Lituanie","Luxembourg","Macédoine du Nord","Madagascar","Malaisie","Malawi","Maldives",
  "Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronésie","Moldavie",
  "Monaco","Mongolie","Monténégro","Mozambique","Namibie","Nauru","Népal","Nicaragua","Niger",
  "Nigeria","Norvège","Nouvelle-Zélande","Oman","Ouganda","Ouzbékistan","Pakistan","Palaos",
  "Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou","Philippines","Pologne",
  "Portugal","Qatar","République centrafricaine","République dominicaine","République tchèque",
  "Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Christophe-et-Niévès","Sainte-Lucie",
  "Saint-Vincent-et-les-Grenadines","Salomon","Salvador","Samoa","São Tomé-et-Principe",
  "Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie",
  "Soudan","Sri Lanka","Suède","Suisse","Suriname","Swaziland","Syrie","Tadjikistan","Tanzanie",
  "Tchad","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan",
  "Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Viêt Nam","Yémen",
  "Zambie","Zimbabwe"
]

export default function ProfilePage({ userId }: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [editing, setEditing] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Données du formulaire en édition
  const [editFormData, setEditFormData] = useState<UserProfile | null>(null)

const imageSrc =
  previewImage ||
  (profile?.profileImage
    ? profile.profileImage.startsWith("data:image") // Cas base64
      ? profile.profileImage
      : /^https?:\/\//.test(profile.profileImage) // Cas URL complète (Google, Cloudinary, etc.)
      ? profile.profileImage
      : `https://auth.kno.academy/be${profile.profileImage}` // Cas chemin relatif (/uploads/xxx.jpg)
    : "/default-avatar.png"); // Fallback



useEffect(() => {
  const fetchUser = async () => {
    setLoading(true)
    setError(false)

    try {
      if (!userId) throw new Error('ID utilisateur manquant')

      const { data } = await axiosInstance.get(`/user/${userId}`) // ✅ Cookie envoyé automatiquement
      setProfile(data)
    } catch (err) {
      console.error('Erreur lors du chargement du profil:', err)
      setError(true)
      toast.error('Erreur lors du chargement du profil')
    } finally {
      setLoading(false)
    }
  }

  if (userId) fetchUser()
}, [userId])

  // Copier les données dans editFormData au début de l'édition
  const startEditing = () => {
    if (profile) {
      setEditFormData(profile)
      setEditing(true)
      setPreviewImage(null)
    }
  }

  // Annuler édition
  const cancelEditing = () => {
    setEditFormData(null)
    setEditing(false)
    setPreviewImage(null)
  }

  // Gestion des changements du formulaire, uniquement si en édition
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editing || !editFormData) return
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

// Gestion du changement d'image (upload)
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string); // prévisualisation image
    };

    reader.readAsDataURL(file);
    // Si tu souhaites aussi stocker le fichier dans editFormData pour l'envoyer plus tard, tu peux étendre l'interface UserProfile (optionnel)
  }
};


  // Convertit une DataURL en fichier (pour envoi FormData)
  const dataURLToFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('profileImage', file)

  try {
    const { data } = await axiosInstance.post(
      `/user/${userId}/upload-photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    setProfile((prev) =>
      prev ? { ...prev, profileImage: data.profileImage } : prev
    )

    toast.success('Photo de profil mise à jour !')
  } catch (err) {
    console.error('Erreur lors du téléversement:', err)
    toast.error('Échec de l’upload')
  }
}


  // Soumission du formulaire avec gestion de l'upload image
const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!editFormData) return

  try {
    const formData = new FormData()

    // 🧩 Ajout de tous les champs sauf `profileImage`
    for (const key in editFormData) {
      if (Object.prototype.hasOwnProperty.call(editFormData, key)) {
        const value = (editFormData as any)[key]
        if (value !== null && key !== 'profileImage') {
          formData.append(key, value)
        }
      }
    }

    // 🖼️ Si une nouvelle image est présente
    if (previewImage) {
      const file = dataURLToFile(previewImage, 'profile-image.png')
      formData.append('profileImage', file)
    }

    // ✏️ Mise à jour du profil
    const { data } = await axiosInstance.put(`/user/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // 🔄 Rechargement du profil actualisé
    const { data: refreshedProfile } = await axiosInstance.get(`/user/${userId}`)
    setProfile(refreshedProfile)

    // 🧹 Reset du formulaire
    setEditing(false)
    setEditFormData(null)
    setPreviewImage(null)

    toast.success('Profil mis à jour avec succès')
  } catch (err) {
    console.error('Erreur de mise à jour du profil:', err)
    toast.error('Erreur lors de la mise à jour')
  }
}

  if (loading) {
    return (
      <div className="flex justify-center items-center h-56">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="text-center text-red-600 font-semibold py-10 flex items-center justify-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Impossible de charger le profil.
      </div>
    )
  }

  // Détermine les valeurs à afficher dans les inputs (profil ou édition)
  const formValues = editing ? editFormData : profile

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Mon Profil</h1>

      <div className="w-full mt-5 sm:max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Profile */}
        <div className="w-full lg:w-1/3 bg-gray-100 p-4 relative">
          <div className="relative w-full h-40 bg-gray-200 rounded-xl">
            <img
              src="/profile-cover.png"
              alt="Cover"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

         {/* Avatar avec icône caméra au survol */}
<div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md">
 {imageSrc ? (
  <img
    src={imageSrc}
    alt="Photo de profil"
    className="w-full h-full object-cover rounded-full border border-gray-200"
    referrerPolicy="no-referrer" 
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/default-avatar.png"; 
    }}
  />
) : (
  <User className="w-full h-full p-3 text-gray-400" />
)}


  {/* Overlay sombre avec icône caméra */}
  <label
    htmlFor="profileImage"
    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
  >
    <Camera className="text-white w-8 h-8" />
  </label>

  {/* Input caché pour upload */}
  <input
    type="file"
    
    accept="image/*"
    className="hidden"
     id="profileImage"
    name="profileImage"
    onChange={handleProfileUpload}
  />
</div>


          <div className="mt-20 px-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {profile.firstName && profile.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : 'Nom inconnu'}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
           

            <p className="mt-2 text-xs text-gray-400">
              Membre depuis : {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-2/3 p-6">
          <div className="flex justify-end">
  {!editing ? (
    <button
      className="mb-6 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition flex items-center gap-2"
      onClick={startEditing}
    >
      <Edit className="w-4 h-4" /> 
      Modifier
    </button>
  ) : null}
</div>



          <form onSubmit={handleFormSubmit} className="space-y-6">
        
    

            {/* Prénom */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formValues?.firstName ?? ''}
                onChange={handleInputChange}
                disabled={!editing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            {/* Nom */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formValues?.lastName ?? ''}
                onChange={handleInputChange}
                disabled={!editing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues?.email ?? ''}
                disabled={true}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           bg-gray-100 cursor-not-allowed sm:text-sm p-2"
              />
            </div>

            {/* Nationalité */}
            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700"
              >
                Nationalité
              </label>
              <select
                id="nationality"
                name="nationality"
                value={formValues?.nationality ?? ''}
                onChange={handleInputChange}
                disabled={!editing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              >
                <option value="">Sélectionner une nationalité</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Adresse */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formValues?.address ?? ''}
                onChange={handleInputChange}
                disabled={!editing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro de téléphone
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formValues?.phoneNumber ?? ''}
                onChange={handleInputChange}
                disabled={!editing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            {/* Boutons */}
            {editing && (
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Enregistrer
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
