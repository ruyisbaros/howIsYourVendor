import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifies: [],
    notifyFetching: false,
    error: false,
    statusNot: false,
    alert: false,
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
        },
        isReadUpdate: (state, action) => {
            const updatedNotify = action.payload
            state.notifies.forEach(not => {
                if (not._id === updatedNotify._id) {
                    not.isRead = true
                }
            })
        },
        openAlert: (state, action) => {
            state.alert = true
        },
        closeAlert: (state, action) => {
            state.alert = false;
        }

    }
})

export const { createNewNotification, deleteANotification, fetchAllNotifications, openNotifyStatus, closeNotifyStatus, deleteAllANotifications,
    isReadUpdate, openAlert, closeAlert
} = notifySlicer.actions

export default notifySlicer.reducer