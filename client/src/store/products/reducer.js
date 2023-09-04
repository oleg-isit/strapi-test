import {createSlice} from '@reduxjs/toolkit'

import {deleteProduct, getAllProducts, updateProduct} from './actions'
import {arrToMap, arrToObj} from "../../utils/request/simple";

export const initialState = {
    entities: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.entities = arrToMap(action.payload.data.data)
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const {id} = action.payload.data;
            state.entities.delete(id)
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const {id, name, description} = action.payload.data;
            state.entities.get(id).attributes.name = name
            state.entities.get(id).attributes.description = description

        })
    }
})

export default productsSlice.reducer
