import React from 'react';

import {View, StyleSheet, Text} from 'react-native';
interface mainTextProps {
  text: string;
}

export const MainText: React.FC<mainTextProps> = (props: mainTextProps) => {
  return (
    <View style={styles.textCenterContainer}>
      <Text style={styles.singIn}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textCenterContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  singIn: {
    fontSize: 30,
    fontFamily: 'sans-serif-medium',
    color: '#FFFAFA',
    fontWeight: '700',
  },
});
