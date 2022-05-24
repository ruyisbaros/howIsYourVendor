import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    isFetching: false,
    error: false,
    errorMessage: "",
}

const postsSlicer = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postsFetchStart: (state) => {
            state.isFetching = true;
        },

        postsFetchSuccess: (state, action) => {
            state.isFetching = false;
            state.posts = action.payload
        },

        postsFetchFail: (state, action) => {
            state.isFetching = false;
            state.error = true
            state.errorMessage = action.payload
        },
    }
})

export const { postsFetchStart, postsFetchSuccess, postsFetchFail } = postsSlicer.actions

export default postsSlicer.reducer