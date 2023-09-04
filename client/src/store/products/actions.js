import { createAsyncThunk } from '@reduxjs/toolkit'
import {API} from "../../api";

export const getAllProducts = createAsyncThunk(
    'products/get',
    async (data, thunkApi) => {
        try {
            const res = await API.products.getAll({query: {populate: "*"}});
            return { data: res }
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'products/update',
    async ({id, name, description}, thunkApi) => {
        try {
            await API.products.update({path: {id}, body: {data: {name, description}}});
            return { data: {id, name, description} }
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async ({id}, thunkApi) => {
        try {
            await API.products.delete({path: {id}});
            return { data: {id} }
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

