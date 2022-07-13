import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    loading: true,
    isAuthenticated: '',
    user: {},
    error: null
}

//login actions pending, fulfilled, rejected

export const userLogin = createAsyncThunk("login/userLogin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }
        const { data } = await axios.post(`/login`, { email, password }, config)
        return data

    } catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.data)
    }
})


//load user
export const loadUser = createAsyncThunk("login/loadUser", async (a, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`/loaduser`, { withCredentials: true, credentials: "include" })
        return data

    } catch (error) {
        throw rejectWithValue(error.response.data)
    }
})

// logout user
export const logoutUser = createAsyncThunk("login/logoutUser", async () => {
    return axios
        .get(`/logout`, { withCredentials: true, credentials: "include" }
        )
        .then((response) => {
            console.log("loaud user response===>", response);
            return response.data
        })
})

// register User
export const registerUser = createAsyncThunk("register/registerUser", async (userData, { rejectWithValue }) => {

    const config = { headers: { "Content-Type": "application/json" } }
    try {
        const { data } = await axios.post(`/register`, userData, config)
        return data

    } catch (error) {
        throw rejectWithValue(error.response.data)
    }
})


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = ''
        }
    },
    extraReducers: (builder) => {

        //login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = ''
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.error = action.payload.message
        })


        //load user
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = ''
        })
        builder.addCase(loadUser.rejected, (state) => {
            state.error = ''
            state.isAuthenticated = false
            state.user = {}
        })



        //logut user
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = ''
        })
        builder.addCase(logoutUser.rejected, (state) => {
            state.error = ""
        })

        //register user
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
            state.error = action.payload.message
        })

    }
})

export default loginSlice.reducer;
export const { resetError } = loginSlice.actions;