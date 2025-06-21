

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Camera, Clock, Users, Trophy, Upload, CheckCircle, AlertCircle, Award, Target, RefreshCw, History, Calendar } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useSocket } from '../../context/SocketContext';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import Header from '../common/Header';
// import CountdownTimer from '../common/CountdownTimer';

// const Home = () => {
//   const navigate = useNavigate();
//   const { user, updateUser } = useAuth();
//   const { socket, joinChallenge } = useSocket();
//   const [currentChallenge, setCurrentChallenge] = useState(null);
//   const [upcomingChallenges, setUpcomingChallenges] = useState([]);
//   const [previousChallenges, setPreviousChallenges] = useState([]); // NEW: Previous challenges
//   const [userStats, setUserStats] = useState({
//     currentRank: null,
//     totalScore: 0,
//     challengesWon: 0,
//     totalSubmissions: 0
//   });
//   const [userSubmission, setUserSubmission] = useState(null);
//   const [userJoined, setUserJoined] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (user?._id) {
//       fetchCurrentChallenge();
//       fetchUpcomingChallenges();
//       fetchPreviousChallenges(); // NEW: Fetch previous challenges
//       fetchUserStats();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (currentChallenge && socket) {
//       joinChallenge(currentChallenge._id);
//       checkUserSubmission();
//       getUserRank();

//       // Listen for real-time updates
//       socket.on('challenge_update', (data) => {
//         if (data.challengeId === currentChallenge._id) {
//           setCurrentChallenge(prev => ({
//             ...prev,
//             totalParticipants: data.totalParticipants,
//             totalSubmissions: data.totalSubmissions
//           }));
//         }
//       });

//       return () => {
//         socket.off('challenge_update');
//       };
//     }
//   }, [currentChallenge, socket]);

//   // Listen for new challenges
//   useEffect(() => {
//     if (socket) {
//       socket.on('new_challenge', (data) => {
//         console.log('New challenge available:', data.challenge);
//         toast.success('🎯 New challenge available!');
        
//         // Refresh all challenge data
//         fetchCurrentChallenge();
//         fetchUpcomingChallenges();
//         fetchPreviousChallenges();
//       });

//       socket.on('challenge_status_update', (data) => {
//         console.log('Challenge status updated:', data);
//         fetchCurrentChallenge();
//         fetchPreviousChallenges();
//       });

//       return () => {
//         socket.off('new_challenge');
//         socket.off('challenge_status_update');
//       };
//     }
//   }, [socket]);

//   // Use the /active endpoint for single current challenge
//   const fetchCurrentChallenge = async () => {
//     try {
//       const response = await api.get('/challenges/active');
//       setCurrentChallenge(response.data);
//       console.log('Current challenge loaded:', response.data.title);
//     } catch (error) {
//       if (error.response?.status === 404) {
//         console.log('No active challenges found');
//         setCurrentChallenge(null);
//       } else {
//         console.error('Error fetching current challenge:', error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUpcomingChallenges = async () => {
//     try {
//       const response = await api.get('/challenges/upcoming');
//       setUpcomingChallenges(response.data.slice(0, 3));
//     } catch (error) {
//       console.error('Error fetching upcoming challenges:', error);
//     }
//   };

//   // NEW: Fetch previous/completed challenges
//   const fetchPreviousChallenges = async () => {
//     try {
//       const response = await api.get('/challenges/current'); // This returns multiple recent challenges
      
//       // Filter to get completed challenges or challenges that are not the current active one
//       const completedChallenges = response.data.filter(challenge => {
//         // Include completed challenges or challenges that ended recently (not the current active one)
//         return challenge.status === 'completed' || 
//                (challenge._id !== currentChallenge?._id && new Date(challenge.endTime) <= new Date());
//       });
      
//       // Sort by creation date (newest first) and limit to 5
//       const sortedCompleted = completedChallenges
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, 5);
      
//       setPreviousChallenges(sortedCompleted);
//       console.log('Previous challenges loaded:', sortedCompleted.length);
//     } catch (error) {
//       console.error('Error fetching previous challenges:', error);
//     }
//   };

//   const fetchUserStats = async () => {
//     try {
//       const response = await api.get('/users/stats');
//       setUserStats(response.data);
//     } catch (error) {
//       console.error('Error fetching user stats:', error);
//     }
//   };

//   const checkUserSubmission = async () => {
//     if (!currentChallenge || !user?._id) return;
    
