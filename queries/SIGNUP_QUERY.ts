import {gql} from '@apollo/client';

const SIGNUP = gql`
  mutation singup(
    $login: String!
    $password: String!
    $confirmPassword: String!
    $mail: String!
  ) {
    signup(
      registerData: {
        login: $login
        password: $password
        confirmPassword: $confirmPassword
        mail: $mail
      }
    ) {
      token
      user {
        UserID
      }
    }
  }
`;
export default SIGNUP;
