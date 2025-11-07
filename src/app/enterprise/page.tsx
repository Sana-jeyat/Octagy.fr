'use client'

import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { 
  Building, 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Download,
  FileText,
  Calendar,
  Zap,
  Shield,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Star,
  Trophy,
  Brain,
  DollarSign,
  Globe,
  Briefcase,
  Settings,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  PlayCircle,
  BookOpen,
  GraduationCap,
  Flame,
  ChevronRight,
  Activity,
  RefreshCw,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  Database,
  Upload,
  Key,
  Monitor,
  Smartphone,
  Bell,
  X
} from 'lucide-react'
import PlansComponent from '@/components/PlansComponent';
import axiosInstance from '@/context/axiosInstance';
import EmployeesComponent from '@/components/EmployeesComponent';
import CompanyComponent from '@/components/CompanyComponent'; 

import AbonnementsComponent from '@/components/AbonnementsComponent';
import { AuthContext } from '@/context/AuthContext';
import DepartmentsSection from '@/components/DepartmentsSection';





interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  position: string;
  nationality:string;
  adresse:string;
  phone?: string;
 birthDate?:string;
  roles?: string;
  rpps:string;
  startDate?: string;
  isActive?: boolean;
  avatar: string;
  hours: number;
  socialSecurityNumber:string;
  progress: number;
  certificates: number;
  tokens: number;
  streak: number;
  lastActivity: string;
  courses: {
    name: string;
    progress: number;
    hours: number;
    partner: string;
  }[];
  objectives: {
    name: string;
    completed: boolean;
  }[];
}

type MyComponentProps = {
  employees: Employee[];
};

interface Plan {
  id: string;                
  name: string;             
  price: number;  
  duration: string;          
  period: string;         
  employees: string;         
  features: string[];        
  popular?: boolean;         
  color: string;             
}

interface Subscription {
  id: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  plan: {
    id: number;
    name: string;
    price: number;
    duration: string;
    employees: string;
    features: string[];
  };
  company?: {
    id: number;
    name: string;
  };
}



interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  siretNumber: string;
}

export default function EnterprisePage() {
  const { isAuthInitialized, isAuthenticated } = useContext(AuthContext);
 
  const [selectedPlan, setSelectedPlan] = useState('grow')
   const [plans, setPlans] = useState<Plan[]>([]);
    const [abonnements, setAbonnements] = useState<Subscription[]>([]);

  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [totalEmployees, setTotalEmployees] = useState(247)
  const [activeEmployees, setActiveEmployees] = useState(189)
  const [totalHours, setTotalHours] = useState(3456)
  const [avgProgress, setAvgProgress] = useState(73)
  const [tokensDistributed, setTokensDistributed] = useState(12847)
  const [certificatesIssued, setCertificatesIssued] = useState(156)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState('plans');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false); 

  const [employees, setEmployees] = useState<Employee[]>([]);
   const [companies, setCompanies] = useState<Company[]>([]);

   const [departments, setDepartments] = useState<any[]>([]);
const [loadingDepartments, setLoadingDepartments] = useState(true);
const [errorDepartments, setErrorDepartments] = useState<string | null>(null);


const [showAddModal, setShowAddModal] = useState(false);
const [newDeptName, setNewDeptName] = useState('');
const [newDeptDescription, setNewDeptDescription] = useState('');
const [adding, setAdding] = useState(false);
const [selectedCompany, setSelectedCompany] = useState<string>("");

 const [loadingCompanies, setLoadingCompanies] = useState(true);



useEffect(() => {
  const fetchSubscriptions = async () => {
    try {
      const res = await axiosInstance.get('/subscription/me');
      setAbonnements(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error('Erreur lors de la récupération des abonnements', err);
    } finally {
      setLoading(false);
    }
  };


  if (!abonnements.length) {
    fetchSubscriptions();
  }
}, []);


  
useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const response = await axiosInstance.get("/my-companies");
        setCompanies(response.data);
      } catch (err) {
        setError("Impossible de charger les entreprises.");
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  // 🧭 2. Charger les départements quand une entreprise est sélectionnée
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!selectedCompany) return;
      try {
        setLoadingDepartments(true);
        const response = await axiosInstance.get(`/companies/${selectedCompany}/departments`);
        setDepartments(response.data);
      } catch (err) {
        setError("Impossible de charger les départements.");
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, [selectedCompany]);



