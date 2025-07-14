import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Home, Palette, Trophy, User, LogOut } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Design', href: '/sketch', icon: Palette },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-meesho-light to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-meesho-primary to-meesho-secondary rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-meesho-dark">Meesho Design Studio</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-meesho-primary bg-meesho-primary/10'
                        : 'text-gray-600 hover:text-meesho-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-sm text-gray-600">
                    Hi, {currentUser.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-meesho-primary transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
} 