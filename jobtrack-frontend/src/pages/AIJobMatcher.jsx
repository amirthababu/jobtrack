import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './AIJobMatcher.css'

function AIJobMatcher() {

  const [profileSkills, setProfileSkills] = useState('')
  const [loadingProfile, setLoadingProfile] = useState(true)

  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem('token')

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

          setProfileSkills(data.skills || '')

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

        setLoadingProfile(false)

      }
    }

    fetchProfile()

  }, [])

  const handleAnalyze = async () => {

    setMessage('')
    setResult(null)

    if (!jobDescription.trim()) {

      setMessage(
        'Please enter a job description'
      )

      return
    }

    try {

      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:8080/api/ai/skill-match',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

          body: JSON.stringify({
            profileSkills: profileSkills,
            jobDescription: jobDescription
          })
        }
      )

      if (response.ok) {

        const data = await response.json()

        setResult(data)

      } else {

        setMessage(
          `Request failed: ${response.status}`
        )
      }

    } catch (error) {

      console.error(error)

      setMessage(
        'Unable to connect to server'
      )
    }
  }

  return (
    <>
      <Navbar />

      <div className="ai-page">

        <div className="ai-container">

          <h1>AI Job Skill Matcher</h1>

          <p className="ai-subtitle">
            Compare your profile skills with a job description.
          </p>

          <div className="profile-skills">

            <h3>Your Skills</h3>

            <p>
              {loadingProfile
                ? 'Loading your skills...'
                : profileSkills ||
                  'No skills added to your profile.'
              }
            </p>

          </div>

          <div className="job-description-section">

            <label>
              Job Description
            </label>

            <textarea
              rows="10"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(event) =>
                setJobDescription(event.target.value)
              }
            />

          </div>

          <button
            className="analyze-button"
            onClick={handleAnalyze}
          >
            Analyze Job
          </button>

          {message && (
            <p className="ai-message">
              {message}
            </p>
          )}

          {result && (

            <div className="ai-result">

              <div className="match-card">

                <h2>
                  {result.matchPercentage}%
                </h2>

                <p>
                  Skill Match
                </p>

              </div>

              <div className="skills-section">

                <div>

                  <h3>Matched Skills</h3>

                  {result.matchedSkills.length > 0 ? (

                    <ul>
                      {result.matchedSkills.map(
                        (skill) => (
                          <li key={skill}>
                            {skill}
                          </li>
                        )
                      )}
                    </ul>

                  ) : (

                    <p>
                      No matching skills found.
                    </p>

                  )}

                </div>

                <div>

                  <h3>Missing Skills</h3>

                  {result.missingSkills.length > 0 ? (

                    <ul>
                      {result.missingSkills.map(
                        (skill) => (
                          <li key={skill}>
                            {skill}
                          </li>
                        )
                      )}
                    </ul>

                  ) : (

                    <p>
                      No missing skills.
                    </p>

                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  )
}

export default AIJobMatcher