import { Dimensions } from 'react-native'
import Toast from 'react-native-root-toast';

import { Product } from "../store/slices/productsSlice"

export const customLog = (...params: any[]) => {
    if (__DEV__) {
        console.log(...params)
    }
}

export const keyExtractorHandler = (item: Product, index: number) => item._id

export const { height, width } = Dimensions.get("window")

export const showToast = (message: string, timeout = 1500) => {
    Toast.show(message, {
        duration: timeout,
    })
}