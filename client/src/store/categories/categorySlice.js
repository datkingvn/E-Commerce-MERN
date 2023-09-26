import {createSlice} from "@reduxjs/toolkit";
import * as createAsyncThunk from './createAsyncThunk'

export const categorySlice = createSlice({
    name: 'app',

    initialState: {
        categories: null,
        isLoading: false
    },
    reducers: {

    },
    // Code logic xử lý async action
    extraReducers: (builder) => {
        // (Promise pending)
        builder.addCase(createAsyncThunk.getCategories.pending, (state) => {
            state.isLoading = true;
        });

        // Thành công (Promise fulfilled)
        builder.addCase(createAsyncThunk.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        // Thất bại (Promise rejected)
        builder.addCase(createAsyncThunk.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    }
})
// export const { } = categorySlice.actions

export default categorySlice.reducer