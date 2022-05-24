import { configureStore } from "@reduxjs/toolkit"

import userSlicer from "./loginSlicer"
import usersSlicer from "./usersSlicer"
import postsSlicer from "./postsSlicer"


export const store = configureStore({
    reducer: {
        user: userSlicer,
        users: usersSlicer,
        posts: postsSlicer
    }
})