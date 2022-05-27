import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"

const initialState = {
    currentUser: "",
    authFetching: false,
    error: false,
    message: "",
    token: "",
}

const currentUserSlicer = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        authStart: (state) => {
            state.authFetching = true
        },
        authSuccess: (state, action) => {
            state.authFetching = false;
            state.currentUser = action.payload.currentUser;
            state.token = action.payload.token
            state.message = action.payload.message
        },
        authFailure: (state, action) => {
            state.authFetching = false;
            state.error = true
            state.message = action.payload
        },
        refreshToken: (state, action) => {
            state.token = action.payload.token
            state.currentUser = action.payload.currentUser;
        },
        refreshTokenFail: (state, action) => {
            state.error = true
            state.message = action.payload
        },
        authLogout: (state, action) => {
            state.authFetching = false;
            state.currentUser = "";
            state.token = ""
            state.message = ""
            state.error = false;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const { authStart, authSuccess, authFailure, refreshToken, refreshTokenFail, authLogout, updateCurrentUser } = currentUserSlicer.actions

export default currentUserSlicer.reducer