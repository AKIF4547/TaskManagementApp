import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: [],
    reducers:{
        addTask(state, action){
            state.push(action.payload);
        },
        removeTask(state, action){},
        editTask(state, action){},
    }
})

export const { addTask, removeTask, editTask} = taskSlice.actions
export default taskSlice.reducer;