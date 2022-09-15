const listRouter = require('express').Router()
const User = require('../models/user')
const List = require ('../models/list')
const Item = require('../models/item')
const jwt = require('jsonwebtoken')

// get all the lists that a user is a part of 
listRouter.get('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id).populate('lists')

    const lists = user.lists
    response.json(lists)
})
  
// get a specific list by the id
////////////not tested /////////////
listRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const list = await List.findById({id}).populate('creator').populate('users').populate('items')
    response.json(list)
})

/// TODO: add a user to a list

// create a new list for a user
listRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title ) {
    response.status(400).end().json({
      error: 'title is missing'
    })
  }

  const list = new List({
    title: body.title,
    date: new Date(),
    creator: user._id
  })

  list.users = list.users.concat(user._id)
  const savedList = await list.save()

  user.lists = user.lists.concat(savedList._id)
  await user.save()

  response.status(201).json(savedList)
})

// allows a user to delete a list if they are loged in with a token
// currently, this allows any user of the list to delete the list completely, not just the creator of the list
listRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const listToDelete = await List.findById(request.params.id)

  const usersInList = listToDelete.users.map(user => user._id.toString())

  if ( usersInList.includes( user._id.toString() )) {
    await List.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: `Unauthorized` })
  }

})

module.exports = listRouter