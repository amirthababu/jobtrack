import { useNavigate } from 'react-router-dom'
import './Navbar.css'
function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    navigate('/login')
  }

  return (
    <nav>

      <div>

        <h2
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          JobTrack
        </h2>

      </div>

      <div>

        <button onClick={() => navigate('/')}>
          Dashboard
        </button>

        <button onClick={() => navigate('/add-job')}>
          Add Job
        </button>

        <button onClick={() => navigate('/profile')}>
          Profile
        </button>

        <button onClick={() => navigate('/ai-matcher')}>
  AI Matcher
</button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar