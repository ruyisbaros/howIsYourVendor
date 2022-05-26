import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    usersFetching: false,
    error: false,
    message: "",
}

const usersSlicer = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersFetchStart: (state) => {
            state.usersFetching = true;
        },

        usersFetchSuccess: (state, action) => {
            state.usersFetching = false;
            state.users = action.payload
        },

        usersFetchFail: (state, action) => {
            state.usersFetching = false;
            state.error = true;
        },
    }
})

export const { usersFetchStart, usersFetchSuccess, usersFetchFail } = usersSlicer.actions

export default usersSlicer.reducer