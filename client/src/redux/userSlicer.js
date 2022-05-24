import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: "",
    isFetching: false,
    error: false,
    errorMessage: "",
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
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
            state.errorMessage = action.payload
        }
    }
})

export const { loginStart, loginSuccess, loginFailure } = userSlicer.actions

export default userSlicer.reducer