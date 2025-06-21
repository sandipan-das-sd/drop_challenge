import React from 'react';
import { Camera, Trophy, Users, Clock, Zap, Star } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">DropChallenge</span>
            </div>
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Get Started
            </button>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Capture the
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}Moment
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
                Join daily photo challenges, compete with friends, and showcase your creativity. 
                Every drop is a chance to rise to the top!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button 
                onClick={() => window.location.href = '/login'}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Start Competing</span>
                </span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-blue-200">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-200">Photos Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">Daily</div>
                <div className="text-blue-200">New Challenges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose DropChallenge?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience the thrill of daily photography challenges with real-time competition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Daily Challenges</h3>
              <p className="text-blue-100 leading-relaxed">
                Fresh, exciting photography challenges every day. From sunset snapshots to coffee art, 
                there's always something new to capture.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Leaderboard</h3>
              <p className="text-blue-100 leading-relaxed">
                Compete with photographers worldwide. Watch your rank update in real-time as 
                submissions pour in and see who rises to the top.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
              <p className="text-blue-100 leading-relaxed">
                Join a vibrant community of photographers. Share techniques, get inspired, 
                and celebrate creativity together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Simple steps to start your photography challenge journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Join Challenge</h3>
                <p className="text-blue-200">Sign up and join the daily challenge that matches your style</p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Capture</h3>
                <p className="text-blue-200">Take your best shot following the challenge rules and guidelines</p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Submit</h3>
                <p className="text-blue-200">Upload your photo or video proof before the deadline</p>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Compete</h3>
                <p className="text-blue-200">Watch the leaderboard and see how you rank against others</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Drop In?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of photographers in daily challenges. Your next great shot is just one challenge away.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Start Your First Challenge
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DropChallenge</span>
            </div>
            <div className="text-blue-200">
              © 2025 DropChallenge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;