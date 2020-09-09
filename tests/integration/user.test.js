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
          mutation testLoginQueryEmptyFieldPassword {
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
  test('Login-3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation testLoginQueryEmptyFieldPassword {
            login(
              loginData: {
                login: "MichalZnalezniak2"
                password: "1234"
                mail: ""
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        expect(result).toBeUndefined();
      })
      .catch((error) => {
        error;
      });
  }, 10000);
});
