import { configureStore } from "@reduxjs/toolkit";
import TasksSlice from './TasksSlice'

 const store = configureStore({
    reducer:{
        tasks: TasksSlice,
    }
})

export default store;