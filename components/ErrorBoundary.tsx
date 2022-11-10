import React from 'react'
import { View, StyleSheet } from 'react-native'

import BoldText from './BoldText';
import RegularText from './RegularText';

import colors from '../constants/colors';
import { customLog } from '../utils/miscUtils';

type ErrorBoundaryProps = {
    children: React.ReactElement
}

type ErrorBoundaryStateType = {
    hasError: boolean,
    error: any,
    errorInfo: any
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStateType> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        customLog(error, errorInfo);
        this.setState((prevState) => {
            return {
                ...prevState,
                error,
                errorInfo
            }
        })
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI

            return (
                <View style={styles.container}>
                    <BoldText style={styles.titleTxt}>
                        {'Something went wrong please restart app!'}
                    </BoldText>
                    <RegularText style={styles.descriptionTxt}>
                        {this.state.error?.message}
                    </RegularText>
                </View>
            )
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    titleTxt: {
        color: colors.black
    },
    descriptionTxt: {
        marginTop: 10,
        color: colors.black
    }
})

export default ErrorBoundary
