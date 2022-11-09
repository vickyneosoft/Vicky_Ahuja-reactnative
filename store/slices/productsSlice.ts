import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Product = {
    name: string
}

export interface ProductsState {
    data: Product[]
}

const initialState: ProductsState = {
    data: [],
}

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
        },
    },
})

// Action creators are generated for each case reducer function
export const { getProducts, getProductDetails, addProduct } = productsSlice.actions

export default productsSlice.reducer