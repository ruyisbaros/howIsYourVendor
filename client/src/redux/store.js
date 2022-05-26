import { configureStore } from "@reduxjs/toolkit"

import userSlicer from "./authSlicer"
import profileSlicer from "./profileSlicer"
import usersSlicer from "./usersSlicer"
import postsSlicer from "./postsSlicer"


export const store = configureStore({
    reducer: {
        user: userSlicer,
        profile: profileSlicer,
        users: usersSlicer,
        posts: postsSlicer
    }
})