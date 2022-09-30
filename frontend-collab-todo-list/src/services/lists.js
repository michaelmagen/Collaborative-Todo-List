import axios from 'axios'
const baseUrlList = '/api/lists'
const baseUrlItem = '/api/items'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addListUser = async (id, newUsername) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrlList}/user/${id}`, newUsername, config)
  return response.data
}

const createList = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrlList, newObject, config)
  return response.data
}

const getList = async id => {
  const response = await axios.get(`${baseUrlList}/${id}`)
  return response.data
}

const deleteList = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrlList}/${id}`, config)
  return response.data
}

const createItem = async (newObject, listId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrlItem}/${listId}`, newObject, config)
  return response.data
}

const deleteItem = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrlItem}/${id}`, config)
  return response.data
}

const listService = {
  createList,
  setToken,
  getList,
  deleteList,
  createItem,
  deleteItem,
  addListUser
}

export default listService