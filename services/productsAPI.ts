import axios, { AxiosRequestConfig } from 'axios'
import constants from '../constants'
import { AddProductType } from '../types'

axios.defaults.baseURL = 'https://upayments-studycase-api.herokuapp.com/api'

axios.interceptors.request.use(
    (request: AxiosRequestConfig<any>) => {
        request.headers = {
            ...request.headers,
            "Authorization": `Bearer ${constants.bearerToken}`
        }
        return request
    },
    (error: any) => {
        throw error
    }
)

export const getProducts = async () => {
    return await axios({
        url: 'products',
        method: 'GET'
    })
}

export const getProductDetails = async (productId: string) => {
    return await axios({
        url: `product`,
        method: 'GET',
        params: {
            id: productId
        }
    })
}

export const addProduct = async (productPayload: AddProductType) => {
    return await axios({
        url: `products`,
        method: 'POST',
        data: productPayload
    })
}

export const getCategories = async () => {
    return await axios({
        url: `categories`,
        method: 'GET'
    })
}