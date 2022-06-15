import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chatWith: [],
    chatUsers: [],
    numberOfUsers: 0,
    data: [],

}

const messagesSlicer = createSlice({
    name: "messages",
    initialState,
    reducers: {
        createSingleChat: (state, action) => {
            state.data = [...state.data, action.payload]
            state.chatUsers = state.chatUsers.map(user =>
                user._id === action.payload.recipient || user._id === action.payload.sender
                    ? { ...user, text: action.payload.chatMessage, media: action.payload.images }
                    : user
            )
        },
        createChatUser: (state, action) => {
            const user = action.payload
            if (state.chatUsers.every(item => item._id !== user._id)) {
                state.chatUsers = [user, ...state.chatUsers]
            }


        }
    }
})

export const { createSingleChat, createChatUser } = messagesSlicer.actions

export default messagesSlicer.reducer