//     try {
//       const response = await api.get(`/submissions/check/${currentChallenge._id}`);
//       setUserSubmission(response.data.submission);
      
//       const isJoined = currentChallenge.participants?.some(
//         p => p.user === user._id || p.user?._id === user._id
//       );
//       setUserJoined(isJoined);
//     } catch (error) {
//       console.error('Error checking submission:', error);
//     }
//   };

//   const getUserRank = async () => {
//     if (!currentChallenge || !user?._id) return;
    
//     try {
//       const response = await api.get(`/leaderboard/rank/${user._id}`);
//       setUserStats(prev => ({
//         ...prev,
//         currentRank: response.data.rank
//       }));
//     } catch (error) {
//       console.error('Error fetching user rank:', error);
//     }
//   };

//   const handleJoinChallenge = async () => {
//     if (!currentChallenge) return;
    
//     try {
//       const response = await api.post(`/challenges/${currentChallenge._id}/join`);
      
//       // Update local state immediately
//       setUserJoined(true);
//       setCurrentChallenge(prev => ({
//         ...prev,
//         totalParticipants: (prev.totalParticipants || 0) + 1,
//         participants: [
//           ...(prev.participants || []),
//           { user: user._id, joinedAt: new Date() }
//         ]
//       }));
      
//       toast.success('Successfully joined the challenge! You can now submit your proof.');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to join challenge');
//     }
//   };

//   const handleSubmitProof = () => {
//     if (currentChallenge) {
//       navigate(`/submission/${currentChallenge._id}`);
//     }
//   };

//   const refreshChallenges = async () => {
//     setRefreshing(true);
//     try {
//       await Promise.all([
//         fetchCurrentChallenge(),
//         fetchUpcomingChallenges(),
//         fetchPreviousChallenges(), // NEW: Also refresh previous challenges
//         fetchUserStats()
//       ]);
      
//       // Re-check user submission after refresh
//       if (currentChallenge) {
//         await checkUserSubmission();
//       }
      
//       toast.success('Challenges refreshed!');
//     } catch (error) {
//       toast.error('Failed to refresh challenges');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const formatTimeRemaining = (endTime) => {
//     const now = new Date();
//     const end = new Date(endTime);
//     const diff = end - now;
    
