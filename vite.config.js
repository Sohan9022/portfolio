import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import handler from './api/ask-nova.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
  }

  return {
    plugins: [
      react(),
      {
        name: 'api-ask-nova-dev',
        configureServer(server) {
          server.middlewares.use('/api/ask-nova', (req, res) => {
            if (req.method === 'POST') {
              let body = ''
              req.on('data', chunk => { body += chunk })
              req.on('end', async () => {
                try {
                  req.body = JSON.parse(body || '{}')
                  res.status = (code) => {
                    res.statusCode = code
                    return res
                  }
                  res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                  }
                  await handler(req, res)
                } catch (e) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: e.message }))
                }
              })
            } else {
              res.statusCode = 405
              res.end('Method Not Allowed')
            }
          })
        }
      }
    ]
  }
})
