import { createAsyncThunk } from '@reduxjs/toolkit'
import {API} from "../../api";


export const checkToken = createAsyncThunk(
    'auth/localAuth',
    async (data, thunkApi) => {
        try {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("userData");

            return {data: {isAuth: !!token, userData}}

        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/Login',
    async ({identifier, password}, thunkApi) => {
        try {
            const res = await API.auth.login({ body: {identifier, password}});
            return { data: res }
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

