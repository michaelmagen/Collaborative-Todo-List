/***************************************************/
/**** API server application                   *****/
/***************************************************/

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const listRouter = require('./controllers/lists')
const itemRouter = require('./controllers/items')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('express-async-errors')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

// install middleware and cors
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(middleware.tokenExtractor)

// install routes
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/lists', listRouter)
app.use('/api/items', itemRouter)

// install error handeling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app