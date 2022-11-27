import { createSlice } from '@reduxjs/toolkit'
const defaultUser = JSON.parse(localStorage.getItem('User'))



if (defaultUser) {
    var { _id, fullname, UserName, email, image, report_status, followers, following } = defaultUser
} else {

}
// _id,name, email, profilePicture,status,coverPicture,connections

const UserSlice = createSlice({
    name: 'User',
    initialState: {
        _id,
        fullname,
        UserName,
        email,
        image,
        report_status,
        followers,
        following,
    },
    reducers: {
        login: (state, action) => {
            state._id = action.payload._id
            state.fullname = action.payload.fullname
            state.UserName = action.payload.UserName
            state.email = action.payload.email
            state.image = action.payload.image
            state.report_status = action.payload.report_status
            state.followers = action.payload.followers
            state.following = action.payload.following
        },
        logout: (state) => { state = {} }
    },
});


export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;