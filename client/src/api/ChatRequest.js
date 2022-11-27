import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:4000' })

export const userChats = (id) => API.get(`/chat/${id}`)

export const findChat = (myId, frndId) => API.get(`/chat/find/${myId}/${frndId}`)
