import React from 'react'
import { StyleSheet, View } from 'react-native'
import BoldText from '../../components/BoldText'

const AddProductScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <BoldText>{"Add Product Screen"}</BoldText>
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

export default AddProductScreen
