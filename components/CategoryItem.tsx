import React, { useMemo } from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import colors from "../constants/colors";
import BoldText from "./BoldText";

type CategoryItemProps = {
    selected: boolean
    name: string
    onPress: () => any
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
    const { name, selected, onPress } = props

    const containerStyle = useMemo(() => {
        return StyleSheet.compose(
            styles.rootContainer as ViewStyle,
            selected
                ? styles.activeContainerStyle as ViewStyle
                : styles.inActiveContainerStyle as ViewStyle
        )
    }, [selected])

    const fontStyle = useMemo(() => {
        return selected
            ? styles.activeFont as TextStyle
            : styles.inactiveFont as TextStyle
    }, [selected])

    return (
        <Pressable
            onPress={onPress}
            style={containerStyle}
        >
            <BoldText style={fontStyle}>{name}</BoldText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1
    },
    activeContainerStyle: {
        backgroundColor: colors.white,
        borderColor: colors.black
    },
    inActiveContainerStyle: {
        backgroundColor: colors.black,
        borderColor: colors.white
    },
    activeFont: {
        color: colors.black
    },
    inactiveFont: {
        color: colors.white
    }
})

function arePropsEqual(prevProps: CategoryItemProps, nextProps: CategoryItemProps) {
    return prevProps.name === nextProps.name && prevProps.selected === nextProps.selected
}

export default React.memo(CategoryItem, arePropsEqual)
