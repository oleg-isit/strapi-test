import { createSlice } from '@reduxjs/toolkit'

import {checkToken, login} from './actions'

export const initialState = {
    isAuth: null,
    userData: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state, action) => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userData')
            state.isAuth = false;
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const {jwt, refreshToken, user} = action.payload.data;
            localStorage.setItem('token', jwt)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('userData', JSON.stringify(user))

            state.isAuth = true
            state.userData = user
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isAuth = false
        })
        builder.addCase(checkToken.fulfilled, (state, action) => {
            const {isAuth, userData} = action.payload.data;
            state.isAuth = isAuth
            state.userData = JSON.parse(userData)
        })
    }
})
export default authSlice.reducer
export const resetAuth = authSlice.actions.reset
