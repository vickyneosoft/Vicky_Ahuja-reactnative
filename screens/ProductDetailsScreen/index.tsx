import React, { useMemo } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import FastImage from 'react-native-fast-image'

// Components
import BoldText from '../../components/BoldText'
import RegularText from '../../components/RegularText'

// Hooks
import { useAppSelector } from '../../hooks/reduxHooks'

// Constants
import colors from '../../constants/colors'

// Misc
import { height, width } from '../../utils/miscUtils'

type ProductDetailsScreenRouteProps = {
    [navigator: string]: {
        productId: string
    }
}

const ProductDetailsScreen: React.FC<NativeStackScreenProps<ProductDetailsScreenRouteProps, any>> = (props) => {
    const { route } = props
    const productDetails = useAppSelector(state => state.products.data.find(product => product._id === route.params.productId))

    if (!productDetails) {
        return null
    }

    const {
        __v,
        _id,
        avatar,
        category,
        createdAt,
        description,
        developerEmail,
        name,
        price,
        updatedAt
    } = productDetails

    const productImage = useMemo(() => ({ uri: avatar }), [avatar])

    return (
        <View style={styles.rootContainer}>
            <FastImage
                source={productImage}
                style={styles.productImg}
                resizeMode="contain"
            />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.productDescContainer}
            >
                <View style={styles.nameAndPriceContainer}>
                    <BoldText style={styles.nameTxt}>
                        {name}
                    </BoldText>
                    <BoldText style={styles.priceTxt}>
                        ${price}
                    </BoldText>
                </View>
                <RegularText style={styles.descriptionTxt}>
                    {description}
                </RegularText>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    productImg: {
        height: height / 2.5,
        width
    },
    scrollView: {
        flex: 1
    },
    productDescContainer: {
        flex: 1,
        backgroundColor: colors.black,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 25,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nameAndPriceContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    nameTxt: {
        width: "70%",
        color: colors.white,
        fontSize: 18,
    },
    priceTxt: {
        width: "30%",
        color: colors.white,
        fontSize: 18,
        textAlign: "right"
    },
    descriptionTxt: {
        flex: 1,
        color: colors.white,
        paddingHorizontal: 20
    }
})

export default ProductDetailsScreen
