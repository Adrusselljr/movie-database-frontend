import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

const store = configureStore({
    preloadedState: JSON.parse(window.localStorage.getItem('applicationState')) || {},
    reducer: {
        user: userReducer
    }
})

store.subscribe(() => {
    const state = store.getState()
    window.localStorage.setItem('applicationState', JSON.stringify(state))
})

export default store