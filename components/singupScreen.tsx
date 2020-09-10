import React, {useState} from 'react';
import {FormatInput} from './LoginScreen/formatInput';
import {MainButton} from './LoginScreen/mainButton';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {EntryScreenHeader} from './LoginScreen/header';
import {EntryScreenFooter} from './LoginScreen/footer';

import {Container, Header, Content, Footer} from 'native-base';
import {useMutation} from '@apollo/client';
import SIGNUP_QUERY from '../queries/SIGNUP_QUERY';
import {MainText} from './LoginScreen/mainText';
import {SuccesErrorMessage} from './LoginScreen/succesAndErrorMessage';

// interface SingUpScreenProps {}

export const SingUpScreen: React.FC = () => {
  const [signUpName, signUpNameSet] = useState('');
  const [signUpPassword, signUpPasswordSet] = useState('');
  const [signUpPasswordConfirm, signUpPasswordConfirmSet] = useState('');
  const [signUpEmail, signUpEmailSet] = useState('');
  const [signupQuery] = useMutation(SIGNUP_QUERY);
  const [queryRespond, queryRespondSet] = useState('');
  const [error, errorSet] = useState('#228b22');

  return (
    <Container style={styles.container}>
      <EntryScreenHeader></EntryScreenHeader>

      <Content>
        <View style={styles.formContainer}>
          <MainText text="Sing Up"></MainText>
          <SuccesErrorMessage
            message={queryRespond}
            color={error}></SuccesErrorMessage>
          <FormatInput
            text={'Username'}
            type={'Username'}
            onChange={(value) => {
              signUpNameSet(value);
            }}></FormatInput>
          <FormatInput
            text={'Password'}
            type={'Password'}
            onChange={(value) => {
              signUpPasswordSet(value);
            }}></FormatInput>
          <FormatInput
            text={'Confirm password'}
            type={'Password'}
            onChange={(value) => {
              signUpPasswordConfirmSet(value);
            }}></FormatInput>
          <FormatInput
            text={'Email'}
            type={'Email'}
            onChange={(value) => {
              signUpEmailSet(value);
            }}></FormatInput>
          <MainButton
            action={'Register'}
            actionHandler={async (e) => {
              e.preventDefault();
              signupQuery({
                variables: {
                  login: signUpName,
                  password: signUpPassword,
                  confirmPassword: signUpPasswordConfirm,
                  mail: signUpEmail,
                },
              })
                .then((res: any) => {
                  // Alert.alert(res.data.signup.token);
                  queryRespondSet('Sucessfully registered');
                  errorSet('#228b22');
                })
                .catch((errors) => {
                  let [first] = Object.keys(
                    errors.graphQLErrors[0].extensions.errors,
                  );
                  queryRespondSet(
                    errors.graphQLErrors[0].extensions.errors[first],
                  );
                  errorSet('#cc435d');
                });
            }}></MainButton>
        </View>
      </Content>
      <EntryScreenFooter
        text={'Have an account? '}
        textHighLighted={'Sign in'}
        navigateTo={'SignIn'}></EntryScreenFooter>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
  },
  textCenterContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },

  text: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 15,
  },

  formContainer: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
});
