import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as productAPIs from '../../services/productsAPI'
import { Category, setSelectedCategory } from './categoriesSlice'

export type Product = {
    _id: string,
    name: string,
    avatar: string,
    description: string,
    price: number,
    category: string,
    developerEmail: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface ProductsState {
    data: Product[]
    filteredData: Product[]
}

const initialState: ProductsState = {
    data: [],
    filteredData: []
}

export const getProductsThunk = createAsyncThunk(
    'products',
    async (state, { getState, requestId }) => {
        const response = await productAPIs.getProducts()
        return response.data
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: () => {

        },
        getProductDetails: (state, action: PayloadAction<number>) => {

        },
        addProduct: (state, action: PayloadAction<number>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.value += action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getProductsThunk.pending, (state, action) => {
            // Pending state for getProducts async call
        })
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            // Fulfilled state for getProducts async call
            const { message, products } = action.payload
            state.data = products
        })
        builder.addCase(getProductsThunk.rejected, (state, action) => {
            // Rejected state for getProducts async call
        })
        builder.addMatcher((action: PayloadAction<Category | any>) => {
            return action.type.endsWith('/setSelectedCategory')
        }, (state, action: PayloadAction<Category>) => {
            state.filteredData = state.data.filter(product => product.category.trim().toLowerCase() === action.payload.name.trim().toLowerCase())
        })
    },
})

// Action creators are generated for each case reducer function
export const { getProducts, getProductDetails, addProduct } = productsSlice.actions

export default productsSlice.reducer