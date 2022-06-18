import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    isTyping: false,
    chatUsers: [],
    numberOfUsers: 0,
    data: [],
    isRead: false,
    typingTo: ""
}

const messagesSlicer = createSlice({
    name: "messages",
    initialState,
    reducers: {
        createSingleChat: (state, action) => {
            /* state.data = [...state.data, action.payload] */
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
            /*  state.data = state.data.filter(item => item._id !== id) */
            state.data.forEach(item => {
                if (item._id === id) {
                    item.chatMessage = <span style={{ fontSize: "12px", color: "gray" }}>` This message has been deleted`</span>
                }
            })
        },
        deleteFullConversation: (state, action) => {
            const id = action.payload
            state.chatUsers = state.chatUsers.filter(item => item._id !== id)
        },
        checkUserOnlineOffline: (state, action) => {
            console.log(action.payload.id);
            state.chatUsers = state.chatUsers.map(user =>
                user._id === action.payload.id ? { ...user, isOnline: true } : { ...user, isOnline: false })
        },
        openTyping: (state, action) => {
            state.isTyping = true;
            state.typingTo = action.payload
        },
        closeTyping: (state, action) => {
            state.isTyping = false
        },
        openRead: (state, action) => {
            state.isRead = true
        },
        closeRead: (state, action) => {
            state.isRead = false
        },
        /* checkUserOffline: (state, action) => {
            state.chatUsers = state.chatUsers.map(user => user !== action.payload)
        } */
    }
})

export const { createSingleChat, createChatUser, fetchChatWith, getBetweenChats, deleteAMessage, deleteFullConversation, checkUserOnlineOffline,
    openTyping, closeTyping, openRead, closeRead
} = messagesSlicer.actions

export default messagesSlicer.reducer