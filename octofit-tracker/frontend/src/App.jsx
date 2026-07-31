import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function inferCodespaceNameFromHost() {
  if (typeof window === 'undefined') {
    return ''
  }

  const hostMatch = window.location.hostname.match(
    /^([a-z0-9-]+)-5173\.app\.github\.dev$/i,
  )
  return hostMatch?.[1] ?? ''
}

function App() {
  const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() ?? ''
  const inferredCodespaceName = inferCodespaceNameFromHost()
  const resolvedCodespaceName = configuredCodespaceName || inferredCodespaceName

  const apiBaseUrl = resolvedCodespaceName
    ? `https://${resolvedCodespaceName}-8000.app.github.dev/api`
    : '/api'

  const missingCodespaceName = !configuredCodespaceName
  const inferredFallbackInUse = !configuredCodespaceName && !!inferredCodespaceName

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-1">Octofit Tracker</h1>
        <p className="text-body-secondary mb-3">
          Multi-tier fitness tracking dashboard
        </p>

        <nav className="nav nav-pills flex-wrap gap-2">
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      {inferredFallbackInUse && (
        <div className="alert alert-warning" role="alert">
          VITE_CODESPACE_NAME is not set. Using a hostname-based fallback:
          {' '}
          <strong>{resolvedCodespaceName}</strong>
        </div>
      )}

      {missingCodespaceName && !inferredFallbackInUse && (
        <div className="alert alert-info" role="alert">
          VITE_CODESPACE_NAME is not set and no Codespaces hostname was detected.
          Falling back to relative API URLs.
        </div>
      )}

      <Routes>
        <Route
          path="/activities"
          element={<Activities apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard apiBaseUrl={apiBaseUrl} />}
        />
        <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
        <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
        <Route
          path="/workouts"
          element={<Workouts apiBaseUrl={apiBaseUrl} />}
        />
        <Route path="/" element={<Navigate to="/activities" replace />} />
      </Routes>
    </div>
  )
}

export default App
