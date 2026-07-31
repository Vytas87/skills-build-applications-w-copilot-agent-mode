import { useEffect, useMemo, useState } from 'react'

function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  return []
}

function extractPageInfo(payload) {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return null
  }

  const count = payload.count ?? payload.total ?? null
  const next = payload.next ?? null
  const previous = payload.previous ?? null

  if (count === null && !next && !previous) {
    return null
  }

  return { count, next, previous }
}

function toDisplayValue(value) {
  if (value === null || value === undefined) {
    return 'N/A'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

export default function Workouts() {
  const endpoint = '/api/workouts/'
  const [items, setItems] = useState([])
  const [pageInfo, setPageInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setItems(extractItems(payload))
          setPageInfo(extractPageInfo(payload))
        }
      } catch (fetchError) {
        if (!ignore) {
          setItems([])
          setPageInfo(null)
          setError(fetchError instanceof Error ? fetchError.message : 'Unknown error')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [endpoint])

  const columns = useMemo(() => {
    if (!items.length) {
      return []
    }

    return Object.keys(items[0]).slice(0, 6)
  }, [items])

  return (
    <section>
      <h2 className="mb-2">Workouts</h2>
      <p className="text-body-secondary">Endpoint: {endpoint}</p>

      {loading && <div className="alert alert-secondary">Loading workouts...</div>}

      {error && (
        <div className="alert alert-danger" role="alert">
          Failed to load workouts: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-info">No workout records found.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={`${item._id ?? item.id ?? index}-${column}`}>
                      {toDisplayValue(item[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pageInfo && (
        <div className="small text-body-secondary">
          Count: {pageInfo.count ?? 'N/A'} | Has previous page: {pageInfo.previous ? 'Yes' : 'No'}
          {' '}| Has next page: {pageInfo.next ? 'Yes' : 'No'}
        </div>
      )}
    </section>
  )
}