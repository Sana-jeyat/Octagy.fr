'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Mail, Lock, Eye, EyeOff, User, Phone, Calendar, Upload, AlertCircle, CheckCircle, Globe, MapPin } from 'lucide-react'
import { toast } from 'react-toastify'; 
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    nationality: '',
    birthDate: '',
    gender: "",
    address: "",
    profilePhoto: null as File | null
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
   const [touched, setTouched] = useState<Record<string, boolean>>({});
  
 const [errors, setErrors] = useState<Record<string, string | string[]>>({});

  

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const nationalities = [
  "Afghane", "Albanaise", "Algérienne", "Allemande", "Américaine", "Andorrane", "Angolaise",
  "Antiguaise-et-Barbudienne", "Argentine", "Arménienne", "Australienne", "Autrichienne",
  "Azerbaïdjanaise", "Bahaméenne", "Bahreïnienne", "Bangladaise", "Barbadienne", "Belge",
  "Bélizienne", "Béninoise", "Bhoutanaise", "Biélorusse", "Birmane", "Bolivienne", "Bosnienne",
  "Botswanaise", "Brésilienne", "Britannique", "Brunéienne", "Bulgare", "Burkinabé", "Burundaise",
  "Cambodgienne", "Camerounaise", "Canadienne", "Cap-verdienne", "Centrafricaine", "Chilienne",
  "Chinoise", "Colombienne", "Comorienne", "Congolaise (RDC)", "Congolaise (RC)", "Costaricienne",
  "Croate", "Cubaine", "Danoise", "Djiboutienne", "Dominicaine", "Égyptienne", "Émiratie",
  "Équatorienne", "Érythréenne", "Espagnole", "Estonienne", "Éthiopienne", "Fidjienne",
  "Finlandaise", "Française", "Gabonaise", "Gambienne", "Géorgienne", "Ghanéenne", "Grenadienne",
  "Guatémaltèque", "Guinéenne", "Guinéenne-Bissau", "Guinéenne équatoriale", "Guyanienne",
  "Haïtienne", "Hellénique", "Hondurienne", "Hongroise", "Indienne", "Indonésienne", "Irakienne",
  "Iranienne", "Irlandaise", "Islandaise", "Israélienne", "Italienne", "Ivoirienne", "Jamaïcaine",
  "Japonaise", "Jordanienne", "Kazakhstanaise", "Kényane", "Kirghize", "Kiribatienne", "Koweïtienne",
  "Laotienne", "Lesothane", "Lettonne", "Libanaise", "Libérienne", "Libyenne", "Liechtensteinoise",
  "Lituanienne", "Luxembourgeoise", "Macédonienne", "Malaisienne", "Malawienne", "Maldivienne",
  "Malgache", "Malienne", "Maltaise", "Marocaine", "Marshallienne", "Mauricienne", "Mauritanienne",
  "Mexicaine", "Micronésienne", "Moldave", "Monégasque", "Mongole", "Monténégrine", "Mozambicaine",
  "Namibienne", "Nauruane", "Népalaise", "Nicaraguayenne", "Nigérienne", "Nigériane", "Norvégienne",
  "Néo-zélandaise", "Omanaise", "Ougandaise", "Ouzbèke", "Pakistanaise", "Palestinienne",
  "Panaméenne", "Papouasienne", "Paraguayenne", "Néerlandaise", "Péruvienne", "Philippine",
  "Polonaise", "Portugaise", "Qatarienne", "Roumaine", "Russe", "Rwandaise", "Saint-Lucienne",
  "Salvadorienne", "Samoane", "Sénégalaise", "Serbe", "Seychelloise", "Sierra-léonaise",
  "Singapourienne", "Slovaque", "Slovène", "Somalienne", "Soudanaise", "Sri-lankaise", "Sud-Africaine",
  "Sud-Coréenne", "Sud-Soudanaise", "Suédoise", "Suisse", "Surinamaise", "Syrienne", "Tadjike",
  "Tanzanienne", "Tchadienne", "Tchèque", "Thaïlandaise", "Togolaise", "Tongienne", "Trinidadienne",
  "Tunisienne", "Turkmène", "Turque", "Tuvaluane", "Ukrainienne", "Uruguayenne", "Vanuatuane",
  "Vaticane", "Vénézuélienne", "Vietnamienne", "Yéménite", "Zambienne", "Zimbabwéenne",
].sort();

const validateField = (field: string, value: string) => {
  let error: string | string[] = ''; 



  switch (field) {
    case 'email':
      if (!value) error = "L'email est requis";
      else if (!validateEmail(value)) error = "Format d'email invalide";
      break;

    case 'password':
      const passwordErrors = [];
      if (!value) passwordErrors.push("Le mot de passe est requis");
      else {
        if (value.length < 8) passwordErrors.push("Au moins 8 caractères");
        if (!/[A-Z]/.test(value)) passwordErrors.push("Au moins une majuscule");
        if (!/[a-z]/.test(value)) passwordErrors.push("Au moins une minuscule");
        if (!/[0-9]/.test(value)) passwordErrors.push("Au moins un chiffre");
        if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) passwordErrors.push("Au moins un caractère spécial");
      }

      if (passwordErrors.length > 0) error = passwordErrors;

      break;

    case 'confirmPassword':
      if (!value) error = "Veuillez confirmer votre mot de passe";
      else if (value !== formData.password) error = "Les mots de passe ne correspondent pas";
      break;

    case 'firstName':
      if (!value) error = "Le prénom est requis";
      else if (value.trim().length < 2) error = "Le prénom doit contenir au moins 2 caractères";
      break;

    case 'lastName':
      if (!value) error = "Le nom est requis";
      else if (value.trim().length < 2) error = "Le nom doit contenir au moins 2 caractères";
      break;

    case 'phone':
      if (!value) error = "Le téléphone est requis";
      else if (!validatePhone(value)) error = "Format de téléphone invalide";
      break;

    case 'birthDate':
      if (!value) error = "La date de naissance est requise";
      else if (!validateBirthDate(value)) error = "Vous devez avoir entre 13 et 120 ans";
      break;

    case 'nationality':
      if (!value) error = "La nationalité est requise";
      break;
      case "address":
        if (!value) error = "L’adresse est requise";
        break;
         case "gender":
        if (!value) error = "Le genre est requis";
        break;
  }

  setErrors((prev) => ({ ...prev, [field]: error }));
};


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validateBirthDate = (date: string) => {
    const today = new Date()
    const birthDate = new Date(date)
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= 13 && age <= 120
  }

  
  

  const handleInputChange = (field: string, value: string) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
  validateField(field, value); 
};


  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setErrors(prev => ({ ...prev, profilePhoto: 'La photo ne doit pas dépasser 5MB' }))
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePhoto: 'Veuillez sélectionner une image valide' }))
        return
      }

      setFormData(prev => ({ ...prev, profilePhoto: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      
      // Clear error
      if (errors.profilePhoto) {
        setErrors(prev => ({ ...prev, profilePhoto: '' }))
      }
    }
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});
  setIsLoading(true);

  const newErrors: Record<string, string | string[]> = {};

  // Validation email
  if (!formData.email) newErrors.email = "L'email est requis";
  else if (!validateEmail(formData.email)) newErrors.email = "Format d'email invalide";

  // Validation password détaillée
  const passwordErrors: string[] = [];
  if (!formData.password) passwordErrors.push("Le mot de passe est requis");
  else {
    if (formData.password.length < 8) passwordErrors.push("Au moins 8 caractères");
    if (!/[A-Z]/.test(formData.password)) passwordErrors.push("Au moins une majuscule");
    if (!/[a-z]/.test(formData.password)) passwordErrors.push("Au moins une minuscule");
    if (!/[0-9]/.test(formData.password)) passwordErrors.push("Au moins un chiffre");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(formData.password)) passwordErrors.push("Au moins un caractère spécial");
  }
  if (passwordErrors.length > 0) newErrors.password = passwordErrors;

  // Confirmation mot de passe
  if (!formData.confirmPassword) newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
  else if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

  // Prénom
  if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
  else if (formData.firstName.trim().length < 2) newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";

  // Nom
  if (!formData.lastName) newErrors.lastName = "Le nom est requis";
  else if (formData.lastName.trim().length < 2) newErrors.lastName = "Le nom doit contenir au moins 2 caractères";

  // Téléphone
  if (!formData.phone) newErrors.phone = "Le téléphone est requis";
  else if (!validatePhone(formData.phone)) newErrors.phone = "Format de téléphone invalide";

  // Nationalité
  if (!formData.nationality) newErrors.nationality = "La nationalité est requise";

  // Genre
  if (!formData.gender) newErrors.gender = "Le genre est requis";

  // Adresse
  if (!formData.address) newErrors.address = "L'adresse est requise";

  // Date de naissance
  if (!formData.birthDate) newErrors.birthDate = "La date de naissance est requise";
  else if (!validateBirthDate(formData.birthDate))
    newErrors.birthDate = "Vous devez avoir entre 13 et 120 ans";

  // Photo profil
  if (!formData.profilePhoto) newErrors.profilePhoto = "Une photo de profil est requise";

  // Si erreurs, on stoppe
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsLoading(false);
    return;
  }

  try {
    // ✅ Préparation FormData pour envoi multipart
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phone", formData.phone);
    data.append("nationality", formData.nationality);
    data.append("birthDate", formData.birthDate);
    data.append("gender", formData.gender);   // ✅ ajouté
    data.append("address", formData.address); // ✅ ajouté
    if (formData.profilePhoto) data.append("profilePhoto", formData.profilePhoto);

    // Pour debug : voir les données envoyées
    console.log([...data.entries()]);

    const response = await fetch('${process.env.APP_API_URL}/register', {
      method: "POST",
      body: data, // ✅ pas de JSON.stringify !
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.error?.toLowerCase().includes("email")) {
        setErrors({ email: "Cet email est déjà utilisé" });
        toast.error("Cet email est déjà utilisé");
      } else {
        setErrors({ general: result.error || "Erreur lors de l'inscription." });
        toast.error(result.error || "Erreur lors de l'inscription.");
      }
      setIsLoading(false);
      return;
    }

    toast.success("Inscription réussie ! Redirection...");
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      nationality: '',
      birthDate: '',
      profilePhoto: null,
      gender: '',
      address: '',
    });
    setErrors({});
    setIsLoading(false);

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    setErrors({ general: "Erreur réseau ou serveur. Veuillez réessayer." });
    toast.error("Erreur réseau ou serveur. Veuillez réessayer.");
    setIsLoading(false);
  }
};




  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-6">
      <div className="w-full max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-100 h-10 rounded-xl overflow-hidden">
  <img src="/logo-octagy.png" alt="Logo" className="w-52 h-16 object-cover" />
  
