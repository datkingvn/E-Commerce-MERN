import {createSlice} from "@reduxjs/toolkit";
import * as createAsyncThunk from '../products/createAsyncThunk'

export const productSlice = createSlice({
    name: 'product',

    initialState: {
        newProducts: null,
        errorMessage: '',
        isLoading: false
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(createAsyncThunk.getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(createAsyncThunk.getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        builder.addCase(createAsyncThunk.getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    }
})
// export const { } = categorySlice.actions

export default productSlice.reducer