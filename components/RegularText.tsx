import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

type RegularTextProps = {
  children: string | React.ReactNode;
};

const RegularText = (props: RegularTextProps & TextProps) => {
  const mergedStyle = useMemo<StyleProp<TextStyle>>(
    () => StyleSheet.compose(styles.container as TextStyle, props.style),
    [props],
  );

  return (
    <Text {...props} style={mergedStyle}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
  },
});

export default RegularText
