import React from 'react'
import { StyleSheet, View } from 'react-native'
import BoldText from '../../components/BoldText'
import colors from '../../constants/colors'

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
        backgroundColor: colors.white
    }
})

export default AddProductScreen
