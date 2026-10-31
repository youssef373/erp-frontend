import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import api from './api'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  // Authorize private/presence channels with the Sanctum session cookie.
  authorizer: (channel) => ({
    authorize: (socketId, callback) => {
      api
        .post('/api/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name,
        })
        .then((response) => callback(null, response.data))
        .catch((error) => callback(error))
    },
  }),
})

export default echo
