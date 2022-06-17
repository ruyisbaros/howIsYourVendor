import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: "",
    savedPosts: [],
    socket: "",
    result: 0,
    authFetching: false,
    error: false,
    message: "",
    token: "",
    isOnline: false
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
            state.isOnline = false
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
        },
        getSocket: (state, action) => {
            state.socket = action.payload
        },
        currentUserFollowUnFollowUpdates: (state, action) => {
            state.currentUser = { ...state.currentUser, followings: action.payload.followings, followers: action.payload.followers };
        },
    }
})

export const { authStart, authSuccess, authFailure, refreshToken, refreshTokenFail, authLogout,
    updateCurrentStart, savePost, getSocket, currentUserFollowUnFollowUpdates,
    updateCurrentSuccess, updateCurrentFail
} = currentUserSlicer.actions

export default currentUserSlicer.reducer