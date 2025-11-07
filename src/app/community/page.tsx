

'use client'

import { useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link'
import axiosInstance from '@/context/axiosInstance';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Trophy, 
  Star, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Award,
  Crown,
  Flame,
  Target,
  Calendar,
  Bell,
  UserPlus,
  Settings,
  Send,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Zap,
  Brain,
  Shield,
  DollarSign,
  Stethoscope,
  Globe,
  BookOpen,
  Clock,
  Eye,
  ChevronRight,
  Trash ,
  Layers, Inbox ,ArrowRight
} from 'lucide-react'
import React from 'react';
interface Forum {
  title: string;
  icon: any;
  id: string;
  name: string;
  
  color: string;
  members: number;
  posts: number;
  description: string;
  lastActivity: string;
  trending: boolean;
}
interface Author {
  id: number;
  name: string;
  image: string;
}

interface Reply {
  isEditing: any;
  id: number;
  content: string;
  createdAt: string;
  author: Author;
}

interface Post {
  likedByUser: any;
  tags: any;
  timeAgo: ReactNode;
  author: any;
  likes?: number;
  views: number;
  content: string | undefined;
  title: string | undefined;
  id: number;
  replies: Reply[];

}

interface Props {
  post: Post;
}
interface User {
  rank: number;
  name: string;
  avatar: React.ReactNode | string;
  kno: number;
  streak?: number | null;
}

interface Leaderboard {
  title: string;
  type: 'individual' | 'school';
  users: User[];
}


export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('forums')

  const [showNewPost, setShowNewPost] = useState(false)

  const [forums, setForums] = useState<Forum[]>([])
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostTitle, setNewPostTitle] = useState('')
  
  
 
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  
  const [currentUser, setCurrentUser] = useState<Author | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState<number | null>(null);
  // Exemple d’état unifié
const [modalType, setModalType] = useState<"reply" | "post" | null>(null)
const [itemToDelete, setItemToDelete] = useState<number | null>(null)



const [leaderboards, setLeaderboards] = useState<any[]>([]);




 const [newPostTags, setNewPostTags] = useState('')


