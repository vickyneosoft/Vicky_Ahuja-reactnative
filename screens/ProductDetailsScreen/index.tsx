import React from 'react'
import { StyleSheet, View } from 'react-native'
import BoldText from '../../components/BoldText'

const ProductDetailsScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <BoldText>{"Product Details Screen"}</BoldText>
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

export default ProductDetailsScreen
