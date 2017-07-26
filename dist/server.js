import fallback from 'express-history-api-fallback'
import express from 'express'
const app = express()
const root = `${__dirname}`
app.use(express.static(root))
app.use(fallback('index.html', { root }))
