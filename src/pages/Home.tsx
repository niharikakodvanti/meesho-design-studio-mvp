import { Link } from 'react-router-dom'
import { Palette, Sparkles, Users, Trophy } from 'lucide-react'

export default function Home() {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-meesho-primary to-meesho-secondary rounded-full mb-6">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-meesho-dark mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-meesho-primary to-meesho-secondary bg-clip-text text-transparent">
              Meesho Design Studio
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unleash your creativity and design stunning outfits! Sketch your ideas, 
            generate AI-powered designs, and share them with the community.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          to="/sketch"
          className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-4"
        >
          <Sparkles className="w-5 h-5" />
          <span>Start Designing</span>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="card text-center">
          <div className="w-12 h-12 bg-meesho-yellow rounded-lg flex items-center justify-center mx-auto mb-4">
            <Palette className="w-6 h-6 text-meesho-dark" />
          </div>
          <h3 className="text-xl font-semibold text-meesho-dark mb-2">Sketch & Design</h3>
          <p className="text-gray-600">
            Use our intuitive canvas to sketch your outfit ideas and bring them to life.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-meesho-purple rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-meesho-dark" />
          </div>
          <h3 className="text-xl font-semibold text-meesho-dark mb-2">AI Generation</h3>
          <p className="text-gray-600">
            Transform your sketches into stunning AI-generated dress designs instantly.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-meesho-pink rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-meesho-dark" />
          </div>
          <h3 className="text-xl font-semibold text-meesho-dark mb-2">Share & Connect</h3>
          <p className="text-gray-600">
            Share your designs with the community, get likes, comments, and earn rewards.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-meesho-dark mb-6">Community Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-meesho-primary">1,234</div>
            <div className="text-gray-600">Designs Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-meesho-secondary">567</div>
            <div className="text-gray-600">Active Designers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-meesho-accent">8,901</div>
            <div className="text-gray-600">Total Likes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-meesho-yellow">234</div>
            <div className="text-gray-600">Comments</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="mt-16">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Trophy className="w-6 h-6 text-meesho-yellow" />
          <h2 className="text-2xl font-bold text-meesho-dark">Top Designers</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            {[
              { name: 'Sarah Designer', points: 1250, rank: 1 },
              { name: 'Mike Creative', points: 980, rank: 2 },
              { name: 'Emma Style', points: 756, rank: 3 },
            ].map((designer) => (
              <div key={designer.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    designer.rank === 1 ? 'bg-meesho-yellow' : 
                    designer.rank === 2 ? 'bg-gray-400' : 'bg-meesho-orange'
                  }`}>
                    {designer.rank}
                  </div>
                  <span className="font-medium text-meesho-dark">{designer.name}</span>
                </div>
                <div className="text-meesho-primary font-semibold">{designer.points} pts</div>
              </div>
            ))}
          </div>
          <Link
            to="/leaderboard"
            className="block text-center mt-6 text-meesho-primary hover:text-meesho-primary/80 font-medium"
          >
            View Full Leaderboard →
          </Link>
        </div>
      </div>
    </div>
  )
} 