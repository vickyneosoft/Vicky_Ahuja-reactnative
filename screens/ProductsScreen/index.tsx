import React, { useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
import { Pressable, Image, FlatList, InteractionManager, ListRenderItemInfo, ScrollView, StyleSheet, View } from 'react-native'

// Components
import ProductItem from '../../components/ProductItem'
import CategoryItem from '../../components/CategoryItem'

// Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

// Constants
import colors from '../../constants/colors'

// Redux store
import { Category, getCategoriesThunk, setSelectedCategory } from '../../store/slices/categoriesSlice'
import { getProductsThunk, Product } from '../../store/slices/productsSlice'

// Misc
import { customLog, keyExtractorHandler } from '../../utils/miscUtils'
import FloatingButton from '../../components/FloatingButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import images from '../../assets/images'
import SearchButton from '../../components/SearchButton'

const ProductsScreen: React.FC<NativeStackScreenProps<any, any>> = (props) => {
    const { navigation } = props

    const dispatch = useAppDispatch()

    const { data: products, filteredData: filteredProducts } = useAppSelector((state) => state.products)
    const { data: categories, selectedCategory } = useAppSelector((state) => state.categories)

    const initHandler = useCallback(() => {
        try {
            dispatch(getCategoriesThunk())
            dispatch(getProductsThunk())
        } catch (err: any) {
            customLog("[ProductsScreen] Error : ", err?.message)
        }
    }, [dispatch])

    useEffect(() => {
        InteractionManager.runAfterInteractions(initHandler)
    }, [initHandler])

    const onProductPressHandler = useCallback((productId: string) => {
        navigation.navigate('productDetails', {
            productId
        })
    }, [navigation])

    const renderProductItemHandler = useCallback((productItem: ListRenderItemInfo<Product>) => {
        try {
            const { index, item, separators } = productItem
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
            } = item

            return (
                <ProductItem
                    name={name}
                    avatar={avatar}
                    price={price}
                    onPress={onProductPressHandler.bind(null, _id)}
                />
            )
        } catch (err: any) {
            customLog('[ProductsScreen - renderProductItemHandler] Error : ', err?.message)
            return null
        }
    }, [])

    const onCategoryPressHandler = useCallback((category: Category) => {
        dispatch(setSelectedCategory(category))
    }, [dispatch])

    const renderCategoryItemHandler = useCallback((categoryItem: Category) => {
        try {
            const { __v, _id, createdAt, name, updatedAt } = categoryItem
            return (
                <CategoryItem
                    key={_id}
                    name={name}
                    onPress={onCategoryPressHandler.bind(null, categoryItem)}
                    selected={_id === selectedCategory?._id}
                />
            )
        } catch (err: any) {
            console.log('[renderCategoryItemHandler] Error : ', err?.message)
            return null
        }
    }, [selectedCategory, onCategoryPressHandler])

    const renderCategories = useMemo(() => {
        return categories.map(renderCategoryItemHandler)
    }, [categories, renderCategoryItemHandler])

    const listHeaderComponent = useMemo(() => {
        return (
            <ScrollView
                horizontal
                contentContainerStyle={styles.categoryContainer}
                showsHorizontalScrollIndicator={false}
            >
                {renderCategories}
            </ScrollView>
        )
    }, [categories, renderCategories])

    const onAddNewProductPressHandler = useCallback(() => {
        navigation.navigate('addProduct')
    }, [navigation])

    const onSearchBtnPressHandler = useCallback(() => {
        customLog('Coming Soon')
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: (_headerRightOptions) => {
                return (
                    <SearchButton
                        onPress={onSearchBtnPressHandler}
                    />
                )
            }
        })
    }, [onSearchBtnPressHandler])

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={filteredProducts.length ? filteredProducts : products}
                renderItem={renderProductItemHandler}
                keyExtractor={keyExtractorHandler}
                numColumns={2}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                ListHeaderComponent={listHeaderComponent}
                ListEmptyComponent={null}
                contentContainerStyle={styles.listContainerStyle}
            />
            <FloatingButton
                onPress={onAddNewProductPressHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    listContainerStyle: {
        paddingHorizontal: 10,
        paddingTop: 10
    }
})

export default ProductsScreen