//     if (diff <= 0) return '0h 0m';
    
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${hours}h ${minutes}m`;
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'upcoming':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'completed':
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//         <Header />
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading challenges...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!currentChallenge) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//         <Header />
//         <div className="container mx-auto px-6 py-8">
//           <div className="text-center py-20">
//             <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Challenge</h2>
//             <p className="text-gray-600 mb-8">Check back soon for new challenges!</p>
            
//             {/* Refresh Button */}
//             <button 
//               onClick={refreshChallenges}
//               className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto mb-8"
//               disabled={refreshing}
//             >
//               <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//               <span>{refreshing ? 'Refreshing...' : 'Refresh Challenges'}</span>
//             </button>

//             {/* Show Previous Challenges even when no active challenge */}
//             {previousChallenges.length > 0 && (
//               <div className="max-w-4xl mx-auto mt-12">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center space-x-2">
//                   <History className="w-6 h-6 text-purple-600" />
//                   <span>Recent Challenges</span>
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {previousChallenges.map((challenge) => (
//                     <div key={challenge._id} className="bg-white rounded-lg p-4 shadow-lg">
//                       <h4 className="font-semibold mb-2">{challenge.title}</h4>
//                       <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
//                       <div className="flex justify-between items-center text-sm">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
//                           {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
//                         </span>
//                         <span className="text-gray-500">Ended {formatDate(challenge.endTime)}</span>
//                       </div>
//                       <div className="flex justify-between items-center mt-3 text-sm">
//                         <span className="flex items-center space-x-1">
//                           <Users className="w-4 h-4 text-purple-500" />
//                           <span>{challenge.totalParticipants || 0} participants</span>
//                         </span>
//                         <span className="flex items-center space-x-1">
//                           <Trophy className="w-4 h-4 text-amber-500" />
//                           <span>{challenge.totalSubmissions || 0} submissions</span>
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {upcomingChallenges.length > 0 && (
//               <div className="max-w-md mx-auto mt-8">
//                 <h3 className="text-lg font-semibold mb-4">Upcoming Challenges:</h3>
//                 <div className="space-y-3">
//                   {upcomingChallenges.map((challenge) => (
//                     <div key={challenge._id} className="bg-white rounded-lg p-4 text-left">
//                       <h4 className="font-semibold">{challenge.title}</h4>
//                       <p className="text-sm text-gray-600">Starts in {formatTimeRemaining(challenge.startTime)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Header />

//       <div className="container mx-auto px-6 py-8">
//         {/* Refresh Button */}
//         <div className="flex justify-end mb-4">
//           <button 
//             onClick={refreshChallenges}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
//             disabled={refreshing}
//           >
//             <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//             <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Challenge Card */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               {/* Challenge Header */}
//               <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h1 className="text-3xl font-bold mb-2">{currentChallenge.title}</h1>
//                     <p className="text-purple-100 text-lg">{currentChallenge.description}</p>
//                   </div>
//                   <div className="text-right">
//                     <CountdownTimer 
//                       endTime={currentChallenge.endTime}
//                       onComplete={() => window.location.reload()}
//                     />
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <Users className="w-6 h-6 mx-auto mb-1" />
//                     <div className="text-2xl font-bold">{currentChallenge.totalParticipants || 0}</div>
//                     <div className="text-sm text-purple-100">Participants</div>
//                   </div>
//                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <Target className="w-6 h-6 mx-auto mb-1" />
//                     <div className="text-2xl font-bold">{currentChallenge.maxScore}</div>
//                     <div className="text-sm text-purple-100">Max Points</div>
//                   </div>
//                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <Award className="w-6 h-6 mx-auto mb-1" />
//                     <div className="text-2xl font-bold">
//                       {userStats.currentRank ? `#${userStats.currentRank}` : '-'}
//                     </div>
//                     <div className="text-sm text-purple-100">Your Rank</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Challenge Content */}
//               <div className="p-6">
//                 {/* Rules Section */}
//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                     <AlertCircle className="w-5 h-5 mr-2 text-amber-500" />
//                     Challenge Rules
//                   </h3>
//                   <div className="space-y-3">
//                     {currentChallenge.rules?.map((rule, index) => (
//                       <div key={index} className="flex items-start space-x-3">
//                         <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
//                         </div>
//                         <span className="text-gray-700">{rule}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-4">
//                   {!userJoined ? (
//                     <div className="space-y-3">
//                       <button 
//                         onClick={handleJoinChallenge}
//                         className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
//                       >
//                         <span className="flex items-center justify-center space-x-2">
//                           <Camera className="w-5 h-5" />
//                           <span>Join Challenge</span>
//                         </span>
//                       </button>
                      
//                       {/* Disabled Submit Proof Button */}
//                       <button 
//                         disabled
//                         className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-semibold text-lg cursor-not-allowed opacity-60"
//                         title="Join the challenge first to submit proof"
//                       >
//                         <span className="flex items-center justify-center space-x-2">
//                           <Upload className="w-5 h-5" />
//                           <span>Submit Your Proof</span>
//                         </span>
//                       </button>
//                     </div>
//                   ) : !userSubmission ? (
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
//                         <CheckCircle className="w-5 h-5" />
//                         <span className="font-medium">Challenge Joined Successfully!</span>
//                       </div>
                      