</div>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
            <p className="text-gray-600">Rejoignez la communauté d'OCTAGY</p>
          </div>

     

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- Genre --- */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold mb-2 text-center">
            Genre *
          </label>
          <div className="flex items-center justify-center space-x-6">
            {["M", "F"].map((val) => (
              <label key={val} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={val}
                  checked={formData.gender === val}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  
                />
                <span>{val === "M" ? "Homme" : "Femme"}</span>
              </label>
            ))}
          </div>
          {touched.gender && errors.gender && (
            <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
          )}
        </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@company.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
               {errors.password && (
  Array.isArray(errors.password) ? (
    <ul className="mt-1 text-sm text-red-600 space-y-1">
      {errors.password.map((err, i) => (
        <li key={i} className="flex items-center space-x-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{err}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
      <AlertCircle className="w-3 h-3 shrink-0" />
      <span>{errors.password}</span>
    </p>
  )
)}

              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Jean"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.firstName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Dupont"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.lastName}</span>
                  </p>
                )}
              </div>
            </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* --- Téléphone --- */}
  <div>
    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
      Téléphone *
    </label>
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        placeholder="+33 6 12 34 56 78"
        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
          errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
        }`}
      />
    </div>
    {errors.phone && (
      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
        <AlertCircle className="w-3 h-3" />
        <span>{errors.phone}</span>
      </p>
    )}
  </div>

  {/* --- Adresse --- */}
  <div>
    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
      Adresse *
    </label>
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        id="address"
        type="text"
        value={formData.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
        placeholder="1 rue des Lilas, Cergy 95000"
        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
          errors.address ? "border-red-300 bg-red-50" : "border-gray-300"
        }`}
      />
    </div>
    {errors.address && (
      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
        <AlertCircle className="w-3 h-3" />
        <span>{errors.address}</span>
      </p>
    )}
  </div>
</div>



            

            {/* Nationality and Birth Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nationality" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationalité *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors appearance-none bg-white ${
                      errors.nationality ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">-- Nationalité --</option>
                    {nationalities.map((nationality) => (
                      <option key={nationality} value={nationality}>
                        {nationality}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.nationality && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.nationality}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.birthDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.birthDate}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-semibold text-gray-700 mb-2">
                Photo de profil *
              </label>
              <div className="flex items-center space-x-4">
                {photoPreview ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <label
                    htmlFor="profilePhoto"
                    className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ${
                      errors.profilePhoto ? 'border-red-300' : ''
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choisir une photo
                  </label>
                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.profilePhoto ? formData.profilePhoto.name : "Aucun fichier n'a été sélectionné"}
                  </p>
                </div>
              </div>
              {errors.profilePhoto && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.profilePhoto}</span>
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                J'accepte les{' '}
                <Link href="/terms" className="text-blue-600 hover:text-purple-700 font-medium">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-purple-700 font-medium">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 OCTAGY. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}