import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'

interface LeaderboardUser {
  id: string
  name: string
  points: number
  designs: number
  likes: number
  rank: number
  avatar: string
}

export default function Leaderboard() {
  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Sarah Designer',
      points: 1250,
      designs: 25,
      likes: 450,
      rank: 1,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Mike Creative',
      points: 980,
      designs: 18,
      likes: 320,
      rank: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Emma Style',
      points: 756,
      designs: 15,
      likes: 280,
      rank: 3,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Alex Fashion',
      points: 654,
      designs: 12,
      likes: 245,
      rank: 4,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Lisa Trend',
      points: 543,
      designs: 10,
      likes: 210,
      rank: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '6',
      name: 'David Art',
      points: 432,
      designs: 8,
      likes: 180,
      rank: 6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '7',
      name: 'Anna Design',
      points: 398,
      designs: 7,
      likes: 165,
      rank: 7,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '8',
      name: 'Tom Creative',
      points: 365,
      designs: 6,
      likes: 145,
      rank: 8,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '9',
      name: 'Maria Style',
      points: 334,
      designs: 5,
      likes: 130,
      rank: 9,
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '10',
      name: 'John Fashion',
      points: 298,
      designs: 4,
      likes: 115,
      rank: 10,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-meesho-yellow" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-meesho-orange" />
      default:
        return <span className="text-lg font-bold text-gray-500">{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-meesho-yellow to-yellow-400'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400'
      case 3:
        return 'bg-gradient-to-r from-meesho-orange to-orange-400'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Trophy className="w-8 h-8 text-meesho-yellow" />
          <h1 className="text-3xl font-bold text-meesho-dark">Leaderboard</h1>
        </div>
        <p className="text-gray-600">Top designers based on community engagement and points</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-meesho-primary">1,234</div>
          <div className="text-sm text-gray-600">Total Designers</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-meesho-secondary">5,678</div>
          <div className="text-sm text-gray-600">Total Designs</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-meesho-accent">12,345</div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-meesho-yellow">890</div>
          <div className="text-sm text-gray-600">Total Comments</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-meesho-dark">Top Designers</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Updated daily</span>
          </div>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                user.rank <= 3 ? 'border-meesho-yellow/20 bg-meesho-yellow/5' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-meesho-dark">{user.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{user.designs} designs</span>
                      <span>•</span>
                      <span>{user.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-meesho-primary">{user.points}</div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-meesho-dark mb-4">How to Earn Points</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-meesho-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div>
              <strong className="text-meesho-dark">Create Designs</strong>
              <p className="text-gray-600">Earn 10 points for each design you create</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-meesho-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">
              2
            </div>
            <div>
              <strong className="text-meesho-dark">Get Likes</strong>
              <p className="text-gray-600">Earn 2 points for each like on your designs</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-meesho-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div>
              <strong className="text-meesho-dark">Engage</strong>
              <p className="text-gray-600">Earn 1 point for each comment you make</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 