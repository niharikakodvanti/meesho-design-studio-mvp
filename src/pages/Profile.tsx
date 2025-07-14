import { useAuth } from '../contexts/AuthContext'
import { Trophy, Heart, MessageCircle, Calendar } from 'lucide-react'

export default function Profile() {
  const { currentUser } = useAuth()

  // Mock user data
  const userStats = {
    totalDesigns: 15,
    totalLikes: 234,
    totalComments: 45,
    points: 1250,
    rank: 3
  }

  const userDesigns = [
    { id: '1', title: 'Elegant Evening Dress', likes: 42, comments: 8, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop' },
    { id: '2', title: 'Summer Floral Dress', likes: 38, comments: 5, image: 'https://images.unsplash.com/photo-1595777457584-95e059d581b9?w=300&h=400&fit=crop' },
    { id: '3', title: 'Casual Boho Style', likes: 29, comments: 3, image: 'https://images.unsplash.com/photo-1595777457585-95e059d581c0?w=300&h=400&fit=crop' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-meesho-dark mb-2">Your Profile</h1>
        <p className="text-gray-600">Track your designs and achievements</p>
      </div>

      {/* User Info & Stats */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* User Info */}
        <div className="card text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-meesho-primary to-meesho-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-meesho-dark mb-2">
            {currentUser?.email?.split('@')[0] || 'User'}
          </h2>
          <p className="text-gray-600 mb-4">{currentUser?.email}</p>
          <div className="flex items-center justify-center space-x-2 text-meesho-yellow">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">Rank #{userStats.rank}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-meesho-primary">{userStats.totalDesigns}</div>
              <div className="text-sm text-gray-600">Designs</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-meesho-secondary">{userStats.totalLikes}</div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-meesho-accent">{userStats.totalComments}</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-meesho-yellow">{userStats.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Designs */}
      <div className="card">
        <h3 className="text-xl font-semibold text-meesho-dark mb-6">Your Recent Designs</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {userDesigns.map((design) => (
            <div key={design.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="mt-3">
                <h4 className="font-medium text-meesho-dark mb-2">{design.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{design.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{design.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>2d ago</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8 card">
        <h3 className="text-xl font-semibold text-meesho-dark mb-6">Achievements</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'First Design', description: 'Created your first design', earned: true },
            { title: 'Popular Creator', description: 'Reached 100 likes', earned: true },
            { title: 'Top Designer', description: 'Reached top 10 leaderboard', earned: false },
          ].map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              achievement.earned 
                ? 'border-meesho-yellow bg-meesho-yellow/10' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-meesho-yellow' : 'bg-gray-300'
                }`}>
                  {achievement.earned ? '✓' : '?'}
                </div>
                <div>
                  <h4 className="font-medium text-meesho-dark">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 