const itemRouter = require('express').Router()
const User = require('../models/user')
const List = require ('../models/list')
const Item = require('../models/item')
const jwt = require('jsonwebtoken')

// give the list id and we will return the items in that list
itemRouter.get('/:listid', async (request, response) => {
    const list = await List.findById(request.params.listid).populate('items')
    response.json(list.items)
})

// allows us to indicate the id of the list and create a new list item in that list 
itemRouter.post('/:listid', async(request, response) => {
    const body = request.body

    const token = request.token

    console.log(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const list = await List.findById(request.params.listid)
  
    if (!body.content ) {
      response.status(400).json({
        error: 'content is missing'
      })
      return
    }

    const item = new Item({
      content: body.content,
      date: new Date(),
      user: user._id,
      list: list._id
    })
  
    const savedItem = await item.save()
  
    // save the item into the user
    user.items = user.items.concat(savedItem._id)
    await user.save()

    // save the item into the list
    list.items = list.items.concat(savedItem._id)
    await list.save()

    response.status(201).json(savedItem)
})

// allows users that are in the list to delete items
itemRouter.delete('/:id', async(request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
  
    const user = await User.findById(decodedToken.id)
  
    const itemToDelete = await Item.findById(request.params.id)

    const list = await List.findById(itemToDelete.list._id)

    const usersInList = list.users.map(user => user._id.toString())
  
    if ( usersInList.includes( user._id.toString() )) {
      await Item.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: `Unauthorized` })
    }
})

module.exports = itemRouter