import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormatInput} from './LoginScreen/formatInput';
import {MainButton} from './LoginScreen/mainButton';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {EntryScreenHeader} from './LoginScreen/header';
import {EntryScreenFooter} from './LoginScreen/footer';
import {MainText} from './LoginScreen/mainText';
import {Container, Content} from 'native-base';
import {useMutation} from '@apollo/client';
import CHANGE_PASSWORD from '../queries/CHANGE_PASSWORD_QUERY';
import {SuccesErrorMessage} from './LoginScreen/succesAndErrorMessage';

// interface ChangePasswordProps {}

export const ChangePassword: React.FC = () => {
  const [login, loginSet] = useState('');
  const [password, passwordSet] = useState('');
  const [newPassword, newPasswordSet] = useState('');
  const [newConfirmPassword, newConfirmPasswordSet] = useState('');
  const [changePasswordQuery] = useMutation(CHANGE_PASSWORD);
  const [queryRespond, queryRespondSet] = useState('');
  const [error, errorSet] = useState('#228b22');

  return (
    <Container style={styles.container}>
      <EntryScreenHeader></EntryScreenHeader>

      <Content>
        <View style={styles.formContainer}>
          <MainText text="Change Password"></MainText>
          <SuccesErrorMessage
            message={queryRespond}
            color={error}></SuccesErrorMessage>
          <FormatInput
            text={'Username'}
            type={'Username'}
            onChange={(value) => {
              loginSet(value);
            }}></FormatInput>
          <FormatInput
            text={'Password'}
            type={'Password'}
            onChange={(value) => {
              passwordSet(value);
            }}></FormatInput>
          <FormatInput
            text={'New password'}
            type={'Password'}
            onChange={(value) => {
              newPasswordSet(value);
            }}></FormatInput>
          <FormatInput
            text={'Confirm new password'}
            type={'Password'}
            onChange={(value) => {
              newConfirmPasswordSet(value);
            }}></FormatInput>
          <MainButton
            action={'Change Password'}
            actionHandler={async (e) => {
              e.preventDefault();
              changePasswordQuery({
                variables: {
                  login: login,
                  password: password,
                  newPassword: newPassword,
                  confirmNewPassword: newConfirmPassword,
                },
              })
                .then((res: any) => {
                  queryRespondSet('Sucessfully changed password');
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
  textRightContainer: {
    alignItems: 'flex-end',
  },
  textRight: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
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
