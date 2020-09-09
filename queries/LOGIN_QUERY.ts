import {gql} from '@apollo/client';

const LOGIN = gql`
  mutation login($login: String!, $password: String!, $mail: String!) {
    login(loginData: {login: $login, password: $password, mail: $mail}) {
      token
      user {
        UserID
      }
    }
  }
`;
export default LOGIN;
