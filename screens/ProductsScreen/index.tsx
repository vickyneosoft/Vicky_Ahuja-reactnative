import React, { useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
import { ActivityIndicator, FlatList, InteractionManager, ListRenderItemInfo, ScrollView, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

// Components
import FloatingButton from '../../components/FloatingButton'
import CategoryItem from '../../components/CategoryItem'
import SearchButton from '../../components/SearchButton'
import ProductItem from '../../components/ProductItem'
import BoldText from '../../components/BoldText'

// Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

// Constants
import colors from '../../constants/colors'

// Redux store
import { Category, getCategoriesThunk, setSelectedCategory } from '../../store/slices/categoriesSlice'
import { getProductsThunk, Product } from '../../store/slices/productsSlice'

// Misc
import { customLog, keyExtractorHandler, showToast } from '../../utils/miscUtils'

const ProductsScreen: React.FC<NativeStackScreenProps<any, any>> = (props) => {
    const { navigation } = props

    const dispatch = useAppDispatch()

    const {
        data: products,
        filteredData: filteredProducts,
        isLoading: isProductLoading,
        error: productError
    } = useAppSelector((state) => state.products)

    const {
        data: categories,
        selectedCategory,
        isLoading: isCategoryLoading,
        error: categoryError
    } = useAppSelector((state) => state.categories)

    useEffect(() => {
        if (categoryError) {
            showToast(categoryError)
        }
        if (productError) {
            showToast(productError)
        }
    }, [categoryError, productError])

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

    const onEditItemHandler = useCallback((productId: string) => {
        customLog('Coming soon edit for : ', productId)
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
                    onEditPressHandler={onEditItemHandler.bind(null, _id)}
                />
            )
        } catch (err: any) {
            customLog('[ProductsScreen - renderProductItemHandler] Error : ', err?.message)
            return null
        }
    }, [onProductPressHandler, onEditItemHandler])

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

    const listEmptyComponent = useMemo(() => {
        return (
            <View style={styles.centeredView}>
                {
                    isCategoryLoading || isProductLoading
                        ?
                        <ActivityIndicator
                            size={"large"}
                            color={colors.black}
                        />
                        : categoryError || productError
                            ? <BoldText>{categoryError ?? productError}</BoldText>
                            : <BoldText>{"No Data Found!"}</BoldText>

                }
            </View>
        )
    }, [isCategoryLoading, isProductLoading, categoryError, productError])

    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={filteredProducts.length ? filteredProducts : products}
                renderItem={renderProductItemHandler}
                keyExtractor={keyExtractorHandler}
                numColumns={2}
                style={styles.rootContainer}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                ListHeaderComponent={listHeaderComponent}
                ListEmptyComponent={listEmptyComponent}
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
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    listContainerStyle: {
        paddingHorizontal: 10,
        paddingTop: 10,
        minHeight: "100%"
    }
})

export default ProductsScreen
