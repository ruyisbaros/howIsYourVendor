import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    suggestions: [],
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
        fetchSuggestions: (state, action) => {
            state.suggestions = action.payload.users
        }
    }
})

export const { usersFetchStart, usersFetchSuccess, usersFetchFail, fetchSuggestions } = usersSlicer.actions

export default usersSlicer.reducer