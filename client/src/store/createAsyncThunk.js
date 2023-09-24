import {createAsyncThunk} from "@reduxjs/toolkit";
import * as APIs from '../apis'

export const getCategories = createAsyncThunk('app/categories', async (data, {rejectWithValue}) => {
    const response = await APIs.apiGetCategories();

    if (!response.success) return rejectWithValue(response);
    return response.productCategories;
})