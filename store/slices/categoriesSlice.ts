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
    isLoading: boolean,
    error: string | undefined,
    selectedCategory: Category | null
    data: Category[]
}

const initialState: CategoriesState = {
    isLoading: false,
    error: '',
    selectedCategory: null,
    data: [],
}

export const getCategoriesThunk = createAsyncThunk(
    'categories',
    async () => {
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
            state.isLoading = true
        })
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            const { message, categories } = action.payload
            state.data = categories
            state.isLoading = false
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedCategory } = categoriesSlice.actions

export default categoriesSlice.reducer