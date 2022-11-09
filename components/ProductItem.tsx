import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

// Components
import BoldText from "./BoldText";

// Constants
import colors from "../constants/colors";

type ProductItemProps = {
    avatar: string
    name: string
    price: number
    onPress: () => any
}

const ProductItem = (props: ProductItemProps) => {
    const {
        avatar,
        name,
        price,
        onPress
    } = props

    const productImg = useMemo(() => ({ uri: avatar }), [avatar])

    return (
        <Pressable
            onPress={onPress}
            style={styles.rootContainer}
        >
            <FastImage
                source={productImg}
                style={styles.img}
                resizeMode="contain"
            />
            <View style={styles.productDetailsContainer}>
                <BoldText
                    numberOfLines={1}
                    style={styles.font}
                >
                    {name}
                </BoldText>
                <View style={styles.priceAndBtnContainer}>
                    <BoldText style={styles.font}>
                        ${price}
                    </BoldText>
                    <BoldText style={styles.font}>
                        $
                    </BoldText>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        maxWidth: "47%",
        borderRadius: 10,
        shadowColor: colors.black,
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 5
    },
    img: {
        marginTop: 5,
        height: 100,
        width: 100,
        alignSelf: 'center'
    },
    productDetailsContainer: {
        marginTop: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 5,
        backgroundColor: colors.black,
        borderRadius: 10
    },
    font: {
        fontSize: 12,
        color: colors.white
    },
    priceAndBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default ProductItem
