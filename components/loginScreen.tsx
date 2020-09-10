import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormatInput} from './LoginScreen/formatInput';
import {MainButton} from './LoginScreen/mainButton';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import LOGIN_QUERY from '../queries/LOGIN_QUERY';
import {Container, Content, Footer} from 'native-base';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {EntryScreenHeader} from './LoginScreen/header';
import {EntryScreenFooter} from './LoginScreen/footer';
import {MainText} from './LoginScreen/mainText';
import {SuccesErrorMessage} from './LoginScreen/succesAndErrorMessage';
// interface LoginScreenProps {}

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loginName, loginNameSet] = useState('');
  const [loginPassword, loginPasswordSet] = useState('');
  const [queryRespond, queryRespondSet] = useState('');
  const [error, errorSet] = useState('#228b22');

  const [loginQuery] = useMutation(LOGIN_QUERY);

  return (
    <Container style={styles.container}>
      <EntryScreenHeader></EntryScreenHeader>
      <Content>
        <View style={styles.formContainer}>
          <MainText text="Sing In"></MainText>
          <SuccesErrorMessage
            message={queryRespond}
            color={error}></SuccesErrorMessage>

          <FormatInput
            text={'Username'}
            type={'Username'}
            onChange={(value) => {
              loginNameSet(value);
            }}></FormatInput>
          <FormatInput
            text={'Password'}
            type={'Password'}
            onChange={(value) => {
              loginPasswordSet(value);
            }}></FormatInput>
          <View style={styles.textRightContainer}>
            <Text
              style={styles.textRight}
              onPress={() => {
                navigation.navigate('ResetPassword');
              }}>
              Forgot Password?
            </Text>
          </View>
          <MainButton
            action={'Login'}
            actionHandler={async (e) => {
              e.preventDefault();
              loginQuery({
                variables: {
                  login: loginName,
                  password: loginPassword,
                  mail: '',
                },
              })
                .then((res: any) => {
                  errorSet('#228b22');
                  queryRespondSet('Sucessfully sign in');
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
          {/* <View style={styles.textCenterContainer}>
            <Text style={{color: 'rgba(255,255,255,1)'}}> - OR - </Text>
          </View> */}
          {/* <View style={styles.textCenterContainer}>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => Alert.alert('Loggin with google')}
            />
          </View> */}
        </View>
      </Content>
      <EntryScreenFooter
        text={"Don't have an account? "}
        textHighLighted={'Sign up'}
        navigateTo={'SignUp'}></EntryScreenFooter>
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
    marginBottom: 5,
    marginTop: 5,
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
