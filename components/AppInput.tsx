import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import colors from '../constants/colors';
import BoldText from './BoldText';
import RegularText from './RegularText';

export type AppInputAPIs = {
  setText: (value: string) => void;
  getText: () => string;
  focus: () => void;
};

type AppInputProps = {
  title?: string;
  errorMsg?: string | unknown;
  secure?: boolean;
  textInputStyle?: TextStyle;
  onChangeText: (inputId: string, enteredText: string) => void;
  onSubmitEditing: (inputId: string) => void;
  initialValue?: string
};

/*
 * Custom Input component with advance APIs
 */
const AppInput = forwardRef(
  (props: AppInputProps & TextInputProps, ref: any) => {
    const {
      title,
      secure,
      onChangeText,
      onSubmitEditing,
      errorMsg,
      style,
      defaultValue,
      textInputStyle,
      initialValue
    } = props;

    const [value, setValue] = useState<string>(initialValue ?? '');

    const textInputRef = useRef<TextInput>(null);

    // * To set state value from parent component
    const setText = useCallback((enteredText: string) => {
      setValue(enteredText);
    }, []);

    // * To get state value in parent component
    const getText = useCallback(() => {
      return value;
    }, [value]);

    // * To focus input from parent
    const focus = useCallback(() => {
      textInputRef.current?.focus();
    }, []);

    // * manage component state from parent component using ref
    const initHandler = useCallback(
      () => ({ setText, getText, focus }),
      [setText, getText, focus],
    );

    // * manage text input changes
    const onChangeTextHandler = useCallback(
      (enteredText: string) => {
        onChangeText(enteredText);
        setText(enteredText);
      },
      [onChangeText, setText],
    );

    // * manage text input submit
    const onSubmitEditingHandler = useCallback(onSubmitEditing, [
      onSubmitEditing,
    ]);

    // * bind ref with component APIs
    useImperativeHandle(ref, initHandler);

    // * combine prop styles and default component styles
    const combinedStyles = useMemo<StyleProp<TextStyle>>(
      () => StyleSheet.compose(styles.root as TextStyle, style),
      [style],
    );

    const combinedInputStyles = useMemo(
      () => StyleSheet.compose(styles.input as TextStyle, textInputStyle),
      [textInputStyle],
    );

    return (
      <View style={combinedStyles}>
        {title && value.length ? <BoldText style={{ color: colors.black }}>{title}</BoldText> : null}
        <View style={styles.container}>
          <TextInput
            returnKeyType="next"
            keyboardType="default"
            blurOnSubmit={false}
            maxLength={50}
            {...props}
            autoCapitalize={'none'}
            autoComplete={'off'}
            autoCorrect={false}
            placeholderTextColor={colors.black}
            ref={textInputRef}
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={onChangeTextHandler}
            onSubmitEditing={onSubmitEditingHandler}
            style={combinedInputStyles}
          />
        </View>
        {errorMsg && typeof errorMsg === 'string' ? (
          <RegularText style={{ color: colors.red }}>{errorMsg}</RegularText>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: { marginBottom: 10 },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  input: {
    flex: 1,
    color: colors.black,
    height: 45,
    paddingLeft: 10
  },
});

export default AppInput
