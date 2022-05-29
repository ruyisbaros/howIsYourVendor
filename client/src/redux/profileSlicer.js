import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"

const initialState = {
    profile: {},
    profilePosts: [],
    profileFetching: false,
    profilePostFetching: false,
    error: false,
    status: false,
    message: "",

}

const profileSlicer = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileStart: (state) => {
            state.profileFetching = true
        },
        profileSuccess: (state, action) => {
            state.profileFetching = false;
            state.profile = { ...state.profile, ...action.payload };
        },
        profileFailure: (state, action) => {
            state.profileFetching = false;
            state.error = true
            state.message = action.payload
        },
        profileFollowUnFollowUpdates: (state, action) => {
            state.profile = { ...state.profile, followings: action.payload.followings, followers: action.payload.followers };
        },
        profilePostFetchStart: (state) => {
            state.profilePostFetching = true;
        },
        profilePostFetchSuccess: (state, action) => {
            state.profilePostFetching = false;
            state.profilePosts = [...state.profilePosts, action.payload];
        },
        profilePostFetchFail: (state, action) => {
            state.profilePostFetching = false;
            state.error = true
        },
        profilePostCreateStart: (state) => {
            state.status = true;
        },
        closeProfileStatus: (state) => {
            state.status = false;
        },
        profilePostCreateSuccess: (state, action) => {
            state.status = false;
            state.profilePosts = [...state.profilePosts, action.payload];
        },
        profilePostCreateFail: (state, action) => {
            state.status = false;
            state.error = true
        },

    }
})

export const { profileStart, profileSuccess, profileFailure, profileFollowUnFollowUpdates,
    profilePostFetchStart, profilePostFetchSuccess, profilePostFetchFail, profilePostCreateStart,
    profilePostCreateSuccess, profilePostCreateFail, closeProfileStatus
} = profileSlicer.actions

export default profileSlicer.reducer