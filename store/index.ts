import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './slices/categoriesSlice'
import productsSlice from './slices/productsSlice'

export const store = configureStore({
    reducer: {
        products: productsSlice,
        categories: categoriesSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch