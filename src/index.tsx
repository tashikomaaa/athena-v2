import React from 'react';
// import ReactDOM from 'react-dom'; // For React 17
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';

import { AuthContextProvider } from './contexts/authContext';
import './i18n';
import { RegistrationContextProvider } from './contexts/registrationContext';

const client = new ApolloClient({
	uri: process.env.REACT_APP_API_URL || 'http://localhost:3000/graphql', // Remplacer par le cache de point de terminaison de votre API GraphQL
	cache: new InMemoryCache(),
});
const children = (
	<Router>
		<ApolloProvider client={client}>
			<AuthContextProvider>
				<RegistrationContextProvider>
					<ThemeContextProvider>
						<React.StrictMode>
							<App />
						</React.StrictMode>
					</ThemeContextProvider>
				</RegistrationContextProvider>
			</AuthContextProvider>
		</ApolloProvider>
	</Router>
);

const container = document.getElementById('root');

// ReactDOM.render(children, container); // For React 17
createRoot(container as Element).render(children); // For React 18

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
