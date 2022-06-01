import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    profilePostFetching: false,
    page: 2,
    result: 0,
    error: false,
    status: false,
    errorMessage: "",
    onEdit: false,
    targetOfUpdatePost: {}
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
            state.posts = [action.payload, ...state.posts];
        },
        PostCreateFail: (state) => {
            state.status = false;
            state.profilePostFetching = false
            state.error = true
        },
        postUpdate: (state, action) => {
            const id = action.payload
            state.targetOfUpdatePost = state.posts.find(pst => pst._id === id);
            state.status = true;
            state.onEdit = true;
        },
        postUpdateDone: (state, action) => {
            state.status = false;
            state.onEdit = false;
        },
        postLikeUpdate: (state, action) => {

            let likedPost = action.payload

            state.posts.forEach(pst => {  //Using Map has risks. forEach has only side effect!!
                if (pst._id === likedPost._id) {
                    pst.likes = likedPost.likes
                }
            })
        },
        postCommentUpdate: (state, action) => {

            let updatedComment = action.payload
            //console.log(commentedPost);
            state.posts.forEach(pst => {  //Using Map has risks. forEach has only side effect!!
                pst.comments.forEach(cmt => {
                    if (cmt._id === updatedComment._id) {
                        cmt.content = updatedComment.content
                    }
                })
            })

        },
        postCommentLikeUpdate: (state, action) => {

            let updatedComment = action.payload
            //console.log(commentedPost);
            state.posts.forEach(pst => {  //Using Map has risks. forEach has only side effect!!
                pst.comments.forEach(cmt => {
                    if (cmt._id === updatedComment._id) {
                        cmt.likes = [...updatedComment.likes]
                    }
                })
            })

        },

    }
})

export const { postsFetchStart, postsFetchSuccess, postsFetchFail, PostCreateStart, PostCreateSuccess,
    PostCreateFail, closeStatus, openStatus, PostCreateEnd, postUpdate, postUpdateDone, postLikeUpdate,
    postCommentUpdate, postCommentLikeUpdate
} = postsSlicer.actions

export default postsSlicer.reducer