const getFullAvatarUrl = (imageUrl?: string | null): string => {
  if (!imageUrl) return "/default-avatar.png";
  if (imageUrl.startsWith("data:image")) return imageUrl;
  if (/^https?:\/\//.test(imageUrl)) return imageUrl;
  return `https://auth.kno.academy/be${imageUrl}`;
};


  const challenges = [
    {
      id: 1,
      title: 'Défi Sciences de la Semaine',
      description: 'Complétez 5 cours de sciences et gagnez des récompenses exclusives',
      participants: 1247,
      timeLeft: '3 jours',
      reward: 150,
      progress: 67,
      type: 'weekly',
      icon: '🔬'
    },
    {
      id: 2,
      title: 'Marathon Communautaire',
      description: 'Objectif collectif : 10,000 heures d\'apprentissage cette semaine',
      participants: 3456,
      timeLeft: '5 jours',
      reward: 200,
      progress: 78,
      type: 'community',
      icon: '🏃‍♂️'
    },
    {
      id: 3,
      title: 'Quiz Master Challenge',
      description: 'Réussissez 20 quiz parfaits ce mois-ci',
      participants: 892,
      timeLeft: '12 jours',
      reward: 300,
      progress: 45,
      type: 'monthly',
      icon: '🧠'
    }
  ]

  const friends = [
    { name: 'Alex Thompson', avatar: '👨‍💻', status: 'online', currentCourse: 'Blockchain Basics' },
    { name: 'Marie Dubois', avatar: '👩‍🎓', status: 'learning', currentCourse: 'IA Médicale' },
    { name: 'Jean Martin', avatar: '👨‍🔬', status: 'offline', currentCourse: null },
    { name: 'Sophie Chen', avatar: '👩‍💼', status: 'online', currentCourse: 'Marketing Digital' }
  ]

  const clubs = [
    {
      name: 'Pharmaciens Connectés',
      members: 234,
      avatar: '💊',
      description: 'Club privé pour les professionnels de la pharmacie',
      isPrivate: true,
      isMember: true
    },
    {
      name: 'Crypto Enthusiasts',
      members: 567,
      avatar: '₿',
      description: 'Passionnés de cryptomonnaies et blockchain',
      isPrivate: false,
      isMember: true
    },
    {
      name: 'IA & Futur',
      members: 892,
      avatar: '🤖',
      description: 'Discussions sur l\'intelligence artificielle',
      isPrivate: false,
      isMember: false
    }
  ]

const formatAvatar = (imageUrl?: string | null) => {
  // 1️⃣ Si pas d'image -> avatar par défaut
  if (!imageUrl) {
    return (
      <img
        src="/default-avatar.png"
        alt="default avatar"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  // 2️⃣ Si image base64 (data:image/png;base64,...)
  if (imageUrl.startsWith("data:image")) {
    return (
      <img
        src={imageUrl}
        alt="avatar"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  // 3️⃣ Si c’est déjà une URL complète (http ou https)
  if (/^https?:\/\//.test(imageUrl)) {
    return (
      <img
        src={imageUrl}
        alt="avatar"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }
}

useEffect(() => {
  fetch('https://auth.kno.academy/be/api/user/top-performers')
    .then((res) => res.json())
    .then((data) => {
      const topUsers = data.topUsers || [];

      const formattedUsers = topUsers.map((user: { firstName: any; lastName: any; profileImage: string | undefined; knoTokens: any; }, index: number) => {
        const formattedUser = {
          rank: index + 1, 
          name: `${user.firstName} ${user.lastName}`,
          avatar: formatAvatar(user.profileImage),
          kno: user.knoTokens,
          streak: null 
        };

     
        console.log('formattedUser:', formattedUser);
        console.log('user.rank:', formattedUser.rank, 'Type:', typeof formattedUser.rank);

        return formattedUser;
      });

      setLeaderboards([
        {
          title: 'Top Performeurs Quiz',
          type: 'individual',
          users: formattedUsers
        }
      ]);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données:", error);
    });
}, []);



useEffect(() => {
  // 🔹 Récupération de l'utilisateur depuis localStorage (pour affichage rapide)
  const userData = localStorage.getItem('user')
  if (userData) {
    setCurrentUser(JSON.parse(userData))
  }
}, [])

useEffect(() => {
  // 🔹 Chargement de la liste des forums
  const fetchForums = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axiosInstance.get('/forum')
      setForums(data)
    } catch (err: any) {
      console.error('Erreur chargement forums:', err)
      setError(err.response?.data?.message || 'Erreur lors du chargement des forums')
      toast.error('Erreur lors du chargement des forums')
    } finally {
      setLoading(false)
    }
  }

  fetchForums()
}, [])

useEffect(() => {
  // 🔹 Chargement des posts du forum sélectionné
  if (!selectedForum) return

  const fetchPosts = async () => {
    setLoadingPosts(true)
    setError(null)

    try {
      const { data } = await axiosInstance.get(`/forum/${selectedForum.id}`)
      setPosts(data.posts)
    } catch (err: any) {
      console.error('Erreur chargement posts:', err)
      setError(err.response?.data?.message || 'Erreur lors du chargement des posts')
      toast.error('Erreur lors du chargement des posts')
    } finally {
      setLoadingPosts(false)
    }
  }

  fetchPosts()
}, [selectedForum])



const handleAddPost = async () => {
  if (!selectedForum) return toast.error('Sélectionnez un forum.')
  if (!newPostTitle.trim()) return toast.error('Le titre du post est vide.')
  if (!newPostContent.trim()) return toast.error('Le contenu du post est vide.')

  try {
    // ✅ Création du post
    await axiosInstance.post(`/forum/${selectedForum.id}/post`, {
      title: newPostTitle,
      content: newPostContent,
      tags: newPostTags.split(',').map(tag => tag.trim()),
    })

    // ✅ Nettoyage des champs du formulaire
    setNewPostTitle('')
    setNewPostContent('')
    setNewPostTags('')

    // ✅ Recharge des posts du forum sélectionné
    const { data } = await axiosInstance.get(`/forum/${selectedForum.id}`)
    setPosts(data.posts)

    toast.success('Post ajouté avec succès 🎉')
  } catch (error: any) {
    console.error('Erreur création post :', error)
    toast.error(error.response?.data?.message || 'Erreur lors de la création du post.')
  }
}

const handleAddReply = async (postId: number, content: string) => {
  if (!content.trim()) return toast.error("Le contenu de la réponse est vide.")

  try {
    // ✅ Création de la réponse
    await axiosInstance.post(`/forum/post/${postId}/reply`, { content })

    // ✅ Rechargement du forum pour afficher la nouvelle réponse
    const { data } = await axiosInstance.get(`/forum/${selectedForum?.id}`)
    setPosts(data.posts)

    toast.success('Réponse ajoutée avec succès 💬')
  } catch (error: any) {
    console.error('Erreur ajout réponse :', error)
    toast.error(error.response?.data?.message || 'Erreur lors de la création de la réponse.')
  }
}

const handleDeleteReply = async (replyId: number) => {
  try {
    // ✅ Suppression de la réponse
    await axiosInstance.delete(`/forum/post/reply/${replyId}`)

    // ✅ Mise à jour du state local sans refetch global
    setPosts((prevPosts) =>
      prevPosts.map((post) => ({
        ...post,
        replies: post.replies.filter((reply) => reply.id !== replyId),
      }))
    )

    toast.success('Réponse supprimée avec succès 🗑️')
  } catch (error: any) {
    console.error('Erreur suppression reply :', error)
    toast.error(error.response?.data?.message || 'Erreur lors de la suppression de la réponse.')
  }
}

// Fonction pour changer le contenu du commentaire pendant l'édition
const handleContentChange = (id: number, newContent: string) => {
  setPosts(posts.map(post => {
    if (post.id === id) {
      post.replies = post.replies.map(reply =>
        reply.id === id ? { ...reply, content: newContent } : reply
      );
    }
    return post;
  }));
};



const handleSaveEdit = async (id: number) => {
  // On récupère la réponse modifiée dans ton state
  const updatedReply = posts
    .flatMap((post) => post.replies)
    .find((reply) => reply.id === id)

  if (!updatedReply) {
    toast.error('Réponse introuvable.')
    return
  }

  try {
    // ✅ Appel API PUT via axiosInstance (cookie HttpOnly)
    const { data: newReply } = await axiosInstance.put(`/forum/reply/${id}`, {
      content: updatedReply.content,
    })

    // ✅ Met à jour le state local
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === newReply.postId) {
          return {
            ...post,
            replies: post.replies.map((reply) =>
              reply.id === id ? newReply : reply
            ),
          }
        }
        return post
      })
    )

    toast.success('Réponse mise à jour avec succès.')
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la réponse :', error)

    if (error.response?.status === 401) {
      toast.error('Session expirée. Veuillez vous reconnecter.')
    } else {
      toast.error("Erreur lors de la mise à jour de la réponse.")
    }
  }
}


