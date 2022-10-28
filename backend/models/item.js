/***************************************************/
/**** Mongo To-do Item Schema                  *****/
/***************************************************/

const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    content: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }
})

// convert id object to string in returned object
itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Item', itemSchema)