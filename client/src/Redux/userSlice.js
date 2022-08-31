import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        jwtToken: "",
        movie: null
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
        },
        addMovie: (state, action) => {
            state.movie = action.payload
        },
        deleteMovie: state => {
            state.movie = null
        }
    }
})

export const selectUser = state => state.user.user

export const selectToken = state => state.user.jwtToken

export const selectMovie = state => state.user.movie

export const { addUser, addToken, deleteUser, addMovie, deleteMovie } = userSlice.actions

export default userSlice.reducer