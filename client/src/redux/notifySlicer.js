import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifies: [],
    result: 0,
    notifyFetching: false,
    error: false,
    message: "",
    statusNot: false,
}

const notifySlicer = createSlice({
    name: "notify",
    initialState,
    reducers: {
        createNewNotification: (state, action) => {
            state.notifies = [...state.notifies, action.payload]
        },
        deleteANotification: (state, action) => {
            const { _id } = action.payload
            const newNots = state.notifies.filter(not => not._id !== _id)
            state.notifies = newNots
        },
        fetchAllNotifications: (state, action) => {
            state.notifies = action.payload
        },
        openNotifyStatus: (state) => {
            state.statusNot = true
        },
        closeNotifyStatus: (state) => {
            state.statusNot = false
        },

    }
})

export const { createNewNotification, deleteANotification, fetchAllNotifications, openNotifyStatus, closeNotifyStatus } = notifySlicer.actions

export default notifySlicer.reducer