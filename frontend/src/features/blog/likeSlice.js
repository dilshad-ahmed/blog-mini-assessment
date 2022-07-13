import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading: true,
    isLiked: false,
    message: "",
    error: ""
}

export const likeBlog = createAsyncThunk("like/likeBlog", async (id, { rejectWithValue }) => {

    const config = { headers: { "Content-Type": "application/json" } }
    try {
        const { data } = await axios.put(`/like`, { BlogId: id }, config)
        return data

    } catch (error) {
        throw rejectWithValue(error.response.data)
    }
})


const likeBlogSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = '';
        },
        resetLiked: (state) => {
            state.isLiked = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(likeBlog.pending, (state) => {
            state.loading = true;
            state.isLiked = false;
        })
        builder.addCase(likeBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.isLiked = true;
            state.message = action.payload.message
            state.error = ''
        })
        builder.addCase(likeBlog.rejected, (state, action) => {
            state.error = action.payload.message
        })
    }
})

export default likeBlogSlice.reducer;
export const { resetError, resetLiked } = likeBlogSlice.actions