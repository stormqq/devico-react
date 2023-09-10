import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todosSlice/todosSlice'
import filterReducer from './features/filterSlice/filterSlice'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        filter: filterReducer
    }
})