// Fonction pour annuler l'édition d'un commentaire
const handleCancelEdit = (id: number) => {
  setPosts(posts.map(post => {
    if (post.id === id) {
      post.replies = post.replies.map(reply =>
        reply.id === id ? { ...reply, isEditing: false } : reply
      );
    }
    return post;
  }));
};

const handleDeleteClick = (type: "reply" | "post", id: number) => {
  setModalType(type);
  setItemToDelete(id);
};



const handleDeletePost = async (postId: number) => {
  try {
    //  Appel API DELETE via axiosInstance
    await axiosInstance.delete(`/forum/post/${postId}`)

    //  Met à jour le state local
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId))

    toast.success('Post supprimé avec succès !')
  } catch (error: any) {
    console.error('Erreur suppression :', error)

    if (error.response?.status === 401) {
      toast.error('Session expirée. Veuillez vous reconnecter.')
    } else {
      toast.error('Erreur lors de la suppression du post')
    }
  }
}

const handleToggleLike = async (postId: number) => {
  try {
    // ✅ Appel de l’API avec ton instance axios configurée
    const { data } = await axiosInstance.post(`/forum/post/${postId}/like`)

    toast.success(data.message || 'Action réussie 👍')

    // 🔁 Met à jour le post dans le state (likes + likedByUser)
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: data.likes, likedByUser: data.liked }
          : post
      )
    )
  } catch (error: any) {
    console.error('Erreur lors du like :', error)

    if (error.response?.status === 401) {
      toast.error('Session expirée. Veuillez vous reconnecter.')
    } else {
      toast.error(error.response?.data?.error || 'Erreur lors du like')
    }
  }
}

const colors = [
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-yellow-400 to-yellow-600"
];

const getColorForForum = (forum: Forum) => {
  // simple hash en fonction de l'id ou du titre
  const index = Number(forum.id) % colors.length;

  return colors[index];
};

const forumIcons = [
  BookOpen,
  MessageCircle,
  Users,
  Layers,
  Inbox
];

const getIconForForum = (forum: Forum) => {
  const index = Number(forum.id) % forumIcons.length;


  return forumIcons[index];
};

  
  const renderForums = () => (
    
     <div className="space-y-6">
    

      {/* Forums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forums.map((forum) => {
          
       const Icon = forum.icon || getIconForForum(forum);

          return (
            <div
              key={forum.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-300"
              onClick={() => setSelectedForum(forum)}
            >
              <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getColorForForum(forum)} rounded-xl flex items-center justify-center`}>

                 
               {Icon ? <Icon className="w-6 h-6 text-primary" /> : <span>🏷️</span>}

                </div>
                
<div className="flex flex-col items-start space-y-2">
  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-200 to-orange-300 text-orange-800 text-xs font-semibold rounded-full shadow-sm">
    <TrendingUp className="w-4 h-4 mr-1" />
    Populaire
  </span>

<button
  onClick={() => setSelectedForum(forum)}
  className="text-xs text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full transition-all flex items-center space-x-1 mx-auto"
>
  
  <ArrowRight className="w-4 h-4" />
</button>

</div>



                
              </div>


              <h3 className="text-lg font-bold text-gray-900 mb-2">{forum.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{forum.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                   <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {forum.members?.toLocaleString()}
                  </span> 
                   <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {forum.posts?.toLocaleString()}
                  </span> 
                </div>
                <span className="text-green-600 font-medium">
                  Actif il y a {forum.lastActivity}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Posts Récents */}
      {selectedForum && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900"> {selectedForum.title}</h3>
            <button
              onClick={() => setShowNewPost(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Post</span>
            </button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <>
              <div key={post.id} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                <div className="flex items-start space-x-4">
                <div className="w-24 h-24 overflow-hidden rounded-full">
  <img
          src={getFullAvatarUrl(post.author?.image)}
          alt={post.author?.firstName || "Author"}
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.src = "/default-avatar.png")} // fallback si l’image ne charge pas
        />
  
</div>


                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-bold text-gray-900">{post.author?.name}</h4>
                      
                     
                      <span className="text-gray-500 text-sm">• {post.timeAgo}</span>
                      
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                          🔥 Trending
                        </span>
                  
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                      {post.title}
                    </h3>

                    <p className="text-gray-700 mb-4">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                       
                          
  <button
  className={`flex items-center space-x-2 transition-colors cursor-pointer ${
    post.likedByUser ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
  }`}
  onClick={() => handleToggleLike(post.id)}
>
  <Heart
    className={`w-5 h-5 transition-colors ${
      post.likedByUser ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'
    }`}
  />
  <span className="text-sm">{post.likes}</span>
</button>



                       <button
  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
  onClick={async () => {
    const replyText = replyContent[post.id]

    if (!replyText || !replyText.trim()) {
      toast.warning('Le contenu de la réponse est vide')
      return
    }

    try {
      //  Envoi de la réponse via Axios (cookie HttpOnly géré automatiquement)
      const { data } = await axiosInstance.post(
        `/forum/post/${post.id}/reply`,
        { content: replyText }
      )

      // 🔁 Mise à jour des posts avec les nouvelles réponses
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, replies: data.replies } : p
        )
      )

      toast.success('Réponse ajoutée avec succès ✅')
    } catch (err) {
      console.error('Erreur lors de l’ajout de la réponse :', err)
      toast.error('Erreur lors de l’ajout de la réponse')
    }
  }}
>
  <Reply className="w-4 h-4" />
  <span className="text-sm">{post.replies?.length}</span>
</button>

                       
                      </div>
                      
                     <div className="flex flex-col space-y-2 text-right">
  <button
    onClick={() => {
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: post.content,
          url: window.location.href,
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        alert("Lien copié !");
      }
    }}
    className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors"
  >
    <Share2 className="w-4 h-4" />
    <span className="text-sm">Partager</span>
  </button>

  {post.author?.id === currentUser?.id && (
   <button
  onClick={() => handleDeleteClick("post", post.id)}
  className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
>
  <Trash className="w-4 h-4" />
  <span className="text-sm">Supprimer</span>
</button>

  )}
