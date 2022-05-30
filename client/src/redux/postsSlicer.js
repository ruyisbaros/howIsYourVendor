import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    profilePostFetching: false,
    page: 2,
    result: 0,
    error: false,
    status: false,
    errorMessage: ""
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
            state.posts = action.payload.posts
            state.result = action.payload.result
        },

        postsFetchFail: (state, action) => {
            state.profilePostFetching = false;
            state.error = true
            state.errorMessage = action.payload;
        },
        closeStatus: (state) => {
            state.status = false;
        },
        openStatus: (state) => {
            state.status = true;
        },

        PostCreateStart: (state) => {

            state.profilePostFetching = true
        },
        PostCreateEnd: (state) => {

            state.profilePostFetching = false
        },

        PostCreateSuccess: (state, action) => {
            state.status = false;
            state.profilePostFetching = false
            state.posts = [...state.posts, action.payload];
        },
        PostCreateFail: (state) => {
            state.status = false;
            state.profilePostFetching = false
            state.error = true
        },
    }
})

export const { postsFetchStart, postsFetchSuccess, postsFetchFail, PostCreateStart, PostCreateSuccess,
    PostCreateFail, closeStatus, openStatus, PostCreateEnd } = postsSlicer.actions

export default postsSlicer.reducer