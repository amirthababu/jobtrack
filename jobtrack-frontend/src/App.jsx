import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import EditJob from './pages/EditJob'
import Profile from './pages/Profile'
import AIJobMatcher from './pages/AIJobMatcher'
import './App.css'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/add-job" element={<AddJob />} />

        <Route path="/edit-job/:id" element={<EditJob />} />
        
        <Route path="/profile" element={<Profile />} />

        <Route path="/ai-matcher" element={<AIJobMatcher />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App