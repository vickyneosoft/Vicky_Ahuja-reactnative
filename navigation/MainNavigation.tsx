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
        component: ProductsScreen
    },
    {
        name: 'addProduct',
        component: AddProductScreen
    }, {
        name: 'productDetails',
        component: ProductDetailsScreen
    },
]

function App() {
    const renderStacksHandler = useCallback((stackItemObject: CustomStackType) => {
        return (
            <Stack.Screen
                {...stackItemObject}
            />
        )
    }, [])

    const myStacks = useMemo(() => stacks.map(renderStacksHandler), [renderStacksHandler])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {myStacks}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App