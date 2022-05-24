import { createSlice, createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit"

const initialState = {
    user: "",
    isFetching: false,
    error: false,
    message: "",
    token: "",
}

const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isFetching = true
        },
        authSuccess: (state, action) => {
            state.isFetching = false;
            state.user = action.payload.user;
            state.token = action.payload.token
            state.message = action.payload.message
        },
        authFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
            state.message = action.payload
        },
        refreshToken: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user;
        },
        refreshTokenFail: (state, action) => {
            state.error = true
            state.message = action.payload
        },
        authLogout: (state, action) => {
            state.isFetching = false;
            state.user = "";
            state.token = ""
            state.message = ""
            state.error = false;
        }
    }
})

export const { authStart, authSuccess, authFailure, refreshToken, refreshTokenFail, authLogout } = userSlicer.actions

export default userSlicer.reducer