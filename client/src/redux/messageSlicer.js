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
        },
        deleteAMessage: (state, action) => {
            const id = action.payload
            state.data = state.data.filter(item => item._id !== id)
        },
        deleteFullConversation: (state, action) => {
            const id = action.payload
            state.chatUsers = state.chatUsers.filter(item => item._id !== id)
        }
    }
})

export const { createSingleChat, createChatUser, fetchChatWith, getBetweenChats, deleteAMessage, deleteFullConversation } = messagesSlicer.actions

export default messagesSlicer.reducer