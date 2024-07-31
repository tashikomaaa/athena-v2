import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IUserProps } from '../common/data/userDummyData';
import { GET_USER_ME, LIST_ALL_USERS } from './graphql/queries/user';

export interface IAuthContextProps {
	user: string;
	users: IUserProps[];
	setUser?(...args: unknown[]): unknown;
	setToken?(args: string): unknown;
	getUserMe: () => Promise<any>;
	getAllUsers: () => Promise<Boolean>;
	userData: Partial<IUserProps>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const nav = useNavigate();
	const [user, setUser] = useState<string>(localStorage.getItem('athena_authUsername') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});
	const [users, setAllUsers] = useState<IUserProps[]>([]);

	useEffect(() => {
		localStorage.setItem('athena_authUsername', user);
	}, [user]);
	async function getUserMe() {
		const token = sessionStorage.getItem('athena_token');
		if (token === '') {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
		try {
			const response = await (
				await fetch(process.env.REACT_APP_API_URL || '', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						authorization: token || '',
					},
					body: JSON.stringify({
						operationName: 'getUserMe',
						query: GET_USER_ME,
					}),
				})
			).json();
			setUser(response?.data?.getUserMe.firstname);
			setUserData(response?.data?.getUserMe);
			return response?.data?.getUserMe;
		} catch (err) {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
	}

	async function getAllUsers() {
		const token = sessionStorage.getItem('athena_token');
		if (!token) {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
		try {
			const response = await (
				await fetch(process.env.REACT_APP_API_URL || '', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						authorization: token || '',
					},
					body: JSON.stringify({
						operationName: 'listAllUsers',
						query: LIST_ALL_USERS,
					}),
				})
			).json();
			setAllUsers(response?.data?.listAllUsers);
			return true;
		} catch (err) {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
	}

	const value = useMemo(
		() => ({
			user,
			users,
			setUser,
			getUserMe,
			getAllUsers,
			userData,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user, userData],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
