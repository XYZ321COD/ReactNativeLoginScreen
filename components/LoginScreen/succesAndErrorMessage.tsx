import React from 'react';

import {View, StyleSheet, Text} from 'react-native';
interface succesErrorMessageProps {
  color: string;
  message: string;
}

export const SuccesErrorMessage: React.FC<succesErrorMessageProps> = (
  props: succesErrorMessageProps,
) => {
  return (
    <View style={styles.textCenterContainer}>
      <Text style={{color: props.color}}>{props.message}</Text>
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
});
