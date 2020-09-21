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
  await client.mutate({
    mutation: gql`
      mutation createUser {
        signup(
          registerData: {
            login: "TestingUserName2"
            password: "12312"
            confirmPassword: "12312"
            mail: "Testing2@gmail.com"
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

describe('Simulating signup with empty username', () => {
  test('Singup - 1', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: ""
                password: "123"
                confirmPassword: "123"
                mail: "mzTest@gmail.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.username).toBe(
          'Username must not be empty',
        );
      });
  }, 10000);
});

describe('Simulating signup with empty password', () => {
  test('Singup - 2', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: "michalTest"
                password: ""
                confirmPassword: "123"
                mail: "mzTest@gmail.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.password).toBe(
          'Password must not empty',
        );
      });
  }, 10000);
});

describe('Simulating signup with no matching passwords', () => {
  test('Singup - 3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: "michalTest"
                password: "321"
                confirmPassword: "123"
                mail: "mzTest@gmail.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.confirmPassword).toBe(
          'Passwords must match',
        );
      });
  }, 10000);
});

describe('Simulating signup with not valid email', () => {
  test('Singup - 4', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: "michalTest"
                password: "321"
                confirmPassword: "321"
                mail: "mzTest.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.email).toBe(
          'Email must be a valid email address',
        );
      });
  }, 10000);
});

describe('Simulating signup with valid credentails', () => {
  test('Singup - 5', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: "michal2"
                password: "321"
                confirmPassword: "321"
                mail: "mz2@gmail.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        expect(result.data.signup.token).toBeDefined();
        client.mutate({
          mutation: gql`
            mutation deleteUser {
              deleteUser(Login: "michal2")
            }
          `,
        });
      })
      .catch((error) => {
        error;
      });
  }, 10000);
});

describe('Simulating signup with taken username', () => {
  test('Singup - 6', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: "TestingUserName"
                password: "3212"
                confirmPassword: "3212"
                mail: "mz2@gmail.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].message).toBe('Login is taken');
      });
  }, 10000);
});

describe('Simulating signup with taken email', () => {
  test('Singup - 7', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation SignUp {
            signup(
              registerData: {
                login: "TestingUserNameName"
                password: "3212"
                confirmPassword: "3212"
                mail: "Testing@gmail.com"
              }
            ) {
              token
            }
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].message).toBe('Email is taken');
      });
  }, 10000);
});

describe('Simulating chaning password with empty username', () => {
  test('Change Password - 1', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: ""
                password: "321"
                confirmNewPassword: "321"
                newPassword: "123"
              }
            )
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.username).toBe(
          'Username must not be empty',
        );
      });
  }, 10000);
});

describe('Simulating changing password with empty password', () => {
  test('Change Password - 2', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: "michal"
                password: ""
                confirmNewPassword: "321"
                newPassword: "123"
              }
            )
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.password).toBe(
          'Password must not be empty',
        );
      });
  }, 10000);
});

describe('Simulating changing password with empty new Password', () => {
  test('Change Password - 3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: "michal"
                password: "321"
                confirmNewPassword: "321"
                newPassword: ""
              }
            )
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.newPassword).toBe(
          'New password must not be empty',
        );
      });
  }, 10000);
});

describe('Simulating changing password with empty new Password', () => {
  test('Change Password - 3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: "michal"
                password: "321"
                confirmNewPassword: "321"
                newPassword: ""
              }
            )
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.newPassword).toBe(
          'New password must not be empty',
        );
      });
  }, 10000);
});

describe('Simulating changing password with no matching new passwords', () => {
  test('Change Password - 3', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: "michal"
                password: "321"
                confirmNewPassword: "123"
                newPassword: "321"
              }
            )
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.confirmPassword).toBe(
          'Passwords must match',
        );
      });
  }, 10000);
});

describe('Simulating changing password with no valid credentials', () => {
  test('Change Password - 4', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: "MichalZnalezniak2"
                password: "michalznalezniak22"
                confirmNewPassword: "123"
                newPassword: "123"
              }
            )
          }
        `,
      })
      .then((result) => {
        result;
      })
      .catch((error) => {
        expect(error.graphQLErrors[0].extensions.errors.password).toBe(
          'Invalid Password',
        );
      });
  }, 10000);
});

describe('Simulating changing password with  valid credentials', () => {
  test('Change Password - 4', async () => {
    await client
      .mutate({
        mutation: gql`
          mutation changePassword {
            changePassword(
              changePasswordData: {
                login: "TestingUserName2"
                password: "12312"
                confirmNewPassword: "123122"
                newPassword: "123122"
              }
            )
          }
        `,
      })
      .then((result) => {
        expect(result.data.changePassword).toBe('Sucessfully change password');
        result;
      })
      .catch((error) => {
        error;
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
  await client.mutate({
    mutation: gql`
      mutation deleteUser {
        deleteUser(Login: "TestingUserName2")
      }
    `,
  });
  client.stop();
});
