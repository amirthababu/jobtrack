import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Dashboard.css'

function Dashboard() {

  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const navigate = useNavigate()

  useEffect(() => {

    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      navigate('/login')
      return
    }

    setUser(JSON.parse(storedUser))
    fetchJobs(token)

  }, [navigate])

  const fetchJobs = async (token) => {

    try {

      const response = await fetch(
        'http://localhost:8080/api/jobs',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {

        const data = await response.json()

        setJobs(data)

      }

    } catch (error) {

      console.error(error)

    }
  }

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this job application?'
    )

    if (!confirmDelete) return

    const token = localStorage.getItem('token')

    try {

      const response = await fetch(
        `http://localhost:8080/api/jobs/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {

        setJobs(
          jobs.filter((job) => job.id !== id)
        )

      } else {

        alert('Failed to delete job application')

      }

    } catch (error) {

      console.error(error)

      alert('Unable to connect to server')

    }
  }

  const totalApplications = jobs.length

  const appliedCount =
    jobs.filter((job) => job.status === 'Applied').length

  const assessmentCount =
    jobs.filter((job) => job.status === 'Assessment').length

  const interviewCount =
    jobs.filter((job) => job.status === 'Interview').length

  const selectedCount =
    jobs.filter((job) => job.status === 'Selected').length

  const rejectedCount =
    jobs.filter((job) => job.status === 'Rejected').length

    const interviewRate =
  totalApplications > 0
    ? Math.round(
        (interviewCount / totalApplications) * 100
      )
    : 0

const selectedRate =
  totalApplications > 0
    ? Math.round(
        (selectedCount / totalApplications) * 100
      )
    : 0

const rejectedRate =
  totalApplications > 0
    ? Math.round(
        (rejectedCount / totalApplications) * 100
      )
    : 0
  const filteredJobs = jobs.filter((job) => {

    const searchText =
      `${job.companyName} ${job.jobTitle} ${job.location}`
        .toLowerCase()

    const matchesSearch =
      searchText.includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      job.status === statusFilter

    return matchesSearch && matchesStatus

  })

  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const upcomingInterviews = jobs
    .filter((job) => {

      if (!job.interviewDate) {
        return false
      }

      const interviewDate =
        new Date(`${job.interviewDate}T00:00:00`)

      return interviewDate >= today

    })
    .sort((a, b) =>
      new Date(`${a.interviewDate}T00:00:00`) -
      new Date(`${b.interviewDate}T00:00:00`)
    )

  return (
    <div className="dashboard-page">

      <Navbar />

      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <h1>JobTrack Dashboard</h1>

            {user && (
              <p>
                Welcome back, <strong>{user.name}</strong> 👋
              </p>
            )}

          </div>

          <button
            className="add-job-button"
            onClick={() => navigate('/add-job')}
          >
            + Add Job Application
          </button>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>{totalApplications}</p>
          </div>

          <div className="stat-card">
            <h3>Applied</h3>
            <p>{appliedCount}</p>
          </div>

          <div className="stat-card">
            <h3>Assessments</h3>
            <p>{assessmentCount}</p>
          </div>

          <div className="stat-card">
            <h3>Interviews</h3>
            <p>{interviewCount}</p>
          </div>

          <div className="stat-card">
            <h3>Selected</h3>
            <p>{selectedCount}</p>
          </div>

          <div className="stat-card">
            <h3>Rejected</h3>
            <p>{rejectedCount}</p>
          </div>

        </div>

        {/* Application Analytics */}

<div className="section-card">

  <div className="section-header">

    <div>

      <h2>Application Analytics</h2>

      <p className="analytics-description">
        Overview of your application progress.
      </p>

    </div>

  </div>

  <div className="analytics-grid">

    <div className="analytics-card">

      <div className="analytics-card-header">
        <span>Interview Rate</span>
        <strong>{interviewRate}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${interviewRate}%`
          }}
        ></div>
      </div>

      <p>
        {interviewCount} interview
        {interviewCount !== 1 ? 's' : ''}
        from {totalApplications} application
        {totalApplications !== 1 ? 's' : ''}
      </p>

    </div>

    <div className="analytics-card">

      <div className="analytics-card-header">
        <span>Selection Rate</span>
        <strong>{selectedRate}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${selectedRate}%`
          }}
        ></div>
      </div>

      <p>
        {selectedCount} selected
        {selectedCount !== 1 ? ' applications' : ' application'}
      </p>

    </div>

    <div className="analytics-card">

      <div className="analytics-card-header">
        <span>Rejection Rate</span>
        <strong>{rejectedRate}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${rejectedRate}%`
          }}
        ></div>
      </div>

      <p>
        {rejectedCount} rejected
        {rejectedCount !== 1 ? ' applications' : ' application'}
      </p>

    </div>

  </div>

</div>

       {/* Upcoming Interviews */}

<div className="section-card">

  <div className="section-header">

    <h2>Upcoming Interviews</h2>

    <span>
      {upcomingInterviews.length} scheduled
    </span>

  </div>

  {upcomingInterviews.length === 0 ? (

    <p className="empty-message">
      No interviews scheduled.
    </p>

  ) : (

    <div className="interview-list">

      {upcomingInterviews.map((job) => (

        <div
          className="interview-card"
          key={job.id}
        >

          <div className="interview-main">

            <h3>
              {job.companyName}
            </h3>

            <p>
              {job.jobTitle}
            </p>

            {job.location && (
              <p>
                📍 {job.location}
              </p>
            )}

          </div>

          <div className="interview-details">

            <p>
              📅 {job.interviewDate}
            </p>

            {job.interviewTime && (
              <p>
                🕐 {job.interviewTime}
              </p>
            )}

            {job.interviewRound && (
              <p>
                🔄 {job.interviewRound}
              </p>
            )}

            {job.interviewer && (
              <p>
                👤 {job.interviewer}
              </p>
            )}

          </div>

          <div className="interview-actions">

            <button
              className="edit-button"
              onClick={() =>
                navigate(`/edit-job/${job.id}`)
              }
            >
              Edit
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

        {/* Job Applications */}

        <div className="section-card">

          <div className="section-header">

            <h2>My Job Applications</h2>

          </div>

          <div className="filters">

            <input
              type="text"
              placeholder="Search company, job title or location"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

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

          {filteredJobs.length === 0 ? (

            <p className="empty-message">
              No job applications found.
            </p>

          ) : (

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredJobs.map((job) => (

                    <tr key={job.id}>

                      <td>
                        {job.companyName}
                      </td>

                      <td>
                        {job.jobTitle}
                      </td>

                      <td>
                        {job.jobType}
                      </td>

                      <td>
                        {job.location}
                      </td>

                      <td>
                        {job.appliedDate}
                      </td>

                      <td>

                        <span
                          className={`status status-${job.status.toLowerCase()}`}
                        >
                          {job.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="edit-button"
                          onClick={() =>
                            navigate(`/edit-job/${job.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(job.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard