import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as productAPIs from '../../services/productsAPI'

export type Category = {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface CategoriesState {
    selectedCategory: Category | null
    data: Category[]
}

const initialState: CategoriesState = {
    selectedCategory: null,
    data: [],
}

export const getCategoriesThunk = createAsyncThunk(
    'categories',
    async (state, { getState, requestId }) => {
        // const { currentRequestId, loading } = getState().users
        // if (loading !== 'pending' || requestId !== currentRequestId) {
        //     return
        // }
        const response = await productAPIs.getCategories()
        return response.data
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<Category>) => {
            state.selectedCategory = {
                ...action.payload
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getCategoriesThunk.pending, (state, action) => {
            // Pending state for getCategories async call
        })
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            // Fulfilled state for getCategories async call
            const { message, categories } = action.payload
            state.data = categories
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            // Rejected state for getCategories async call
        })
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedCategory } = categoriesSlice.actions

export default categoriesSlice.reducer