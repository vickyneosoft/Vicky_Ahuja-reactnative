import React, { useEffect, useCallback, useMemo } from 'react'
import { FlatList, InteractionManager, ListRenderItemInfo, ScrollView, StyleSheet, View } from 'react-native'
import BoldText from '../../components/BoldText'
import CategoryItem from '../../components/CategoryItem'

// Components
import ProductItem from '../../components/ProductItem'
import colors from '../../constants/colors'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Category, getCategoriesThunk } from '../../store/slices/categoriesSlice'
import { getProductsThunk, Product } from '../../store/slices/productsSlice'
import { customLog, keyExtractorHandler } from '../../utils/miscUtils'

const ProductsScreen = (props: any) => {
    const { navigation } = props

    const dispatch = useAppDispatch()

    const { data: products } = useAppSelector((state: any) => state.products)
    const { data: categories } = useAppSelector((state: any) => state.categories)


    const initHandler = useCallback(() => {
        try {
            dispatch(getProductsThunk())
            dispatch(getCategoriesThunk())
        } catch (err: any) {
            customLog("[ProductsScreen] Error : ", err?.message)
        }
    }, [dispatch])


    useEffect(() => {
        InteractionManager.runAfterInteractions(initHandler)
    }, [initHandler])

    const onProductPressHandler = useCallback((productId: string) => {

    }, [])

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

    const renderCategoryItemHandler = useCallback((categoryItem: Category) => {
        try {
            const { __v, _id, createdAt, name, updatedAt } = categoryItem
            return (
                <CategoryItem
                    name={name}
                    onPress={() => { }}
                    selected={false}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err?.message)
        }
    }, [])

    const renderCategories = useMemo(() => {
        return categories.map(renderCategoryItemHandler)
    }, [categories, renderCategoryItemHandler])

    const listHeaderComponent = useMemo(() => {
        return (
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}
                showsHorizontalScrollIndicator={false}
            >
                {renderCategories}
            </ScrollView>
        )
    }, [categories])

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={products}
                renderItem={renderProductItemHandler}
                keyExtractor={keyExtractorHandler}
                numColumns={2}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                ListHeaderComponent={listHeaderComponent}
                ListEmptyComponent={null}
                contentContainerStyle={styles.listContainerStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    listContainerStyle: {
        paddingHorizontal: 10,
        paddingTop: 10
    }
})

export default ProductsScreen
