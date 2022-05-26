import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"

const initialState = {
    profile: "",
    profilePosts: [],
    profileFetching: false,
    error: false,
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
            state.profile = action.payload;
        },
        profileFailure: (state, action) => {
            state.profileFetching = false;
            state.error = true
            state.message = action.payload
        },

    }
})

export const { profileStart, profileSuccess, profileFailure } = profileSlicer.actions

export default profileSlicer.reducer