useEffect(() => {
  if (!isAuthInitialized) return;

  const fetchSubscriptionStatus = async () => {
    try {
      const { data } = await axiosInstance.get('/check-subscription');
      setHasSubscription(Boolean(data.hasSubscription));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'abonnement", error);
      setError("Erreur lors de la récupération de l'abonnement");
    }
  };

 
  if (isAuthenticated) {
    fetchSubscriptionStatus();
  } else {
    setHasSubscription(false);
  }
}, [isAuthInitialized, isAuthenticated]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTotalHours(prev => prev + Math.floor(Math.random() * 2))
      setAvgProgress(prev => Math.min(100, prev + Math.random() * 0.5))
      setTokensDistributed(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

   useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/plans');
        setPlans(response.data);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);



  const renderOverview = () => {
  return <DepartmentsSection />;
  };





  const renderCompany = () => {
  return <CompanyComponent />;
  };
   





const renderEmployees = () => {
  if (loading) return <div>Chargement...</div>;
  if (!employees) return <div>Aucun employé trouvé.</div>;
  return <EmployeesComponent />

};


const renderPlans = () => {
  return <PlansComponent plans={plans} />

};



const renderAbonnements = () => {
  return <AbonnementsComponent abonnements={abonnements} />;
};


  const renderReports = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
            Rapports & Analytics
          </h3>
          <div className="flex space-x-3">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">89%</div>
            <div className="text-sm text-blue-700">Taux de participation</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-600">4.7/5</div>
            <div className="text-sm text-green-700">Satisfaction moyenne</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-purple-700">Certificats obtenus</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">€12,450</div>
            <div className="text-sm text-orange-700">ROI formation</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-bold mb-4">Rapports disponibles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold mb-2">Rapport mensuel de progression</h5>
              <p className="text-sm text-gray-600 mb-3">Détail des heures, certifications et ROI par employé</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                Générer le rapport →
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold mb-2">Analyse des compétences</h5>
              <p className="text-sm text-gray-600 mb-3">Cartographie des compétences acquises par département</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                Générer le rapport →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solutions{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Entreprises
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Formez, financez, mesurez. Dashboard simple et reporting clair pour optimiser vos investissements formation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg">
                <div className="text-2xl font-bold text-green-600">{tokensDistributed.toLocaleString()}</div>
                <div className="text-sm text-green-700">Crédits iKNO distribués</div>
              </button>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Information importante</h4>
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Crédits de formation (iKNO) distribués aux employés.</strong>
                </p>
                <p className="text-xs text-blue-600">
                  Chaque employé peut convertir ses iKNO en $KNO après avoir validé son profil (KYC).
                  Ce processus reste personnel et individuel.
                </p>
              </div>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

     


<div className="bg-white shadow-sm sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <nav className="flex space-x-8">
      {[
        // Si l'utilisateur n'a PAS d'abonnement, on affiche l'onglet Abonnement
        ...(!hasSubscription ? [{ id: 'plans', name: 'Abonnement', icon: Building }] : []),
        // Si l'utilisateur a un abonnement, on affiche les autres onglets
        ...(hasSubscription
          ? [
            { id: 'overview', name: 'Dashboard RH', icon: BarChart3 },
               { id: 'abonnements', name: 'Abonnements', icon: Building },
             { id: 'entreprise', name: 'Entreprise', icon: Building },
              
              { id: 'employees', name: 'Employés', icon: Users },
              { id: 'reports', name: 'Rapports', icon: FileText },
           
            ]
          : []),
      ].map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        );
      })}
    </nav>
  </div>
</div>
{showAddModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
      <button
        onClick={() => setShowAddModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un Département</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-purple-500"
            placeholder="Ex: Informatique"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newDeptDescription}
            onChange={(e) => setNewDeptDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Décrivez le rôle du département..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={async () => {
              if (!newDeptName.trim()) return alert('Veuillez entrer un nom de département.');
              setAdding(true);
              try {
                await axiosInstance.post('/departments', {
                  name: newDeptName,
                  description: newDeptDescription || null,
                });
                setShowAddModal(false);
                setNewDeptName('');
                setNewDeptDescription('');

                // Rafraîchir la liste
                const response = await axiosInstance.get('/departments');
                setDepartments([
                  { id: 'all', name: 'Tous les départements' },
                  ...response.data
                ]);

              } catch (err) {
                console.error(err);
                alert('Erreur lors de l’ajout du département.');
              } finally {
                setAdding(false);
              }
            }}
            disabled={adding}
            className={`px-4 py-2 rounded-lg text-white ${
              adding ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {adding ? 'Ajout en cours...' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {activeTab === 'entreprise' && renderCompany()}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'plans' && renderPlans()}
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'abonnements' && renderAbonnements()}
      </div>

      {/* Employee Modal */}
      {showEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedEmployee.avatar}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedEmployee.firstName}</h3>
                    <p className="text-gray-600">{selectedEmployee.position}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEmployeeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedEmployee.hours}h</div>
                  <div className="text-sm text-blue-700">Heures totales</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedEmployee.progress}%</div>
                  <div className="text-sm text-green-700">Progression</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedEmployee.certificates}</div>
                  <div className="text-sm text-purple-700">Certificats</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{selectedEmployee.tokens}</div>
                  <div className="text-sm text-orange-700">$KNO gagnés</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4">Formations en cours</h4>
                  <div className="space-y-4">
                    {selectedEmployee.courses.map((course, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold">{course.name}</h5>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {course.partner}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{course.hours}h complétées</div>
                      </div>
                    ))}
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        
      )}
    </div>
    
  )
}


