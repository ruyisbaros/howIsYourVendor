import { createSlice } from "@reduxjs/toolkit"



const initialState = {

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
                    ? { ...user, chatMessage: action.payload.chatMessage, images: action.payload.images }
                    : user
            )
        },
        createChatUser: (state, action) => {
            const user = action.payload
            if (state.chatUsers.every(item => item._id !== user._id)) {
                state.chatUsers = [user, ...state.chatUsers]
            }
        },
        fetchChatWith: (state, action) => {
            state.chatUsers = action.payload
        },
        getBetweenChats: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { createSingleChat, createChatUser, fetchChatWith, getBetweenChats } = messagesSlicer.actions

export default messagesSlicer.reducer