import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: "",
    savedPosts: [],
    result: 0,
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
        updateCurrentStart: (state) => {
            state.authFetching = true
        },
        updateCurrentSuccess: (state, action) => {
            state.authFetching = false;
            state.currentUser = action.payload;
        },
        updateCurrentFail: (state) => {
            state.authFetching = false;
            state.error = true
        },
        savePost: (state, action) => {
            state.savedPosts = [...action.payload.posts]
            state.result = action.payload.result
        }
    }
})

export const { authStart, authSuccess, authFailure, refreshToken, refreshTokenFail, authLogout,
    updateCurrentStart, savePost,
    updateCurrentSuccess, updateCurrentFail
} = currentUserSlicer.actions

export default currentUserSlicer.reducer