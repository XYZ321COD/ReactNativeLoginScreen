import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormatInput} from './LoginScreen/formatInput';
import {MainButton} from './LoginScreen/mainButton';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import RESET_PASSWORD from '../queries/RESET_PASSWORD_QUERY';
import {Container, Header, Content, Footer} from 'native-base';
import {EntryScreenHeader} from './LoginScreen/header';
import {MainText} from './LoginScreen/mainText';
import {EntryScreenFooter} from './LoginScreen/footer';
import {SuccesErrorMessage} from './LoginScreen/succesAndErrorMessage';

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const navigation = useNavigation();
  const [signUpEmail, signUpEmailSet] = useState('');
  const [queryRespond, queryRespondSet] = useState('');
  const [error, errorSet] = useState('#228b22');
  const [resetPasswordQuery] = useMutation(RESET_PASSWORD);

  return (
    <Container style={styles.container}>
      <EntryScreenHeader></EntryScreenHeader>

      <Content>
        <View style={styles.formContainer}>
          <MainText text="Reset Password"></MainText>
          <SuccesErrorMessage
            message={queryRespond}
            color={error}></SuccesErrorMessage>
          <FormatInput
            text={'Email'}
            type={'Email'}
            onChange={(value) => {
              signUpEmailSet(value);
            }}></FormatInput>
          <View style={styles.textRightContainer}></View>
          <MainButton
            action={'Reset Password'}
            actionHandler={async (e) => {
              if (signUpEmail != '') {
                e.preventDefault();
                resetPasswordQuery({
                  variables: {
                    mail: signUpEmail,
                  },
                })
                  .then((res: any) => {
                    errorSet('#228b22');
                    queryRespondSet('Successfully reset password');
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
              } else {
                queryRespondSet('Must provide Email');
                errorSet('#cc435d');
              }
            }}></MainButton>
          <View style={styles.textCenterContainer}>
            <Text style={{color: 'rgba(255,255,255,1)'}}>
              You will recive new generate password at the email your provided
              while singing up{' '}
            </Text>
          </View>
        </View>
      </Content>
      <EntryScreenFooter
        text={"Let's change the password? "}
        textHighLighted={'Click here'}
        navigateTo={'ChangePassword'}></EntryScreenFooter>
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
