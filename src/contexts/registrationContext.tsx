import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { UPDATE_REGISTRATION } from './graphql/mutations/registration';
import { GET_ALL_REGISTRATIONS } from './graphql/queries/registration';
import { useNavigate } from 'react-router-dom';

export type User = {
	email: string;
	isAdmin: boolean;
	name: string;
	firstname: string;
	createdBy: string;
	isActive: boolean;
	registrationDate: string;
	lastLogin: string;
	uuid: string;
	status: string;
	pp: string;
	phoneNumber: string;
};
export type IRegistration = {
	_id: string;
	createdBy: string;
	customerInfos: CustomerInfos;
	payementvalue: number;
	signature: string;
	active: boolean;
	createdAt: string;
	assoId: string;
	missionId: string;
	newsletter: boolean;
	rd: User;
	commentary: string;
	status: string;
};

type CustomerInfos = {
	name: string;
	firstname: string;
	email: string;
	gender: string;
	phonenumber: string;
	address: string;
	birthdate: string;
	bankaccount: BankAccount;
};
type BankAccount = {
	iban: string;
	bic: string;
};

export interface IRegistrationContextProps {
	setRegistrationsData?(...args: unknown[]): unknown;
	registrationsData: Partial<IRegistration[]>;
	getAllRegistrations: () => Promise<boolean>;
	updateRegistration: (registrationInput: IRegistration) => Promise<Boolean>;
}
const RegistrationContext = createContext<IRegistrationContextProps>(
	{} as IRegistrationContextProps,
);

interface IRegistrationContextProviderProps {
	children: ReactNode;
}
export const RegistrationContextProvider: FC<IRegistrationContextProviderProps> = ({
	children,
}) => {
	const [registrationsData, setRegistrationsData] = useState<Partial<IRegistration[]>>([]);
    const nav = useNavigate();
	async function updateRegistration(registrationInput: IRegistration) {
		const token = sessionStorage.getItem('athena_token');
		if (!token) {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
		try {
			await (
				await fetch(process.env.REACT_APP_API_URL || '', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						authorization: token || '',
					},
					body: JSON.stringify({
						operationName: 'updateRegistration',
						query: UPDATE_REGISTRATION,
						variables: {
							registrationInput,
						},
					}),
				})
			).json();
			return true;
		} catch (err) {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
	}

	async function getAllRegistrations() {
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
						authorization: token,
					},
					body: JSON.stringify({
						operationName: 'listAllRegistrations',
						query: GET_ALL_REGISTRATIONS,
						variables: {
							searchOptions: {
								status: ['waiting', 'approuved', 'cancelled'],
							},
						},
					}),
				})
			).json();
			setRegistrationsData(response?.data?.listAllRegistrations);
			return true;
		} catch (err) {
			sessionStorage.clear();
			nav('/auth-pages/login');
			return false;
		}
	}

	const value = useMemo(
		() => ({
			registrationsData,
			setRegistrationsData,
			getAllRegistrations,
			updateRegistration,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[registrationsData],
	);
	return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
};
RegistrationContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RegistrationContext;
