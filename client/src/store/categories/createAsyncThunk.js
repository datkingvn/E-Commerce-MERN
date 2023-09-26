import {createAsyncThunk} from "@reduxjs/toolkit";
import * as APIs from '../../apis'

export const getCategories = createAsyncThunk('categories/categories', async (data, {rejectWithValue}) => {
    const response = await APIs.apiGetCategories();

    if (!response.success) return rejectWithValue(response);
    return response.productCategories;
})