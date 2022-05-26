import { configureStore } from "@reduxjs/toolkit"

import currentUserSlicer from "./authSlicer"
import profileSlicer from "./profileSlicer"
import usersSlicer from "./usersSlicer"
import postsSlicer from "./postsSlicer"


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlicer,
        profile: profileSlicer,
        users: usersSlicer,
        posts: postsSlicer
    }
})