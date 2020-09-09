import React from 'react';

import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
interface mainButtonProps {
  action: string;
  actionHandler: (event: any) => void;
}

export const MainButton: React.FC<mainButtonProps> = (
  props: mainButtonProps,
) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={props.actionHandler}>
        <Text style={styles.text}> {props.action}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#85A9FF',
    padding: 8,
    marginTop: 25,
    marginBottom: 1,
    borderRadius: 25,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
