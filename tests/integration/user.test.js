import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

let client;
beforeAll(async () => {
  client = new ApolloClient({
    link: createHttpLink({
      uri: 'https://skateapplicationforclients.herokuapp.com/',
      fetch,
    }),
    cache: new InMemoryCache(),
  });
  await client.mutate({
    mutation: gql`
      mutation createUser {
        signup(
          registerData: {
            login: "TestingUserName"
            password: "12312"
            confirmPassword: "12312"
            mail: "Testing@gmail.com"
          }
        ) {
          token
        }
      }
    `,
  });
});
describe('Simulating logging with empty username', () => {
  test('Login-1', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation testLoginQueryEmptyFieldUsername {
            login(loginData: {login: "", password: "123", mail: ""}) {
              token
            }
          }
        `,
      })
      .then((result) => result)
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.username).toBe(
          'Username must not be empty',
        );
      });
  }, 10000);
});
describe('Simulating logging with empty password', () => {
  test('Login-2', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation testLoginQueryEmptyFieldPassword {
            login(loginData: {login: "123", password: "", mail: ""}) {
              token
            }
          }
        `,
      })
      .then((result) => result)
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.password).toBe(
          'Password must not be empty',
        );
      });
  }, 10000);
});
describe('Simulating logging with wrong credentials', () => {
  test('Login-3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation testLoginNonValid {
            login(
              loginData: {
                login: "WrongCredentials"
                password: "WrongCredentials"
                mail: ""
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => result)
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.username).toBe(
          'No such user found for Username: WrongCredentials',
        );
      });
  }, 10000);
});

describe('Simulating logging with valid credentials', () => {
  test('Login-4', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation testLoginValid {
            login(
              loginData: {
                login: "MichalZnalezniak2"
                password: "ZOP10Rnz"
                mail: ""
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        expect(result).toBeDefined();
      });
  }, 10000);
});

afterAll(async () => {
  await client.mutate({
    mutation: gql`
      mutation deleteUser {
        deleteUser(Login: "TestingUserName")
      }
    `,
  });
  client.stop();
});

describe('Simulating reseting password with wrong email', () => {
  test('Reset Password - 1', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation resetPassword {
            resetPassword(Mail: "asdasd@gmail.com")
          }
        `,
      })
      .then((result) => result)
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.email).toBe(
          'No such user found for Email: asdasd@gmail.com',
        );
      });
  }, 10000);
});

describe('Simulating reseting password with wrong email pattern', () => {
  test('Reset Password - 2', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation resetPassword {
            resetPassword(Mail: "asdasd.com")
          }
        `,
      })
      .then((result) => result)
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.email).toBe(
          'Email must be a valid email address',
        );
      });
  }, 10000);
});
describe('Simulating reseting password with valid email', () => {
  test('Reset Password - 3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation resetPassword {
            resetPassword(Mail: "Testing@gmail.com")
          }
        `,
      })
      .then((result) => {
        expect(result.data.resetPassword).toBe('Sucessfully reset password');
      });
  }, 10000);
});
