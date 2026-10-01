import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {

    event.preventDefault()

    try {

      const response = await fetch(
        'http://localhost:8080/api/users/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      )

      if (response.ok) {

        const data = await response.json()

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        setMessage('Login successful!')

        setTimeout(() => {
          navigate('/')
        }, 1000)

      } else {

        setMessage('Invalid email or password')

      }

    } catch (error) {

      console.error(error)

      setMessage('Unable to connect to server')

    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>JobTrack</h1>

        <p className="login-subtitle">
          Job Application Management System
        </p>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="register-link">
          Don't have an account?{' '}
          <a href="/register">Register</a>
        </p>

      </div>

    </div>
  )
}

export default Login