/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from './components/loginScreen';
import {SingUpScreen} from './components/singupScreen';
import {ResetPassword} from './components/resetPassword';
import {ChangePassword} from './components/changePassword';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SignIn" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SingUpScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  title: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
  },
  logoContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  formContainer: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  logo: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
  logoText: {
    width: 150,
    height: 100,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
  },
  logoInput: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  inputwhole: {
    flexDirection: 'row',
  },
});

export default App;
