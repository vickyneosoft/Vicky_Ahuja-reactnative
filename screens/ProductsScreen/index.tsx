import React from 'react'
import { StyleSheet, View } from 'react-native'
import BoldText from '../../components/BoldText'

const ProductsScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <BoldText>{"Products Screen"}</BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductsScreen
