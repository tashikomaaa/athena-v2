import React from 'react';
import { useTranslation } from 'react-i18next';
import Alert, { AlertHeading } from '../../../../components/bootstrap/Alert';

const CommonDashboardAlert = () => {
	const { t } = useTranslation();
	return (
		<Alert
			icon='Verified'
			isLight
			color='primary'
			borderWidth={0}
			className='shadow-3d-primary'
			isDismissible>
			<AlertHeading tag='h2' className='h4'>
				{t('Congratulations')}! 🎉
			</AlertHeading>
			<span>{t('You have reached your monthly sales targets')}.</span>
		</Alert>
	);
};

export default CommonDashboardAlert;