//                       {/* Enabled Submit Proof Button */}
//                       <button 
//                         onClick={handleSubmitProof}
//                         className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 animate-pulse"
//                       >
//                         <span className="flex items-center justify-center space-x-2">
//                           <Upload className="w-5 h-5" />
//                           <span>Submit Your Proof</span>
//                         </span>
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
//                         <CheckCircle className="w-5 h-5" />
//                         <span className="font-medium">Submission Complete! Score: {userSubmission.score}</span>
//                       </div>
//                       <button 
//                         disabled
//                         className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
//                       >
//                         Already Submitted
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* NEW: Previous Challenges Section */}
//             {previousChallenges.length > 0 && (
//               <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
//                   <History className="w-6 h-6 text-purple-600" />
//                   <span>Previous Challenges</span>
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {previousChallenges.map((challenge) => (
//                     <div key={challenge._id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
//                       <div className="flex justify-between items-start mb-3">
//                         <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
//                           {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{challenge.description}</p>
//                       <div className="flex justify-between items-center text-sm">
//                         <div className="flex items-center space-x-3">
//                           <span className="flex items-center space-x-1">
//                             <Users className="w-4 h-4 text-purple-500" />
//                             <span>{challenge.totalParticipants || 0}</span>
//                           </span>
//                           <span className="flex items-center space-x-1">
//                             <Trophy className="w-4 h-4 text-amber-500" />
//                             <span>{challenge.totalSubmissions || 0}</span>
//                           </span>
//                         </div>
//                         <span className="text-gray-500 flex items-center space-x-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>Ended {formatDate(challenge.endTime)}</span>
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* View All Link */}
//                 <div className="mt-4 text-center">
//                   <button 
//                     onClick={() => navigate('/challenges')}
//                     className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline"
//                   >
//                     View All Challenges →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* User Stats Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Current Rank</span>
//                   <span className="text-2xl font-bold text-purple-600">
//                     {userStats.currentRank ? `#${userStats.currentRank}` : '-'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Total Score</span>
//                   <span className="text-2xl font-bold text-green-600">{userStats.totalScore}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Challenges Won</span>
//                   <span className="text-xl font-semibold text-amber-600">{userStats.challengesWon}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Total Submissions</span>
//                   <span className="text-xl font-semibold text-blue-600">{userStats.totalSubmissions}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Upcoming Challenges */}
//             {upcomingChallenges.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Challenges</h3>
//                 <div className="space-y-4">
//                   {upcomingChallenges.map((challenge) => (
//                     <div key={challenge._id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
//                       <h4 className="font-semibold text-gray-800 mb-2">{challenge.title}</h4>
//                       <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-purple-600 font-medium">
//                           Starts in {formatTimeRemaining(challenge.startTime)}
//                         </span>
//                         <span className="text-gray-500">{challenge.totalParticipants || 0} joined</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quick Actions */}
//             <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
//               <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <button 
//                   onClick={() => navigate('/leaderboard')}
//                   className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
//                 >
//                   View Leaderboard
//                 </button>
//                 <button 
//                   onClick={() => navigate('/challenges')}
//                   className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
//                 >
//                   All Challenges
//                 </button>
//                 <button 
//                   onClick={() => navigate('/notifications')}
//                   className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
//                 >
//                   Notification Settings
//                 </button>
//                 {user?.role === 'admin' && (
//                   <button 
//                     onClick={() => navigate('/admin')}
//                     className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
//                   >
//                     Admin Panel
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Clock, Users, Trophy, Upload, CheckCircle, AlertCircle, Award, Target, RefreshCw, History, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Header from '../common/Header';
import CountdownTimer from '../common/CountdownTimer';

const Home = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { socket, joinChallenge } = useSocket();
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);
  const [previousChallenges, setPreviousChallenges] = useState([]);
  const [userStats, setUserStats] = useState({
    currentRank: null,
    totalScore: 0,
    challengesWon: 0,
    totalSubmissions: 0
  });
  const [userSubmission, setUserSubmission] = useState(null);
  const [userJoined, setUserJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchCurrentChallenge();
      fetchUpcomingChallenges();
      fetchPreviousChallenges();
      fetchUserStats();
    }
  }, [user]);

  useEffect(() => {
    if (currentChallenge && socket) {
      joinChallenge(currentChallenge._id);
      checkUserSubmission();
      getUserRank();

      // Listen for real-time updates
      socket.on('challenge_update', (data) => {
        if (data.challengeId === currentChallenge._id) {
          setCurrentChallenge(prev => ({
            ...prev,
            totalParticipants: data.totalParticipants,
            totalSubmissions: data.totalSubmissions
          }));
        }
      });

      return () => {
        socket.off('challenge_update');
      };
    }
  }, [currentChallenge, socket]);

  // Listen for new challenges
  useEffect(() => {
    if (socket) {
      socket.on('new_challenge', (data) => {
        console.log('New challenge available:', data.challenge);
        toast.success('🎯 New challenge available!');
        
        // Refresh all challenge data
        fetchCurrentChallenge();
        fetchUpcomingChallenges();
        fetchPreviousChallenges();
      });

      socket.on('challenge_status_update', (data) => {
        console.log('Challenge status updated:', data);
        fetchCurrentChallenge();
        fetchPreviousChallenges();
      });

      return () => {
        socket.off('new_challenge');
        socket.off('challenge_status_update');
      };
    }
  }, [socket]);

  // Use the /active endpoint for single current challenge
  const fetchCurrentChallenge = async () => {
    try {
      const response = await api.get('/challenges/active');
      setCurrentChallenge(response.data);
      console.log('Current challenge loaded:', response.data.title);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('No active challenges found');
        setCurrentChallenge(null);
      } else {
        console.error('Error fetching current challenge:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingChallenges = async () => {
    try {
      const response = await api.get('/challenges/upcoming');
      setUpcomingChallenges(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching upcoming challenges:', error);
    }
  };

  // FIXED: Fetch previous/completed challenges
  const fetchPreviousChallenges = async () => {
    try {
      // Get all recent challenges from /current endpoint
      const response = await api.get('/challenges/current');
      
      // Filter to get challenges that are NOT the current active one
      const otherChallenges = response.data.filter(challenge => {
        // Exclude the current challenge if it exists
        if (currentChallenge && challenge._id === currentChallenge._id) {
          return false;
        }
        
        // Include completed challenges and recently ended challenges
        return challenge.status === 'completed' || 
               new Date(challenge.endTime) <= new Date();
      });
      
      // Sort by creation date (newest first) and limit to 5
      const sortedPrevious = otherChallenges
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      setPreviousChallenges(sortedPrevious);
      console.log('Previous challenges loaded:', sortedPrevious.length);
    } catch (error) {
      console.error('Error fetching previous challenges:', error);
      // If /current fails, try to get all challenges
      try {
        const allResponse = await api.get('/challenges/all');
        const filteredChallenges = allResponse.data
          .filter(challenge => {
            if (currentChallenge && challenge._id === currentChallenge._id) {
              return false;
            }
            return challenge.status === 'completed' || new Date(challenge.endTime) <= new Date();
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        
        setPreviousChallenges(filteredChallenges);
      } catch (fallbackError) {
        console.error('Error fetching challenges from fallback:', fallbackError);
      }
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await api.get('/users/stats');
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const checkUserSubmission = async () => {
    if (!currentChallenge || !user?._id) return;
    
    try {
      const response = await api.get(`/submissions/check/${currentChallenge._id}`);
      setUserSubmission(response.data.submission);
      
      const isJoined = currentChallenge.participants?.some(
        p => p.user === user._id || p.user?._id === user._id
      );
      setUserJoined(isJoined);
    } catch (error) {
      console.error('Error checking submission:', error);
    }
  };

  const getUserRank = async () => {
    if (!currentChallenge || !user?._id) return;
    
    try {
      const response = await api.get(`/leaderboard/rank/${user._id}`);
      setUserStats(prev => ({
        ...prev,
        currentRank: response.data.rank
      }));
    } catch (error) {
      console.error('Error fetching user rank:', error);
    }
  };

  const handleJoinChallenge = async () => {
    if (!currentChallenge) return;
    
    try {
      const response = await api.post(`/challenges/${currentChallenge._id}/join`);
      
      // Update local state immediately
      setUserJoined(true);
      setCurrentChallenge(prev => ({
        ...prev,
        totalParticipants: (prev.totalParticipants || 0) + 1,
        participants: [
          ...(prev.participants || []),
          { user: user._id, joinedAt: new Date() }
        ]
      }));
      
      toast.success('Successfully joined the challenge! You can now submit your proof.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join challenge');
    }
  };

  const handleSubmitProof = () => {
    if (currentChallenge) {
      navigate(`/submission/${currentChallenge._id}`);
    }
  };

  const refreshChallenges = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchCurrentChallenge(),
        fetchUpcomingChallenges(),
        fetchUserStats()
      ]);
      
      // Fetch previous challenges after current challenge is loaded
      setTimeout(() => {
        fetchPreviousChallenges();
      }, 500);
      
      // Re-check user submission after refresh
      if (currentChallenge) {
        await checkUserSubmission();
      }
      
      toast.success('Challenges refreshed!');
    } catch (error) {
      toast.error('Failed to refresh challenges');
    } finally {
      setRefreshing(false);
    }
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return '0h 0m';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading challenges...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Challenge</h2>
            <p className="text-gray-600 mb-8">Check back soon for new challenges!</p>
            
            {/* Refresh Button */}
            <button 
              onClick={refreshChallenges}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto mb-8"
              disabled={refreshing}
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh Challenges'}</span>
            </button>

            {/* Show Previous Challenges even when no active challenge */}
            {previousChallenges.length > 0 && (
              <div className="max-w-4xl mx-auto mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center space-x-2">
                  <History className="w-6 h-6 text-purple-600" />
                  <span>Recent Challenges</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previousChallenges.map((challenge) => (
                    <div key={challenge._id} className="bg-white rounded-lg p-4 shadow-lg">
                      <h4 className="font-semibold mb-2">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                          {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                        </span>
                        <span className="text-gray-500">Ended {formatDate(challenge.endTime)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-sm">
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-purple-500" />
                          <span>{challenge.totalParticipants || 0} participants</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span>{challenge.totalSubmissions || 0} submissions</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upcomingChallenges.length > 0 && (
              <div className="max-w-md mx-auto mt-8">
                <h3 className="text-lg font-semibold mb-4">Upcoming Challenges:</h3>
                <div className="space-y-3">
                  {upcomingChallenges.map((challenge) => (
                    <div key={challenge._id} className="bg-white rounded-lg p-4 text-left">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-gray-600">Starts in {formatTimeRemaining(challenge.startTime)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={refreshChallenges}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Challenge Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Challenge */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Challenge Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{currentChallenge.title}</h1>
                    <p className="text-purple-100 text-lg">{currentChallenge.description}</p>
                  </div>
                  <div className="text-right">
                    <CountdownTimer 
                      endTime={currentChallenge.endTime}
                      onComplete={() => window.location.reload()}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <Users className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-2xl font-bold">{currentChallenge.totalParticipants || 0}</div>
                    <div className="text-sm text-purple-100">Participants</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <Target className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-2xl font-bold">{currentChallenge.maxScore}</div>
                    <div className="text-sm text-purple-100">Max Points</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                    <Award className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-2xl font-bold">
                      {userStats.currentRank ? `#${userStats.currentRank}` : '-'}
                    </div>
                    <div className="text-sm text-purple-100">Your Rank</div>
                  </div>
                </div>
              </div>

              {/* Challenge Content */}
              <div className="p-6">
                {/* Rules Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-amber-500" />
                    Challenge Rules
                  </h3>
                  <div className="space-y-3">
                    {currentChallenge.rules?.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  {!userJoined ? (
                    <div className="space-y-3">
                      <button 
                        onClick={handleJoinChallenge}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Camera className="w-5 h-5" />
                          <span>Join Challenge</span>
                        </span>
                      </button>
                      
                      {/* Disabled Submit Proof Button */}
                      <button 
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-semibold text-lg cursor-not-allowed opacity-60"
                        title="Join the challenge first to submit proof"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Upload className="w-5 h-5" />
                          <span>Submit Your Proof</span>
                        </span>
                      </button>
                    </div>
                  ) : !userSubmission ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Challenge Joined Successfully!</span>
                      </div>
                      
                      {/* Enabled Submit Proof Button */}
                      <button 
                        onClick={handleSubmitProof}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 animate-pulse"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Upload className="w-5 h-5" />
                          <span>Submit Your Proof</span>
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Submission Complete! Score: {userSubmission.score}</span>
                      </div>
                      <button 
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
                      >
                        Already Submitted
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Previous Challenges Section - MOVED TO MAIN AREA */}
            {previousChallenges.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <History className="w-6 h-6 text-purple-600" />
                  <span>Previous Challenges</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {previousChallenges.map((challenge) => (
                    <div key={challenge._id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                          {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{challenge.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span>{challenge.totalParticipants || 0}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <span>{challenge.totalSubmissions || 0}</span>
                          </span>
                        </div>
                        <span className="text-gray-500 flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Ended {formatDate(challenge.endTime)}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View All Link */}
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => navigate('/challenges')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline"
                  >
                    View All Challenges →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Rank</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {userStats.currentRank ? `#${userStats.currentRank}` : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Score</span>
                  <span className="text-2xl font-bold text-green-600">{userStats.totalScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Challenges Won</span>
                  <span className="text-xl font-semibold text-amber-600">{userStats.challengesWon}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Submissions</span>
                  <span className="text-xl font-semibold text-blue-600">{userStats.totalSubmissions}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Challenges */}
            {upcomingChallenges.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Challenges</h3>
                <div className="space-y-4">
                  {upcomingChallenges.map((challenge) => (
                    <div key={challenge._id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                      <h4 className="font-semibold text-gray-800 mb-2">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-600 font-medium">
                          Starts in {formatTimeRemaining(challenge.startTime)}
                        </span>
                        <span className="text-gray-500">{challenge.totalParticipants || 0} joined</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/leaderboard')}
                  className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  View Leaderboard
                </button>
                <button 
                  onClick={() => navigate('/challenges')}
                  className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  All Challenges
                </button>
                <button 
                  onClick={() => navigate('/notifications')}
                  className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  Notification Settings
                </button>
                {user?.role === 'admin' && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="w-full bg-white/20 backdrop-blur-sm py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;