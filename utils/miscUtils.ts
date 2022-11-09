import { Product } from "../store/slices/productsSlice"

export const customLog = (...params: any[]) => {
    if (__DEV__) {
        console.log(...params)
    }
}

export const keyExtractorHandler = (item: Product, index: number) => item._id