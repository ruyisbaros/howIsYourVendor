import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: "",
    isFetching: false,
    error: false,
    message: "",
    token: "",
}

const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.user = action.payload.user;
            state.token = action.payload.token
            state.message = action.payload.message
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
            state.message = action.payload
        }
    }
})

export const { loginStart, loginSuccess, loginFailure } = userSlicer.actions

export default userSlicer.reducer