import {gql} from '@apollo/client';

const RESET_PASSWORD = gql`
  mutation resetPassword($mail: String!) {
    resetPassword(Mail: $mail)
  }
`;
export default RESET_PASSWORD;
