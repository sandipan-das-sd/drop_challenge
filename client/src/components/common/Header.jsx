

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Camera, Trophy, Settings, LogOut, Bell, Menu, X, Shield } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const Header = ({ title = "DropChallenge" }) => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/');
//   };

//   return (
//     <header className="bg-gradient-to-r from-white via-purple-50 to-pink-50 shadow-lg border-b border-purple-100">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo and Brand Section */}
//           <div className="flex items-center space-x-3">
//             <div className="relative group">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
//                 <Camera className="w-7 h-7 text-white drop-shadow-md" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
//             </div>
            
//             <div className="flex flex-col">
//               <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 {title}
//               </span>
//               <span className="text-xs text-gray-500 font-medium">
//                 Capture. Compete. Conquer.
//               </span>
//             </div>
            
//             {user?.role === 'admin' && (
//               <div className="relative">
//                 <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1 animate-pulse">
//                   <Shield className="w-4 h-4" />
//                   <span>Admin</span>
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-2">
//             <button
//               onClick={() => navigate('/home')}
//               className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200"
//             >
//               <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//               <span className="font-medium">Challenges</span>
//             </button>
            
//             <button
//               onClick={() => navigate('/leaderboard')}
//               className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200"
//             >
//               <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//               <span className="font-medium">Leaderboard</span>
//             </button>
            
//             <button
//               onClick={() => navigate('/notifications')}
//               className="group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200"
//             >
//               <div className="relative">
//                 <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>
//               </div>
//               <span className="font-medium">Notifications</span>
//             </button>
            
//             <button
//               onClick={() => navigate('/settings')}
//               className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200"
//             >
//               <Settings className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//               <span className="font-medium">Settings</span>
//             </button>
            
//             {user?.role === 'admin' && (
//               <button
//                 onClick={() => navigate('/admin')}
//                 className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-purple-200"
//               >
//                 <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//                 <span className="font-medium">Admin</span>
//               </button>
//             )}
            
//             {/* User Profile Section */}
//             <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
//               <div className="relative group">
//                 <div className="w-11 h-11 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
//                   <span className="text-purple-600 font-bold text-lg">
//                     {user?.name?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
                
//                 {/* Status indicator */}
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                
//                 {/* Hover tooltip */}
//                 <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                   <div className="text-sm font-bold text-gray-900">{user?.name}</div>
//                   <div className="text-xs text-gray-500 mt-1">Online</div>
//                   <div className="text-xs text-purple-600 mt-1 capitalize">
//                     {user?.role} Account
//                   </div>
//                 </div>
//               </div>
              
//               <button
//                 onClick={handleLogout}
//                 className="group p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
//               >
//                 <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 border-t border-purple-100 animate-in slide-in-from-top duration-300">
//             <div className="flex flex-col space-y-1 pt-4">
//               <button
//                 onClick={() => {
//                   navigate('/home');
//                   setIsMenuOpen(false);
//                 }}
//                 className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
//               >
//                 <Camera className="w-5 h-5" />
//                 <span className="font-medium">Challenges</span>
//               </button>
              
//               <button
//                 onClick={() => {
//                   navigate('/leaderboard');
//                   setIsMenuOpen(false);
//                 }}
//                 className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
//               >
//                 <Trophy className="w-5 h-5" />
//                 <span className="font-medium">Leaderboard</span>
//               </button>
              
//               <button
//                 onClick={() => {
//                   navigate('/notifications');
//                   setIsMenuOpen(false);
//                 }}
//                 className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
//               >
//                 <div className="relative">
//                   <Bell className="w-5 h-5" />
//                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//                 </div>
//                 <span className="font-medium">Notifications</span>
//               </button>
              
//               <button
//                 onClick={() => {
//                   navigate('/settings');
//                   setIsMenuOpen(false);
//                 }}
//                 className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
//               >
//                 <Settings className="w-5 h-5" />
//                 <span className="font-medium">Settings</span>
//               </button>
              
//               {user?.role === 'admin' && (
//                 <button
//                   onClick={() => {
//                     navigate('/admin');
//                     setIsMenuOpen(false);
//                   }}
//                   className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span className="font-medium">Admin</span>
//                 </button>
//               )}
              
//               {/* Mobile User Section */}
//               <div className="mt-4 pt-4 border-t border-purple-100">
//                 <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
//                       <span className="text-white font-bold">
//                         {user?.name?.charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                     <div>
//                       <div className="text-sm font-bold text-gray-900">{user?.name}</div>
//                       <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={handleLogout}
//                     className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all duration-300"
//                   >
//                     <LogOut className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Bottom accent line */}
//       <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, Trophy, Settings, LogOut, Bell, Menu, X, Shield, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title = "DropChallenge" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-white via-purple-50 to-pink-50 shadow-lg border-b border-purple-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Camera className="w-7 h-7 text-white drop-shadow-md" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {title}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Capture. Compete. Conquer.
              </span>
            </div>
            
            {user?.role === 'admin' && (
              <div className="relative">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1 animate-pulse">
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Home */}
            <button
              onClick={() => navigate('/home')}
              className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                isActive('/home')
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-200'
              }`}
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Home</span>
            </button>
            
            {/* All Challenges - UPDATED */}
            <button
              onClick={() => navigate('/challenges')}
              className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                isActive('/challenges')
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-200'
              }`}
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">All Challenges</span>
            </button>
            
            <button
              onClick={() => navigate('/leaderboard')}
              className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                isActive('/leaderboard')
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-200'
              }`}
            >
              <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Leaderboard</span>
            </button>
            
            <button
              onClick={() => navigate('/notifications')}
              className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                isActive('/notifications')
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-200'
              }`}
            >
              <div className="relative">
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>
              </div>
              <span className="font-medium">Notifications</span>
            </button>
            
            <button
              onClick={() => navigate('/settings')}
              className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                isActive('/settings')
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-200'
              }`}
            >
              <Settings className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Settings</span>
            </button>
            
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                  isActive('/admin')
                    ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent hover:border-purple-200'
                }`}
              >
                <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Admin</span>
              </button>
            )}
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="relative group">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-purple-600 font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                
                {/* Hover tooltip */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="text-sm font-bold text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Online</div>
                  <div className="text-xs text-purple-600 mt-1 capitalize">
                    {user?.role} Account
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="group p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
              >
                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-100 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-1 pt-4">
              <button
                onClick={() => {
                  navigate('/home');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/home')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/challenges');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/challenges')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium">All Challenges</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/leaderboard');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/leaderboard')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Leaderboard</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/notifications');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/notifications')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </div>
                <span className="font-medium">Notifications</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/settings');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/settings')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
              
              {user?.role === 'admin' && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    isActive('/admin')
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Admin</span>
                </button>
              )}
              
              {/* Mobile User Section */}
              <div className="mt-4 pt-4 border-t border-purple-100">
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{user?.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
    </header>
  );
};

export default Header;