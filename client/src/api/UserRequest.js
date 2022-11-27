import axios from "../Axios/axios";

export const getUser = (id) =>  axios.get(`/getUserDtails/${id}`)

export const follow = (data) => axios.put('/followUser',data)

export const unFollow = (data) => axios.put('/unfollowUser',data)