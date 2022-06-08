import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifies: [],
    result: 0,
    notifyFetching: false,
    error: false,
    message: "",

}

const notifySlicer = createSlice({
    name: "notify",
    initialState,
    reducers: {
        createNewNotification: (state, action) => {
            state.notifies = [...state.notifies, action.payload]
        }
    }
})

export const { createNewNotification } = notifySlicer.actions

export default notifySlicer.reducer