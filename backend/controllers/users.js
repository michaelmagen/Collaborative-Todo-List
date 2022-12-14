const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const List = require ('../models/list')
const Item = require('../models/item')

// get a user in the database
usersRouter.get('/:username', async(request, response) => {
    const user = await User.find({username: request.params.username}).populate('lists').populate('items')
    if (user === null) {
      return response.status(400).json({
        error: 'username not in database'
      })
    }
    response.json(user)
})

usersRouter.get('/id/:id', async(request, response) => {
    const user = await User.findById(request.params.id)
    response.json(user)
})

// create a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Username must be unique'
    })
  }

  if (!password || !name || !username) {
    return response.status(400).json({
        error: 'Password, name, and/or username may not be empty'
    })
  } 
  else if (password.length < 7) {
    return response.status(400).json({
        error: 'Password must be at least 7 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter