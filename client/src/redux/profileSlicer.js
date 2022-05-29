import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"

const initialState = {
    profile: {},
    profilePosts: [],
    profileFetching: false,
    error: false,
    message: ""
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


    }
})

export const { profileStart, profileSuccess, profileFailure, profileFollowUnFollowUpdates,
} = profileSlicer.actions

export default profileSlicer.reducer