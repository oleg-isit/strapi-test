import { createSlice } from '@reduxjs/toolkit'

import {deleteProduct, getAllProducts, updateProduct} from './actions'
import {arrToObj} from "../../utils/request/simple";

export const initialState = {
    entities: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.entities = arrToObj(action.payload.data.data);
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const {id} = action.payload.data;
            delete state.entities[id]
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const {id, name, description} = action.payload.data;
            state.entities[id].attributes.name = name;
            state.entities[id].attributes.description = description;

        })
    }
})

export default productsSlice.reducer
