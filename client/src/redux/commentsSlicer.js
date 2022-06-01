import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: [],
    error: false,
    status: false,
    errorMessage: "",
    onEdit: false,
    targetOfUpdateComment: {}
}

const commentSlicer = createSlice({
    name: "comments",
    initialState,
    reducers: {
        getComments: (state, action) => {
            state.comments = [action.payload.newComment, ...state.comments];
        },
        createComment: (state, action) => {
            state.comments = [...state.comments, action.payload.newComment];
        },


    }
})

export const { createComment } = commentSlicer.actions

export default commentSlicer.reducer