</div>




                    </div>
                  </div>
                </div>
              </div>





{/* Liste des replies */}

<div className="mt-4 border-t border-gray-200 pt-4">
  {post.replies?.length > 0 ? (
    post.replies.map((reply: Reply) => {
      console.log(reply);
      return (
        <div key={reply.id} className="mb-3 flex space-x-3">
          <img
            src={
              reply.author?.image?.startsWith('http')
                ? reply.author.image
                : '/default-avatar.png'
            }
            alt={reply.author?.name}
            className="w-8 h-8 rounded-full object-cover"
          />

          <div>
            {/* Assure-toi que reply.author?.name existe avant d'afficher */}
            <div className="text-sm font-semibold">{reply.author?.name}</div>

            {/* Si l'état de modification est activé, afficher un champ de saisie */}
            {reply.isEditing ? (
              <div>
                <textarea
                  value={reply.content}
                  onChange={(e) =>
                    handleContentChange(reply.id, e.target.value)
                  }
                  className="w-full text-gray-700 text-sm p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => handleSaveEdit(reply.id)}
                  >
                    Sauvegarder
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                    onClick={() => handleCancelEdit(reply.id)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-gray-700 text-sm">{reply.content}</div>
                <div className="text-xs text-gray-400">{reply.createdAt}</div>

                {/* Boutons Modifier et Supprimer */}
                {reply.author?.id === currentUser?.id && (
                  <div className="mt-2 flex space-x-2 text-xs text-gray-500">
                    {/* <button
                      className="hover:text-blue-500"
                      onClick={() => handleEditClick(reply.id)}
                    >
                      Modifier
                    </button> */}
                    <button
  className="hover:text-red-500"
  onClick={() => handleDeleteClick("reply", reply.id)}
>
  Supprimer
</button>

                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-gray-500 text-sm">Aucune réponse pour l'instant.</p>
  )}


{modalType && itemToDelete !== null && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h4 className="text-2xl font-semibold text-center text-gray-800">
        Confirmer la suppression
      </h4>
      <p className="text-gray-600 text-center mt-2">
        {modalType === "reply"
          ? "Êtes-vous sûr de vouloir supprimer cette réponse ?"
          : "Êtes-vous sûr de vouloir supprimer ce post ?"}
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => {
            if (modalType === "reply") {
              handleDeleteReply(itemToDelete);
            } else {
              handleDeletePost(itemToDelete);
            }
            // Fermer le modal
            setModalType(null);
            setItemToDelete(null);
          }}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-200"
        >
          Oui
        </button>
        <button
          onClick={() => {
            setModalType(null);
            setItemToDelete(null);
          }}
          className="bg-gray-200 px-6 py-3 rounded-full hover:bg-gray-300 transition-all duration-200"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}




  {/* Formulaire pour ajouter une reply */}
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (!replyContent[post.id]?.trim()) {
        alert("Le contenu de la réponse est vide");
        return;
      }
      handleAddReply(post.id, replyContent[post.id]);
      setReplyContent(prev => ({ ...prev, [post.id]: '' }));
    }}
    className="mt-2 flex space-x-2"
  >
    <input
      type="text"
      value={replyContent[post.id] || ''}
      onChange={e => setReplyContent(prev => ({ ...prev, [post.id]: e.target.value }))}
      placeholder="Répondre..."
      className="flex-1 p-2 border rounded"
    />
    <button
      type="submit"
      className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700"
    >
      Répondre
    </button>
  </form>
</div>




</>
              
            ))}
          </div>




          {/* Nouveau Post Modal ou Section */}
          {showNewPost && (
  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
    {/* Champ Titre */}
    <input
      type="text"
      value={newPostTitle}
      onChange={(e) => setNewPostTitle(e.target.value)}
      className="w-full p-2 border rounded-md mb-2"
      placeholder="Titre du post"
    />

    {/* Champ Contenu */}
    <textarea
      value={newPostContent}
      onChange={(e) => setNewPostContent(e.target.value)}
      className="w-full p-2 border rounded-md"
      placeholder="Écrire un nouveau post..."
    />

    {/* (Optionnel) Champ Tags */}
    
    <input
      type="text"
      value={newPostTags}
      onChange={(e) => setNewPostTags(e.target.value)}
      className="w-full p-2 border rounded-md mt-2"
      placeholder="Tags (séparés par des virgules)"
    />
    

    <div className="mt-2 flex justify-end space-x-2">
      <button
        onClick={() => setShowNewPost(false)}
        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
      >
        Annuler
      </button>
      <button
        onClick={() => {
          handleAddPost()
          setShowNewPost(false)
        }}
        className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
      >
        Publier
      </button>
    </div>
  </div>
)}

        </div>
      )}
    </div>
  )






  const renderLeaderboards = () => (
    <div className="space-y-8">
      {leaderboards.map((leaderboard, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            {leaderboard.title}
          </h3>

          <div className="space-y-4">
            {leaderboard.users.map((user: { rank: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; avatar: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; streak: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; kno: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }, userIndex: React.Key | null | undefined) => (
              <div
                key={userIndex}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 `}
              >
                <div className="flex items-center space-x-4">
                  <div
  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
    Number(user.rank) === 1
      ? 'bg-yellow-400 text-yellow-900'
      : Number(user.rank) === 2
      ? 'bg-gray-300 text-gray-700'
      : Number(user.rank) === 3
      ? 'bg-orange-400 text-orange-900'
      : 'bg-gray-200 text-gray-600'
  }`}
>
  {user.rank}
</div>

                  <div className="text-2xl">{user.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    {leaderboard.type === 'individual' && 'streak' in user && user.streak && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <Flame className="w-3 h-3 text-orange-500 mr-1" />
                        {user.streak} jours
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">{user.kno.toLocaleString()} $KNO</div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );



  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{challenge.icon}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                challenge.type === 'weekly' ? 'bg-blue-100 text-blue-700' :
                challenge.type === 'monthly' ? 'bg-purple-100 text-purple-700' :
                'bg-green-100 text-green-700'
              }`}>
                {challenge.type === 'weekly' ? 'Hebdomadaire' : 
                 challenge.type === 'monthly' ? 'Mensuel' : 'Communautaire'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progression</span>
                <span className="font-semibold">{challenge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                <Users className="w-4 h-4 inline mr-1" />
                {challenge.participants.toLocaleString()} participants
              </div>
              <div className="text-sm text-orange-600 font-semibold">
                <Clock className="w-4 h-4 inline mr-1" />
                {challenge.timeLeft}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-green-600 font-bold">
                +{challenge.reward} $KNO
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 text-sm">
                Participer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSocial = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Friends */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <UserPlus className="w-5 h-5 mr-2 text-purple-600" />
            Amis ({friends.length})
          </h3>
          <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors text-sm">
            Ajouter
          </button>
        </div>
        
        <div className="space-y-4">
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="text-2xl">{friend.avatar}</div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    friend.status === 'online' ? 'bg-green-400' :
                    friend.status === 'learning' ? 'bg-blue-400' :
                    'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{friend.name}</div>
                  {friend.currentCourse && (
                    <div className="text-sm text-gray-500">
                      📚 {friend.currentCourse}
                    </div>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-purple-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Clubs */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-600" />
            Clubs & Groupes
          </h3>
          <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors text-sm">
            Créer
          </button>
        </div>
        
        <div className="space-y-4">
          {clubs.map((club, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{club.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{club.name}</span>
                      {club.isPrivate && <Shield className="w-3 h-3 text-gray-500" />}
                    </div>
                    <div className="text-sm text-gray-500">
                      {club.members} membres
                    </div>
                  </div>
                </div>
                {club.isMember ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    Membre
                  </span>
                ) : (
                  <button className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs hover:bg-purple-600 transition-colors">
                    Rejoindre
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-600">{club.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Communauté</h1>
            <p className="text-xl text-purple-100">
              Forums thématiques, classements et partage de badges. Simple et social !
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'forums', name: 'Forums', icon: MessageCircle },
              { id: 'leaderboards', name: 'Classements', icon: Trophy },
              { id: 'challenges', name: 'Sidequests', icon: Target },
              { id: 'social', name: 'Clubs', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon
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
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {activeTab === 'forums' && renderForums()}
        {activeTab === 'leaderboards' && renderLeaderboards()}
        {activeTab === 'challenges' && renderChallenges()}
        {activeTab === 'social' && renderSocial()}
      </div>
    </div>
  )
}