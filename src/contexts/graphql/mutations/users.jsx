// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';

export const AUTH_USER = gql`
	mutation authUser($email: String!, $password: String!, $origin: String!) {
		authUser(email: $email, password: $password, origin: $origin) {
			token
		}
	}
`;
