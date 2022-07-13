import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading: true,
    blog: {},
    isCreated: false,
    error: ""
}

export const createBlog = createAsyncThunk("newBlog/createBlog", async (blogData, { rejectWithValue }) => {

    const config = { headers: { "Content-Type": "application/json" } }
    try {
        const { data } = await axios.post(`/blog/new`, blogData, config)
        return data

    } catch (error) {
        throw rejectWithValue(error.response.data)
    }
})

const createBlogSlice = createSlice({
    name: 'newBlog',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = '';
            state.isCreated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBlog.pending, (state) => {
            state.loading = true;
            state.isCreated = false;
        })
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.blog;
            state.isCreated = true;
            state.error = ''
        })
        builder.addCase(createBlog.rejected, (state, action) => {
            state.error = action.payload.error
        })
    }
})

export default createBlogSlice.reducer;
export const { resetError } = createBlogSlice.actions