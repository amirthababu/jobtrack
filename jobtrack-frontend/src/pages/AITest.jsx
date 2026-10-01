import { useState } from 'react'

function AITest() {

  const [profileSkills, setProfileSkills] = useState(
    'Java, Spring Boot, MySQL, HTML, CSS, JavaScript, React, Git, GitHub'
  )

  const [jobDescription, setJobDescription] = useState(
    'We are looking for a Java Developer with Java, Spring Boot, MySQL, REST API, Git and Docker skills.'
  )

  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')

  const handleAnalyze = async () => {

    setMessage('')
    setResult(null)

    const token = localStorage.getItem('token')

    try {

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

      setMessage('Unable to connect to server')
    }
  }

  return (
    <div style={{ padding: '30px' }}>

      <h1>AI Skill Matcher</h1>

      <div style={{ marginBottom: '20px' }}>

        <label>My Skills</label>

        <textarea
          rows="5"
          value={profileSkills}
          onChange={(event) =>
            setProfileSkills(event.target.value)
          }
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '10px'
          }}
        />

      </div>

      <div style={{ marginBottom: '20px' }}>

        <label>Job Description</label>

        <textarea
          rows="7"
          value={jobDescription}
          onChange={(event) =>
            setJobDescription(event.target.value)
          }
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '10px'
          }}
        />

      </div>

      <button onClick={handleAnalyze}>
        Analyze Skills
      </button>

      {message && (
        <p>{message}</p>
      )}

      {result && (
        <div style={{ marginTop: '30px' }}>

          <h2>
            Match Percentage: {result.matchPercentage}%
          </h2>

          <h3>Matched Skills</h3>

          <ul>
            {result.matchedSkills.map(
              (skill) => (
                <li key={skill}>{skill}</li>
              )
            )}
          </ul>

          <h3>Missing Skills</h3>

          <ul>
            {result.missingSkills.map(
              (skill) => (
                <li key={skill}>{skill}</li>
              )
            )}
          </ul>

        </div>
      )}

    </div>
  )
}

export default AITest