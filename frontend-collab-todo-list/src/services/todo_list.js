import axios from "axios"

const baseUrl = 'http://localhost:3003/api/'

const getAll = () => {
    return axios.get(baseUrl)
}
  
const create = newObject => {
    return axios.post(baseUrl, newObject)
}
  
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const services = {
    getAll,
    create, 
    update,
    deleteEntry
}
  
export default services