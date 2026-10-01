import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './EditJob.css'

function EditJob() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobType, setJobType] = useState('')
  const [location, setLocation] = useState('')
  const [appliedDate, setAppliedDate] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [status, setStatus] = useState('Applied')
  const [notes, setNotes] = useState('')

  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')
  const [interviewRound, setInterviewRound] = useState('')
  const [interviewer, setInterviewer] = useState('')
  const [interviewNotes, setInterviewNotes] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchJob = async () => {

      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {

        const response = await fetch(
          `http://localhost:8080/api/jobs/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        if (response.ok) {

          const data = await response.json()

          setCompanyName(data.companyName || '')
          setJobTitle(data.jobTitle || '')
          setJobType(data.jobType || '')
          setLocation(data.location || '')
          setAppliedDate(data.appliedDate || '')
          setJobUrl(data.jobUrl || '')
          setStatus(data.status || 'Applied')
          setNotes(data.notes || '')

          setInterviewDate(data.interviewDate || '')
          setInterviewTime(data.interviewTime || '')
          setInterviewRound(data.interviewRound || '')
          setInterviewer(data.interviewer || '')
          setInterviewNotes(data.interviewNotes || '')

        } else {

          setMessage(
            `Unable to load job: ${response.status}`
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

    fetchJob()

  }, [id, navigate])

  const handleUpdate = async (event) => {

    event.preventDefault()
    setMessage('')

    const token = localStorage.getItem('token')

    try {

      const response = await fetch(
        `http://localhost:8080/api/jobs/${id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

          body: JSON.stringify({
            companyName,
            jobTitle,
            jobType,
            location,
            appliedDate,
            jobUrl,
            status,
            notes,
            interviewDate: interviewDate || null,
            interviewTime: interviewTime || null,
            interviewRound,
            interviewer,
            interviewNotes
          })
        }
      )

      if (response.ok) {

        setMessage(
          'Job application updated successfully!'
        )

        setTimeout(() => {
          navigate('/')
        }, 1000)

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

        <div className="edit-job-page">

          <div className="edit-job-container">

            <p>Loading job application...</p>

          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="edit-job-page">

        <div className="edit-job-container">

          <div className="edit-job-header">

            <h1>Edit Job Application</h1>

            <p>
              Update your application and interview details.
            </p>

          </div>

          <form
            className="job-form"
            onSubmit={handleUpdate}
          >

            <div className="form-section">

              <h2>Job Information</h2>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Company Name
                  </label>

                  <input
                    type="text"
                    value={companyName}
                    onChange={(event) =>
                      setCompanyName(event.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Job Title
                  </label>

                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(event) =>
                      setJobTitle(event.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Job Type
                  </label>

                  <select
                    value={jobType}
                    onChange={(event) =>
                      setJobType(event.target.value)
                    }
                  >

                    <option value="">
                      Select Job Type
                    </option>

                    <option value="Full Time">
                      Full Time
                    </option>

                    <option value="Part Time">
                      Part Time
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                    <option value="Contract">
                      Contract
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Applied Date
                  </label>

                  <input
                    type="date"
                    value={appliedDate}
                    onChange={(event) =>
                      setAppliedDate(event.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Job URL
                  </label>

                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(event) =>
                      setJobUrl(event.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value)
                    }
                  >

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Assessment">
                      Assessment
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Selected">
                      Selected
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>

              </div>

              <div className="form-group">

                <label>
                  Notes
                </label>

                <textarea
                  rows="4"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                />

              </div>

            </div>

            <div className="form-section">

              <h2>Interview Details</h2>

              <p className="section-description">
                Update interview information for this application.
              </p>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Interview Date
                  </label>

                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(event) =>
                      setInterviewDate(event.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Interview Time
                  </label>

                  <input
                    type="time"
                    value={interviewTime}
                    onChange={(event) =>
                      setInterviewTime(event.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Interview Round
                  </label>

                  <input
                    type="text"
                    value={interviewRound}
                    onChange={(event) =>
                      setInterviewRound(event.target.value)
                    }
                    placeholder="Example: Technical Round"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Interviewer
                  </label>

                  <input
                    type="text"
                    value={interviewer}
                    onChange={(event) =>
                      setInterviewer(event.target.value)
                    }
                    placeholder="Example: HR / Technical Panel"
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Interview Notes
                </label>

                <textarea
                  rows="4"
                  value={interviewNotes}
                  onChange={(event) =>
                    setInterviewNotes(event.target.value)
                  }
                />

              </div>

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="update-job-button"
              >
                Update Job Application
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>

            </div>

            {message && (
              <p className="edit-job-message">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>
    </>
  )
}

export default EditJob