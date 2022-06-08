import { configureStore } from "@reduxjs/toolkit"

import currentUserSlicer from "./authSlicer"
import profileSlicer from "./profileSlicer"
import usersSlicer from "./usersSlicer"
import postsSlicer from "./postsSlicer"
import commentsSlicer from "./commentsSlicer"
import notifiesSlicer from "./notifySlicer"


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlicer,
        profile: profileSlicer,
        users: usersSlicer,
        posts: postsSlicer,
        comments: commentsSlicer,
        notifies: notifiesSlicer,

    }
})