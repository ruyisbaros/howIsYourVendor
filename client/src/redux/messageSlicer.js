import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chatWith: "",
    chatUsers: [],
    numberOfUsers: 0,
    data: [],

}

const messagesSlicer = createSlice({
    name: "messages",
    initialState,
    reducers: {
        createSingleChat: (state, action) => {
            state.chatWith = action.payload
        },
        createChat: (state, action) => {
            const user = action.payload
            if (state.chatUsers.every(item => item._id !== user._id)) {
                state.chatUsers = [user, ...state.chatUsers]
            }


        }
    }
})

export const { createSingleChat, createChat } = messagesSlicer.actions

export default messagesSlicer.reducer