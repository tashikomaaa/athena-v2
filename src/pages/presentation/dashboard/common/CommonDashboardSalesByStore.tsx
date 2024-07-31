import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { ApexOptions } from 'apexcharts';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Chart from '../../../../components/extras/Chart';
import useDarkMode from '../../../../hooks/useDarkMode';
import RegistrationContext from '../../../../contexts/registrationContext';
import Tooltips from '../../../../components/bootstrap/Tooltips';

const calculateAge = (timestamp: string | number | Date) => {
	const birthDate = new Date(timestamp);
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();

	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
		// eslint-disable-next-line no-plusplus
		age--;
	}

	return Math.round(age);
};

const processData = (data: any[]) => {
	return data.reduce((acc, item) => {
		const date = new Date(Number(item.createdAt)).toLocaleDateString('fr').split('T')[0]; // Get date in YYYY-MM-DD format
		const age = calculateAge(Number(item.customerInfos.birthdate));
		const payment = item.payementvalue;

		if (!acc[date]) {
			acc[date] = {
				count: 0,
				totalAge: 0,
				totalPayment: 0,
				averageAge: 0,
				averagePayment: 0,
			};
		}

		// eslint-disable-next-line no-plusplus
		acc[date].count++;
		acc[date].totalAge += age;
		acc[date].totalPayment += payment;
		acc[date].averageAge = Math.round(acc[date].totalAge / acc[date].count);
		acc[date].averagePayment = parseFloat(
			(acc[date].totalPayment / acc[date].count).toFixed(2),
		);

		return acc;
	}, {});
};

const CommonDashboardSalesByStore = () => {
	const { themeStatus } = useDarkMode();
	const { registrationsData } = useContext(RegistrationContext);

	const [year, setYear] = useState(Number(dayjs().format('YYYY')));
	const companies = [{ name: 'P24SPAG1', company: 'AGORAIA' }];
	const COMPANIES_TAB = {
		COMP1: companies[0].name,
	};
	const [activeCompanyTab, setActiveCompanyTab] = useState(COMPANIES_TAB.COMP1);
	const processedData = processData(registrationsData);

	const dates = Object.keys(processedData);
	const registrationCounts = dates.map((date) => Math.round(processedData[date].count));
	const averageAges = dates.map((date) => processedData[date].averageAge);
	const averagePayments = dates.map((date) => processedData[date].averagePayment);
	function randomize(value: number, x = year) {
		if (x === 2019) {
			// @ts-ignore
			if (value.toFixed(0) % 2) {
				return (value * 1.5).toFixed(2);
			}
			return (value / 1.4).toFixed(2);
		}
		if (x === 2020) {
			// @ts-ignore
			if (value.toFixed(0) % 2) {
				return (value / 1.5).toFixed(2);
			}
			return (value * 1.4).toFixed(2);
		}
		if (x === 2021) {
			// @ts-ignore
			if (value.toFixed(0) % 2) {
				return (value / 2).toFixed(2);
			}
			return (value * 1.4).toFixed(2);
		}
		return value.toFixed(2);
	}

	const salesByStoreOptions: ApexOptions = {
		chart: {
			height: 370,
			type: 'line',
			stacked: false,
			toolbar: { show: false },
		},
		colors: [
			process.env.REACT_APP_INFO_COLOR,
			process.env.REACT_APP_SUCCESS_COLOR,
			process.env.REACT_APP_WARNING_COLOR,
		],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [1, 1, 4],
			curve: 'smooth',
		},
		plotOptions: {
			bar: {
				borderRadius: 5,
				columnWidth: '20px',
			},
		},
		xaxis: {
			categories: dates,
		},
		yaxis: [
			{
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_INFO_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_INFO_COLOR,
					},
				},
				title: {
					text: 'Bulletins',
					style: {
						color: process.env.REACT_APP_INFO_COLOR,
					},
				},
				tooltip: {
					enabled: true,
				},
			},
			{
				seriesName: 'age',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_SUCCESS_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_SUCCESS_COLOR,
					},
				},
				title: {
					text: 'Age moyen',
					style: {
						color: process.env.REACT_APP_SUCCESS_COLOR,
					},
				},
			},
			{
				seriesName: 'value',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_WARNING_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_WARNING_COLOR,
					},
				},
				title: {
					text: 'Don moyen (€)',
					style: {
						color: process.env.REACT_APP_WARNING_COLOR,
					},
				},
			},
		],
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: true,
				position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60,
			},
		},
		legend: {
			horizontalAlign: 'left',
			offsetX: 40,
		},
	};
	const salesByStoreSeries1: ApexOptions['series'][] = [
		{
			// @ts-ignore
			name: 'bulletins',
			type: 'column',
			data: registrationCounts,
		},
		{
			// @ts-ignore
			name: 'Age moyen',
			type: 'line',
			data: averageAges,
		},
		{
			// @ts-ignore
			name: 'Montant',
			type: 'line',
			data: averagePayments,
		},
	];
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='ReceiptLong'>
					<CardTitle tag='div' className='h5'>
						Resultats par mission
					</CardTitle>
					<CardSubTitle tag='div' className='h6'>
						Reporting
					</CardSubTitle>
				</CardLabel>
				{/* <CardActions>
					<ButtonGroup>
						<Button
							color='primary'
							isLight
							icon='ChevronLeft'
							aria-label='Previous Year'
							isDisable={year <= 2019}
							onClick={() => setYear(year - 1)}
						/>
						<Button color='primary' isLight isDisable>
							{year}
						</Button>
						<Button
							color='primary'
							isLight
							icon='ChevronRight'
							aria-label='Next Year'
							isDisable={year >= 2021}
							onClick={() => setYear(year + 1)}
						/>
					</ButtonGroup>
				</CardActions> */}
			</CardHeader>
			<CardBody>
				<div className='row'>
					<div className='col-xl-3 col-xxl-2'>
						<div className='row g-3'>
							{companies.map((company) => (
								<div key={company.name} className='col-xl-12 col-lg-6 col-sm-12'>
									<Tooltips
										title={`${registrationsData.length} donateurs`}
										placement='auto'>
										<Button
											isLight={activeCompanyTab !== company.name}
											onClick={() => setActiveCompanyTab(company.name)}
											color={themeStatus}
											className='w-100 py-4'
											shadow='sm'
											hoverShadow='none'>
											{company.company} - {company.name}
										</Button>
									</Tooltips>
								</div>
							))}
						</div>
					</div>
					<div className='col-xl-9 col-xxl-10'>
						<Chart
							// @ts-ignore
							series={salesByStoreSeries1}
							options={salesByStoreOptions}
							type={salesByStoreOptions.chart?.type}
							height={salesByStoreOptions.chart?.height}
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardSalesByStore;
