import React, { useContext, useEffect } from 'react';
import { useTour } from '@reactour/tour';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';

import CommonDashboardUserCard from './common/CommonDashboardUserCard';
import CommonDashboardMarketingTeam from './common/CommonDashboardMarketingTeam';
import CommonDashboardDesignTeam from './common/CommonDashboardDesignTeam';
import CommonDashboardSalesByStore from './common/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from './common/CommonDashboardWaitingAnswer';
import CommonMyWallet from '../../_common/CommonMyWallet';
import CommonDashboardTopSeller from './common/CommonDashboardTopSeller';
import RegistrationContext from '../../../contexts/registrationContext';
import AuthContext from '../../../contexts/authContext';

const DashboardPage = () => {
	const { getAllRegistrations } = useContext(RegistrationContext);
	const { getUserMe, getAllUsers, userData } = useContext(AuthContext);
	const { isAdmin } = userData;
	useEffect(() => {
		getUserMe().then(() => {});
		getAllUsers().then(() => {});
		getAllRegistrations().then(() => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	if (localStorage.getItem('tourModalStarted') !== 'shown' && !mobileDesign) {
	// 		setTimeout(() => {
	// 			setIsOpen(true);
	// 			localStorage.setItem('tourModalStarted', 'shown');
	// 		}, 7000);
	// 	}
	// 	return () => {};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<PageWrapper
			isProtected
			// title={demoPagesMenu.sales.subMenu.dashboard.text}
		>
			<Page container='fluid'>
				<div className='row'>
					{/* <div className='col-12'>
						<CommonDashboardAlert />
					</div> */}
					{/* As to be the admin user if the current user is not admin */}
					{!isAdmin && (
						<div className='col-xl-4'>
							<CommonDashboardUserCard />
						</div>
					)}
					{/* list of the users if current is admin */}
					<div className={isAdmin ? 'col-xl-6' : 'col-xl-4'}>
						<CommonDashboardMarketingTeam />
					</div>

					{/* list of contact for the agences */}
					<div className={isAdmin ? 'col-xl-6' : 'col-xl-4'}>
						<CommonDashboardDesignTeam />
					</div>

					{/* <div className='col-xxl-6'>
						<CommonDashboardIncome activeTab={TABS.YEARLY} />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardUserIssue />
					</div> */}

					<div className='col-xxl-8'>
						<CommonDashboardSalesByStore />
					</div>

					<div className='col-xxl-4 col-xl-6'>
						<CommonDashboardWaitingAnswer />
					</div>

					<div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div>
					<div className='col-xxl-8'>
						<CommonDashboardTopSeller />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
