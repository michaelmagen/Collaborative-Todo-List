import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const getUser = async username => {
    const response = await axios.get(`${baseUrl}/${username}`)
    return response.data
}


const userService = {
    createUser,
    getUser
}

export default userService