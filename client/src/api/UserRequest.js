import axios from "../Axios/axios";



export const getUser = (id) =>  axios.get(`/getUserDtails/${id}`, {
    headers: {
        "x-access-token": localStorage.getItem("Usertoken"),
    },
})

export const follow = (data) => axios.put('/followUser',data, {
    headers: {
        "x-access-token": localStorage.getItem("Usertoken"),
    },
})

export const unFollow = (data) => axios.put('/unfollowUser',data, {
    headers: {
        "x-access-token": localStorage.getItem("Usertoken"),
    },
})

export const showFollowing = (data) => axios.get(`/following?data=${data}`)

export const showFollower = (data) => axios.get(`/followers?data=${data}`)

export const deletepost = (data)=> axios.delete(`/deletePost/${data}`)

export const reportPost = (data)=> axios.put('/postReport',data)

export const allOnlineUsers = (userId,liveusers)=> axios.post(`/onlineUsers?user=${userId}&liveuser=${liveusers}`)