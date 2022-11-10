import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import { StyleSheet, View, Keyboard, ScrollView, Linking } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFormik } from 'formik'

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addProductsThunk } from '../../store/slices/productsSlice'
import { Category } from '../../store/slices/categoriesSlice'

// components
import AppInput, { AppInputAPIs } from '../../components/AppInput'
import CategoryItem from '../../components/CategoryItem'
import RegularText from '../../components/RegularText'
import AppLoader from '../../components/AppLoader'
import AppButton from '../../components/AppButton'
import BoldText from '../../components/BoldText'

// Constants
import constants from '../../constants'
import colors from '../../constants/colors'

// Misc
import { height, showToast } from '../../utils/miscUtils'

enum FormFieldIds {
    PRODUCT_TITLE = 'productTitle',
    PRODUCT_PRICE = 'productPrice',
    PRODUCT_DESC = 'productDescription',
    PRODUCT_IMG_LINK = 'productImgLink',
    CATEGORY = 'category'
}

type FormFieldValueTypes = {
    productTitle: string
    productPrice: string
    productDescription: string
    productImgLink: string
    category: string
};

type FormFieldErrorTypes = {
    productTitle: string
    productPrice: string
    productDescription: string
    productImgLink: string
    category: string
};

let hasSubmitted = false

const AddProductScreen: React.FC<NativeStackScreenProps<any, any>> = (props) => {
    const { navigation } = props

    const productTitleRef = useRef<AppInputAPIs>(null);
    const productPriceRef = useRef<AppInputAPIs>(null);
    const productDescriptionRef = useRef<AppInputAPIs>(null);
    const productImgLinkRef = useRef<AppInputAPIs>(null);

    const dispatch = useAppDispatch()
    const { data: categories } = useAppSelector((state) => state.categories)
    const { isLoading, error } = useAppSelector((state) => state.products)

    useEffect(() => {
        if (error) {
            showToast(error)
        }
    }, [error])

    const initialValues = useMemo<FormFieldValueTypes>(
        () => ({
            productTitle: '',
            productPrice: '',
            productDescription: '',
            productImgLink: '',
            category: ''
        }),
        [],
    );

    const onSubmit = useCallback(
        async (_formValues: FormFieldValueTypes) => {
            const {
                productTitle,
                productPrice,
                productDescription,
                productImgLink,
                category
            } = _formValues;
            await dispatch(addProductsThunk({
                avatar: productImgLink,
                category,
                description: productDescription,
                developerEmail: constants.developerEmail,
                name: productTitle,
                price: productPrice,
            }))
            showToast("Product added successfully.")
            navigation.goBack()
        },
        [dispatch, navigation],
    );

    const validate = useCallback(async (formValues: FormFieldValueTypes) => {
        const {
            productTitle,
            productPrice,
            productDescription,
            productImgLink,
            category
        } = formValues;

        const validationErrors: FormFieldErrorTypes = {
            productTitle: '',
            productPrice: '',
            productDescription: '',
            productImgLink: '',
            category: ''
        };

        if (!productTitle || !productTitle.trim()) {
            validationErrors.productTitle = 'Product title required.';
        } else if (productTitle.length < 5) {
            validationErrors.productTitle =
                'Product title should contain at least 5 characters.';
        }

        if (!productPrice || !productPrice.trim()) {
            validationErrors.productPrice = 'Product price required.';
        } else if (isNaN(+productPrice)) {
            validationErrors.productPrice =
                'Entered product price is not valid.';
        }

        if (!productDescription || !productDescription.trim()) {
            validationErrors.productDescription = 'Product description required.';
        } else if (productDescription.length < 10) {
            validationErrors.productDescription =
                'Product description should contain at least 10 characters.';
        }

        if (!category || !category.trim()) {
            validationErrors.category = 'Please select product category.';
        }

        if (!productImgLink || !productImgLink.trim()) {
            validationErrors.productImgLink = 'Product image link required.';
        } else if (!await Linking.canOpenURL(productImgLink)) {
            validationErrors.productImgLink =
                'Please enter valid product image link.';
        }

        const errorKeys = Object.keys(validationErrors).filter(
            (key) => validationErrors[key],
        );

        return errorKeys.length ? validationErrors : undefined;
    }, []);

    const {
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setFieldValue
    } = useFormik({
        initialValues,
        onSubmit,
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    });

    const onChangeTextHandler = useCallback(
        (fieldId: FormFieldIds, enteredText: string) => {
            if (hasSubmitted) {
                setFieldValue(fieldId, enteredText, true);
            }
            else {
                handleChange(fieldId)(enteredText);
            }
        },
        [setFieldValue, handleChange],
    );

    const onSubmitEditingHandler = useCallback(
        (fieldId: FormFieldIds) => {
            handleBlur(fieldId);
            switch (fieldId) {
                case FormFieldIds.PRODUCT_TITLE:
                    productPriceRef.current?.focus();
                    break;
                case FormFieldIds.PRODUCT_PRICE:
                    productDescriptionRef.current?.focus();
                    break;
                case FormFieldIds.PRODUCT_DESC:
                    productImgLinkRef.current?.focus();
                    break;
                case FormFieldIds.PRODUCT_IMG_LINK:
                    Keyboard.dismiss();
                    break;
            }
        },
        [handleBlur, handleSubmit],
    );

    const onSubmitButtonPressHandler = useCallback(() => {
        hasSubmitted = true;
        handleSubmit();
    }, [handleSubmit]);

    const renderCategoryItemHandler = useCallback((categoryItem: Category) => {
        try {
            const { __v, _id, createdAt, name, updatedAt } = categoryItem
            return (
                <CategoryItem
                    key={_id}
                    name={name}
                    onPress={onChangeTextHandler.bind(null, FormFieldIds.CATEGORY, name)}
                    selected={values.category === name}
                />
            )
        } catch (err: any) {
            console.log('[renderCategoryItemHandler] Error : ', err?.message)
            return null
        }
    }, [onChangeTextHandler, values])

    const renderCategories = useMemo(() => {
        return categories.map(renderCategoryItemHandler)
    }, [categories, renderCategoryItemHandler])

    const categoriesRender = useMemo(() => {
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

    return (
        <>
            <AppLoader
                isVisible={isLoading}
            />
            <ScrollView style={styles.formContainer} contentContainerStyle={styles.rootContainer}>
                <View style={styles.formContainer}>
                    <AppInput
                        ref={productTitleRef}
                        title="Product Title"
                        placeholder='Product Title'
                        onChangeText={onChangeTextHandler.bind(null, FormFieldIds.PRODUCT_TITLE)}
                        onSubmitEditing={onSubmitEditingHandler.bind(
                            null,
                            FormFieldIds.PRODUCT_TITLE,
                        )}
                        initialValue={initialValues.productTitle}
                        errorMsg={errors.productTitle}
                    />
                    <AppInput
                        ref={productPriceRef}
                        title="Price"
                        placeholder='Price'
                        onChangeText={onChangeTextHandler.bind(null, FormFieldIds.PRODUCT_PRICE)}
                        onSubmitEditing={onSubmitEditingHandler.bind(
                            null,
                            FormFieldIds.PRODUCT_PRICE,
                        )}
                        initialValue={initialValues.productPrice}
                        errorMsg={errors.productPrice}
                    />
                    <AppInput
                        ref={productDescriptionRef}
                        title="Description"
                        placeholder='Description'
                        multiline
                        textInputStyle={styles.descriptionTxtInput}
                        onChangeText={onChangeTextHandler.bind(null, FormFieldIds.PRODUCT_DESC)}
                        onSubmitEditing={onSubmitEditingHandler.bind(
                            null,
                            FormFieldIds.PRODUCT_DESC,
                        )}
                        initialValue={initialValues.productDescription}
                        errorMsg={errors.productDescription}
                    />
                    <AppInput
                        ref={productImgLinkRef}
                        title="Image Link"
                        placeholder='Image Link'
                        onChangeText={onChangeTextHandler.bind(null, FormFieldIds.PRODUCT_IMG_LINK)}
                        onSubmitEditing={onSubmitEditingHandler.bind(
                            null,
                            FormFieldIds.PRODUCT_IMG_LINK,
                        )}
                        initialValue={initialValues.productImgLink}
                        errorMsg={errors.productImgLink}
                    />
                    <View style={styles.categorySelectionContainer}>
                        <BoldText style={styles.selectCategoryTxt}>
                            {`Selected Category: ${values.category}`}
                        </BoldText>
                        {categoriesRender}
                        {
                            errors.category
                                ? <RegularText
                                    style={styles.errorTxt}
                                >
                                    {errors.category}
                                </RegularText>
                                :
                                null
                        }
                    </View>
                </View>
                <AppButton
                    text={'Add Product'}
                    onPress={onSubmitButtonPressHandler}
                />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        // flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        minHeight: height - 56, // full height - header height
        paddingTop: 20
    },
    formContainer: {
        flex: 1
    },
    descriptionTxtInput: {
        height: 100,
        textAlign: 'left',
        textAlignVertical: 'top'
    },
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    categorySelectionContainer: {
        marginTop: 5
    },
    selectCategoryTxt: { color: colors.black },
    errorTxt: { color: colors.red }
})

export default AddProductScreen
