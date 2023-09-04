import { createSlice } from '@reduxjs/toolkit'
import {login} from "../auth/actions";
import {deleteProduct, updateProduct} from "../products/actions";


export const initialState = {
    lastMessage: {},
    auth: null,
    deleteProduct: null,
    updateProduct: null,

}

export const statusesSlice = createSlice({
    name: 'statuses',
    initialState,
    reducers: {
        resetStatus: (state, action) => {
            const status = action.payload;
            state[status] = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.auth = "pending";
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.auth = "success";
            state.lastMessage = {text: "Authorization successfully", type: "success"}

        })
        builder.addCase(login.rejected, (state, action) => {
            state.auth = "error";
            state.lastMessage = {text: action.payload, type: "error"}
        })


        builder.addCase(deleteProduct.pending, (state, action) => {
            state.deleteProduct = "pending";
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.deleteProduct = "success";
            state.lastMessage = {text: "Product deleted successfully", type: "success"}
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.deleteProduct = "error";
            state.lastMessage = {text: action.payload, type: "error"}
        })


        builder.addCase(updateProduct.pending, (state, action) => {
            state.updateProduct = "pending";
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.updateProduct = "success";
            state.lastMessage = {text: "Product updated successfully", type: "success"}
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.updateProduct = "error";
            state.lastMessage = {text: action.payload, type: "error"}
        })

    }
})
export default statusesSlice.reducer
export const {resetStatus} = statusesSlice.actions;
