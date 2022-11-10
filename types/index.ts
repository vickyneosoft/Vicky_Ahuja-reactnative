import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { Product } from "../store/slices/productsSlice"

export type CustomStackType = {
    name: string
    component: React.FC<any>
    options: NativeStackNavigationOptions
}

export type AddProductType = {
    name: string
    price: string
    category: string
    description: string
    avatar: string
    developerEmail: string
}

export type GetProductsAPIResponse = {
    message: string, products: Product[]
}

export type AddProductAPIResponse = {
    message: string, product: Product
}