import React from 'react'
import { Pressable, StyleSheet, Image } from 'react-native'
import images from '../assets/images'
import colors from '../constants/colors'

type FloatingButtonProps = {
    onPress: () => void
}

const FloatingButton: React.FC<FloatingButtonProps> = (props) => {
    const { onPress } = props

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={images.ic_add}
                style={styles.addBtn}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 30,
        borderWidth: 3,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addBtn: {
        height: 24,
        width: 24
    }
})

export default FloatingButton