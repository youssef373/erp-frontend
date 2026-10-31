import { useEffect, useState } from 'react'
import api from '../lib/api'
import echo from '../lib/echo'

// Dev aid: shows whether the API and the Reverb websocket are reachable.
function ConnectionStatus() {
  const [apiStatus, setApiStatus] = useState('checking…')
  const [wsStatus, setWsStatus] = useState(
    echo.connector.pusher.connection.state,
  )

  useEffect(() => {
    api
      .get('/api')
      .then(({ data }) => setApiStatus(`${data.status} (Laravel ${data.laravel})`))
      .catch((error) => setApiStatus(`error: ${error.message}`))

    const connection = echo.connector.pusher.connection
    const onChange = ({ current }) => setWsStatus(current)
    connection.bind('state_change', onChange)
    return () => connection.unbind('state_change', onChange)
  }, [])

  return (
    <p data-testid="connection-status">
      API: <code>{apiStatus}</code> · Reverb: <code>{wsStatus}</code>
    </p>
  )
}

export default ConnectionStatus
