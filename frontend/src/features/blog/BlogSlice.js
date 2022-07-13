import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: true,
    blogs: [],
    error: ''
}

export const getBlogs = createAsyncThunk("blogs/getblogs", async (a, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/blogs");
        return data
    } catch (error) {
        console.log(error);
        rejectWithValue(error.response.data)
    }
})


const BlogSliceReducer = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
        })
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
    }
})


export default BlogSliceReducer.reducer