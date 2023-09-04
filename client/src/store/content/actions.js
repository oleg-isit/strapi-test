import { createAsyncThunk } from '@reduxjs/toolkit'
import {API} from "../../api";

export const getHeaderContent = createAsyncThunk(
    'header/get',
    async (data, thunkApi) => {
        try {
            const res = await API.content.getHeaderContent({query: {populate: "*"}});
            return { data: res }
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)
