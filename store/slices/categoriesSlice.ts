import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as productAPIs from '../../services/productsAPI'

export type Category = {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface ProductsState {
    data: Category[]
}

const initialState: ProductsState = {
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
    },
    extraReducers(builder) {
        builder.addCase(getCategoriesThunk.pending, (state, action) => {
            // Pending state for getProducts async call
        })
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            // Fulfilled state for getProducts async call
            const { message, categories } = action.payload
            state.data = categories
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            // Rejected state for getProducts async call
        })
    },
})

// Action creators are generated for each case reducer function
// export const {  } = categoriesSlice.actions

export default categoriesSlice.reducer