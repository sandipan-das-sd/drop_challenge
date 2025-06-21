import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CustomGoogleButton from '../auth/CustomGoogleButton';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleEmailAuth = async () => {
  // Basic validation
  if (!formData.email || !formData.password) {
    toast.error('Please fill in all fields');
    return;
  }

  if (!isLogin && formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (!isLogin && formData.password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }

  setIsLoading(true);
  
  try {
    // Create user data for email auth
    const userData = {
      email: formData.email,
      password: formData.password,
      name: formData.email.split('@')[0], // Use email prefix as name
      isSignup: !isLogin, // true for signup, false for login
      isEmailAuth: true // Flag to indicate email authentication
    };

    const result = await login(userData);
    if (result.success) {
      toast.success(isLogin ? 'Login successful!' : 'Account created successfully!');
      navigate('/home');
    } else {
      toast.error(result.error);
    }
  } catch (error) {
    toast.error(isLogin ? 'Login failed' : 'Registration failed');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">DropChallenge</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Join the Challenge'}
          </h1>
          <p className="text-blue-100">
            {isLogin 
              ? 'Sign in to continue your photography journey' 
              : 'Create an account to start competing'
            }
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Toggle Login/Signup */}
          <div className="flex bg-white/10 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                isLogin 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                !isLogin 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Google Login Button */}
          <CustomGoogleButton 
            buttonText={isLogin ? "Continue with Google" : "Sign up with Google"}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-blue-100">or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleEmailAuth}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Terms and Privacy (Sign Up only) */}
          {!isLogin && (
            <p className="text-xs text-blue-200 mt-4 text-center">
              By creating an account, you agree to our{' '}
              <button className="text-white underline hover:no-underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-white underline hover:no-underline">
                Privacy Policy
              </button>
            </p>
          )}
        </div>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-200 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;