const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: String,
    date: Date,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
})

listSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('List', listSchema)