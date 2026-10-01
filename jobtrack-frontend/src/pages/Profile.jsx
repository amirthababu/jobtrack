import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Profile.css'

function Profile() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [preferredJobRole, setPreferredJobRole] = useState('')
  const [skills, setSkills] = useState('')

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {

    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    const fetchProfile = async () => {

      try {

        const response = await fetch(
          'http://localhost:8080/api/users/profile',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        if (response.ok) {

          const data = await response.json()

          setName(data.name || '')
          setEmail(data.email || '')
          setPreferredJobRole(
            data.preferredJobRole || ''
          )
          setSkills(data.skills || '')

        } else {

          setMessage(
            `Unable to load profile: ${response.status}`
          )
        }

      } catch (error) {

        console.error(error)

        setMessage(
          'Unable to connect to server'
        )

      } finally {

        setLoading(false)

      }
    }

    fetchProfile()

  }, [navigate])

  const handleUpdate = async (event) => {

    event.preventDefault()

    setMessage('')

    const token = localStorage.getItem('token')

    try {

      const response = await fetch(
        'http://localhost:8080/api/users/profile',
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

          body: JSON.stringify({
            name,
            email,
            preferredJobRole,
            skills
          })
        }
      )

      if (response.ok) {

        const data = await response.json()

        localStorage.setItem(
          'user',
          JSON.stringify(data)
        )

        setMessage(
          'Profile updated successfully!'
        )

      } else {

        setMessage(
          `Update failed: ${response.status}`
        )
      }

    } catch (error) {

      console.error(error)

      setMessage(
        'Unable to connect to server'
      )
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="profile-page">
          <div className="profile-container">
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <div className="profile-container">

          <div className="profile-header">

            <h1>My Profile</h1>

            <p>
              Manage your profile and job preferences.
            </p>

          </div>

          <form
            className="profile-card"
            onSubmit={handleUpdate}
          >

            <div className="profile-section">

              <h2>Personal Information</h2>

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  disabled
                />

                <small>
                  Email cannot be changed after login.
                </small>

              </div>

            </div>

            <div className="profile-section">

              <h2>Career Preferences</h2>

              <div className="form-group">

                <label>
                  Preferred Job Role
                </label>

                <input
                  type="text"
                  placeholder="Example: Java Full Stack Developer"
                  value={preferredJobRole}
                  onChange={(event) =>
                    setPreferredJobRole(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Skills
                </label>

                <textarea
                  rows="5"
                  placeholder="Example: Java, Spring Boot, MySQL, React, JavaScript, Git"
                  value={skills}
                  onChange={(event) =>
                    setSkills(event.target.value)
                  }
                />

                <small>
                  Add the skills you want the AI Job Matcher
                  to compare with job descriptions.
                </small>

              </div>

            </div>

            <button
              type="submit"
              className="save-profile-button"
            >
              Save Profile
            </button>

            {message && (
              <p className="profile-message">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>
    </>
  )
}

export default Profile