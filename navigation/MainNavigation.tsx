import React, { useCallback, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

// Types
import { CustomStackType } from '../types';

const Stack = createNativeStackNavigator()

const stacks: CustomStackType[] = [
    {
        name: 'products',
        component: ProductsScreen,
        options: {
            headerTitle: 'UPayments Store',
        }
    },
    {
        name: 'addProduct',
        component: AddProductScreen,
        options: {
            headerTitle: 'Add Product',
        }
    }, {
        name: 'productDetails',
        component: ProductDetailsScreen,
        options: {
            headerTitle: 'Product Details',
        }
    },
]

const rootStackOptions = {
    headerShadowVisible: false
}

function MainNavigation() {
    const renderStacksHandler = useCallback((stackItemObject: CustomStackType) => {
        return (
            <Stack.Screen
                key={stackItemObject.name}
                {...stackItemObject}
            />
        )
    }, [])

    const myStacks = useMemo(() => stacks.map(renderStacksHandler), [renderStacksHandler])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={rootStackOptions}
            >
                {myStacks}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation