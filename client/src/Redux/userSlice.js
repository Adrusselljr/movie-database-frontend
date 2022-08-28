import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        jwtToken: ""
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        addToken: (state, action) => {
            state.jwtToken = action.payload
        },
        deleteUser: state => {
            state.user = null
            state.jwtToken = ""
        }
    }
})

export const selectUser = state => state.user.user

export const selectToken = state => state.user.jwtToken

export const { addUser, addToken, deleteUser } = userSlice.actions

export default userSlice.reducer