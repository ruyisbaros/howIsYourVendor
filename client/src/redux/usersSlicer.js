import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    isFetching: false,
    error: false,
    message: "",
}

const usersSlicer = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersFetchStart: (state) => {
            state.isFetching = true;
        },

        usersFetchSuccess: (state, action) => {
            state.isFetching = false;
        },

        usersFetchFail: (state, action) => {
            state.isFetching = true;
        },
    }
})

export const { } = usersSlicer.actions

export default usersSlicer.reducer