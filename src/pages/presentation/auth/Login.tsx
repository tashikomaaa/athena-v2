/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import USERS from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import { AUTH_USER } from '../../../contexts/graphql/mutations/users';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Bienvenue,</div>
			<div className='text-center h4 text-muted mb-5'>Connectez vous pour continuer !</div>
		</>
	);
};
LoginHeader.defaultProps = {
	isNewUser: false,
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const [authUser, { data, error, loading }] = useMutation(AUTH_USER);
	const { setUser, user } = useContext(AuthContext);
	const { t } = useTranslation();

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	useEffect(() => {
		sessionStorage.clear();
	})
	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	const usernameCheck = (username: string) => {
		return !!username;
	};

	const passwordCheck = (username: string, password: string) => {
		return !!password;
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: user,
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			if (usernameCheck(values.loginUsername)) {
				if (passwordCheck(values.loginUsername, values.loginPassword)) {
					if (setUser) {
						setUser(values.loginUsername);
					}
					authUser({
						variables: {
							email: values.loginUsername,
							password: values.loginPassword,
							origin: 'athena',
						},
					}).then(async (res) => {
						if (error) {
							formik.setFieldError(
								'loginPassword',
								t('Username and password do not match.'),
							);
						}
						if (res?.data?.authUser?.token) {
							sessionStorage.setItem('athena_token', res?.data?.authUser?.token);
							handleOnClick();
						}
					});
				} else {
					formik.setFieldError('loginPassword', t('Username and password do not match.'));
				}
			}
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			setSignInPassword(true);
			setIsLoading(false);
		}, 1000);
	};

	return (
		<PageWrapper
			isProtected={false}
			title={t('Login')}
			className={classNames({ 'bg-dark': true, 'bg-light': false })}>
			<Page>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}
										aria-label='Athena'>
										<Logo width={200} dest='white' />
									</Link>
								</div>
								<LoginHeader isNewUser={false} />
								<form className='row g-4'>
									<div className='col-12'>
										<FormGroup
											id='loginUsername'
											isFloating
											label={t('Your email or username')}
											className={classNames({
												'd-none': signInPassword,
											})}>
											<Input
												autoComplete='username'
												value={formik.values.loginUsername}
												isTouched={formik.touched.loginUsername}
												invalidFeedback={formik.errors.loginUsername}
												isValid={formik.isValid}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												onFocus={() => {
													formik.setErrors({});
												}}
											/>
										</FormGroup>
										{signInPassword && (
											<div className='text-center h4 mb-3 fw-bold'>
												{t('Welcome back')}, {formik.values.loginUsername}.
											</div>
										)}
										<FormGroup
											id='loginPassword'
											isFloating
											label={t('Password')}
											className={classNames({
												'd-none': !signInPassword,
											})}>
											<Input
												type='password'
												autoComplete='current-password'
												value={formik.values.loginPassword}
												isTouched={formik.touched.loginPassword}
												invalidFeedback={formik.errors.loginPassword}
												validFeedback='Looks good!'
												isValid={formik.isValid}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										{!signInPassword ? (
											<Button
												color='warning'
												className='w-100 py-3'
												isDisable={!formik.values.loginUsername}
												onClick={handleContinue}>
												{(loading || isLoading) && (
													<Spinner isSmall inButton isGrow />
												)}
												Continue
											</Button>
										) : (
											<Button
												color='warning'
												className='w-100 py-3'
												onClick={formik.handleSubmit}>
												Login
											</Button>
										)}
									</div>
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': false,
									'link-dark': true,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': false,
									'link-dark': true,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
