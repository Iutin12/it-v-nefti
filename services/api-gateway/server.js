import express from 'express'
import cors from 'cors'

import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'

const app = express()

app.use(cors())

// TODO: auth
app.use((req, res, next) => {
  if (req.headers.authorization) {
  }

  next()
})

app.use(
  '/api/calc',
  createProxyMiddleware({
    target: process.env.NODE_ANALYSIS_MICROSERVICE_URL,
    changeOrigin: true,
    logger: console,
  })
)

app.use(
  '/api/report',
  createProxyMiddleware({ target: process.env.REPORT_MICROSERVICE_URL, changeOrigin: true, logger: console })
)

app.use(
  '/oilfield',
  createProxyMiddleware({
    target: process.env.WELLDATA_MICROSERVICE_URL,
    changeOrigin: true,
    logger: console,
  })
)

app.listen(process.env.PORT, () => {
  console.log(`started api-gateway on localhost:${process.env.PORT}`)
})
