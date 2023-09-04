import { createSlice } from '@reduxjs/toolkit'

import {getHeaderContent} from './actions'

export const initialState = {
    header: null
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHeaderContent.fulfilled, (state, action) => {
            state.header = action.payload.data.data
        })
    }
})

export default contentSlice.reducer
