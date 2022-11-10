import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as productAPIs from '../../services/productsAPI'
import { Category } from './categoriesSlice'
import { AddProductAPIResponse, AddProductType, GetProductsAPIResponse } from '../../types'
import { customLog } from '../../utils/miscUtils'

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
    isLoading: boolean,
    error: string | undefined,
    data: Product[]
    filteredData: Product[]
}

const initialState: ProductsState = {
    isLoading: false,
    error: '',
    data: [],
    filteredData: []
}

export const getProductsThunk = createAsyncThunk<GetProductsAPIResponse>(
    'products',
    async () => {
        const response = await productAPIs.getProducts()
        return response.data
    }
)

export const addProductsThunk = createAsyncThunk<AddProductAPIResponse, AddProductType>(
    'addProduct',
    async (payload) => {
        const response = await productAPIs.addProduct(payload)
        return response.data
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        /**
         * getProductsThunk
         */
        builder.addCase(getProductsThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            const { message, products } = action.payload
            state.isLoading = false
            state.data = products
        })
        builder.addCase(getProductsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        /**
         * addProductsThunk
         */
        builder.addCase(addProductsThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addProductsThunk.fulfilled, (state, action) => {
            const { message, product } = action.payload
            state.data = [product, ...state.data]
            state.isLoading = false
        })
        builder.addCase(addProductsThunk.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        builder.addMatcher((action: PayloadAction<Category | any>) => {
            return action.type.endsWith('/setSelectedCategory')
        }, (state, action: PayloadAction<Category>) => {
            state.filteredData = state.data.filter(product => product.category.trim().toLowerCase() === action.payload.name.trim().toLowerCase())
        })
    },
})

// Action creators are generated for each case reducer function
// export const {  } = productsSlice.actions

export default productsSlice.reducer