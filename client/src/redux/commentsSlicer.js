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
    name: "comment",
    initialState,
    reducers: {
        createComment: (state, action) => {
            state.comments = [action.payload, ...state.comments];
        }
    }
})

const { } = commentSlicer.actions

export default commentSlicer.reducer