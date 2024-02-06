import { configureStore } from "@reduxjs/toolkit"
import {allTasks, createTask} from "./actions"

export const store = configureStore({
    reducer:{
        allTasks, createTask
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 300 },
        serializableCheck: { warnAfter: 350 },
         })
})