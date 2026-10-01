import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (event) => {

    event.preventDefault()

    try {

      const response = await fetch(
        'http://localhost:8080/api/users/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: 'USER'
          })
        }
      )

      if (response.ok) {

        setMessage('Registration successful!')

        setTimeout(() => {
          navigate('/login')
        }, 1000)

      } else {

        setMessage('Registration failed')

      }

    } catch (error) {

      console.error(error)

      setMessage('Unable to connect to server')

    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>JobTrack</h1>

        <p className="register-subtitle">
          Create your account
        </p>

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>

          <button type="submit">
            Register
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="login-link">
          Already have an account?{' '}
          <a href="/login">Login</a>
        </p>

      </div>

    </div>
  )
}

export default Register