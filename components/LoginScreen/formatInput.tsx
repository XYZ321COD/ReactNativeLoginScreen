import React, {useState} from 'react';

import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface formatInputProps {
  type: string;
  onChange: (event: any) => void;
  text: string;
}

export const FormatInput: React.FC<formatInputProps> = (
  props: formatInputProps,
) => {
  const [loginName, loginNameSet] = useState('');
  const [loginPassword, loginPasswordSet] = useState('');
  switch (props.type) {
    case 'Username':
      return (
        <>
          <View>
            <Icon
              name="user"
              size={20}
              color="#E6BE8A"
              style={styles.logoInput}
            />
            <TextInput
              value={loginName}
              style={styles.input}
              placeholder={props.text}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              onChangeText={(input) => {
                props.onChange(input);
                loginNameSet(input);
              }}></TextInput>
          </View>
        </>
      );
    case 'Password':
      return (
        <>
          <View>
            <Icon
              name="lock"
              size={20}
              color="#E6BE8A"
              style={styles.logoInput}
            />
            <TextInput
              secureTextEntry={true}
              value={loginPassword}
              style={styles.input}
              autoCorrect={false}
              placeholder={props.text}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              onChangeText={(input) => {
                props.onChange(input);
                loginPasswordSet(input);
              }}></TextInput>
          </View>
        </>
      );
    case 'Email':
      return (
        <>
          <View>
            <Icon
              name="envelope"
              size={20}
              color="#E6BE8A"
              style={styles.logoInput}
            />
            <TextInput
              value={loginPassword}
              style={styles.input}
              placeholder={props.text}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              onChangeText={(input) => {
                props.onChange(input);
                loginPasswordSet(input);
              }}></TextInput>
          </View>
        </>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    marginTop: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    fontSize: 16,
    paddingLeft: 45,
    color: '#ffffff',
  },
  logoInput: {
    position: 'absolute',
    top: 35,
    left: 15,
  },
});
