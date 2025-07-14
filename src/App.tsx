import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Sketch from './pages/Sketch'
import GeneratedDesign from './pages/GeneratedDesign'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Layout from './components/Layout'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sketch" element={<Sketch />} />
                <Route path="/design/:id" element={<GeneratedDesign />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App 