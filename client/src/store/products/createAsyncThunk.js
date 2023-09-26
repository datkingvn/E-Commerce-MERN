import {createAsyncThunk} from "@reduxjs/toolkit";
import * as APIs from '../../apis'

export const getNewProducts = createAsyncThunk('product/newProducts', async (data, {rejectWithValue}) => {
    const response = await APIs.apiGetProducts({sort: '-createdAt'});

    if (!response.success) return rejectWithValue(response);
    return response.productsData;
})