import {gql} from '@apollo/client';

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $login: String!
    $password: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    changePassword(
      changePasswordData: {
        login: $login
        password: $password
        newPassword: $newPassword
        confirmNewPassword: $confirmNewPassword
      }
    )
  }
`;
export default CHANGE_PASSWORD;
