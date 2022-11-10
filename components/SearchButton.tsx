import React from 'react'
import { Pressable, Image, StyleSheet } from 'react-native'
import images from '../assets/images'

type SearchButtonProps = {
    onPress: () => any
}

const SearchButton: React.FC<SearchButtonProps> = props => {
    const { onPress } = props
    return (
        <Pressable
            onPress={onPress}
        >
            <Image
                source={images.ic_search}
                style={styles.searchImg}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    searchImg: {
        height: 24,
        width: 24
    },
})

export default React.memo(SearchButton)