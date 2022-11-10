import { NativeStackNavigationOptions } from "@react-navigation/native-stack"

export type CustomStackType = {
    name: string
    component: React.FC<any>
    options: NativeStackNavigationOptions
}
