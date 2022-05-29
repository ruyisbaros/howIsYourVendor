import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    profilePostFetching: false,
    error: false,
    status: false,
    message: "",
}

const postsSlicer = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postsFetchStart: (state) => {
            state.profilePostFetching = true;
        },

        postsFetchSuccess: (state, action) => {
            state.profilePostFetching = false;
            state.posts = action.payload
        },

        postsFetchFail: (state, action) => {
            state.profilePostFetching = false;
            state.error = true
            state.errorMessage = action.payload
        },

        PostCreateStart: (state) => {
            state.status = true;
        },
        closeStatus: (state) => {
            state.status = false;
        },
        PostCreateSuccess: (state, action) => {
            state.status = false;
            state.posts = [...state.posts, action.payload];
        },
        PostCreateFail: (state, action) => {
            state.status = false;
            state.error = true
        },
    }
})

export const { postsFetchStart, postsFetchSuccess, postsFetchFail, PostCreateStart, PostCreateSuccess,
    PostCreateFail, closeStatus } = postsSlicer.actions

export default postsSlicer.reducer