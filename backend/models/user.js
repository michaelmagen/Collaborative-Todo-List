/***************************************************/
/**** Mongo User Schema                        *****/
/***************************************************/

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    minLength: [3, 'Must have length of at least 3, got {VALUE}']
  },
  name: String,
  passwordHash: String,
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List'
    }
  ],
  items: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }
  ]
})

// convert id object to string in returned object
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User