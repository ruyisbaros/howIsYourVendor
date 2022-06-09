import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifies: [],
    result: 0,
    notifyFetching: false,
    error: false,
    message: "",
    statusNot: false,
    sound: false,
}

const notifySlicer = createSlice({
    name: "notify",
    initialState,
    reducers: {
        createNewNotification: (state, action) => {
            state.notifies = [action.payload, ...state.notifies]
        },
        deleteANotification: (state, action) => {
            const id = action.payload
            const newNots = state.notifies.filter(not => not._id !== id)
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
        deleteAllANotifications: (state, action) => {
            state.notifies = []
        }

    }
})

export const { createNewNotification, deleteANotification, fetchAllNotifications, openNotifyStatus, closeNotifyStatus, deleteAllANotifications } = notifySlicer.actions

export default notifySlicer.reducer