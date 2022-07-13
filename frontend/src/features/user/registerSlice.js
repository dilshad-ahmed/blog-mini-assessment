import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading: true,
    isAuthenticated: false,
    user: {},
    error: ""
}

export const registerUser = createAsyncThunk("register/registerUser", async (userData, { rejectWithValue }) => {

    const config = { headers: { "Content-Type": "application/json" } }
    try {
        const { data } = await axios.post(`/register`, userData, config)
        return data

    } catch (error) {
        throw rejectWithValue(error.response.data)
    }
})

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = ''
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload.error
        })
    }
})

export default registerSlice.reducer;
export const { resetError } = registerSlice.actions