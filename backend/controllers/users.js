const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const List = require ('../models/list')
const Item = require('../models/item')

// get all of the users in the DB
usersRouter.get('/:user', async(request, response) => {
    const users = await User.find({username: request.params.user}).populate('lists').populate('items')
    response.json(users)
})

usersRouter.get('/:id', async(request, response) => {
    const user = await User.findById(request.params.id)

    response.json(user)
})

// create a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (!password) {
    return response.status(400).json({
        error: 'password can not be missing'
    })
  } 
  else if (password.length < 7) {
    return response.status(400).json({
        error: 'password must be at least 7 characters'
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