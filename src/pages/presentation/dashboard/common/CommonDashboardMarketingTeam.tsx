import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../../components/Avatar';
import USERS from '../../../../common/data/userDummyData';
import useDarkMode from '../../../../hooks/useDarkMode';
import AuthContext from '../../../../contexts/authContext';

const CommonDashboardMarketingTeam = () => {
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const { users } = useContext(AuthContext);
	// const handleOnClickToEmployeeListPage = useCallback(
	// 	() => navigate(`../${demoPagesMenu.appointment.subMenu.employeeList.path}`),
	// 	[navigate],
	// );
	return (
		<Card stretch>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						L'équipe Break poverty
					</CardTitle>
					{/* <CardSubTitle tag='div' className='h6 text-muted'>
						
					</CardSubTitle> */}
				</CardLabel>
				<CardActions>
					<Button
						icon='ArrowForwardIos'
						aria-label='Read More'
						hoverShadow='default'
						color={darkModeStatus ? 'dark' : undefined}
						// onClick={handleOnClickToEmployeeListPage}
					/>
				</CardActions>
			</CardHeader>
			<CardBody>
				<AvatarGroup>
					{users
						.filter((u) => u.assoId === '664e2bb27214a28db120d3f9')
						.map((user) => (
							<Avatar
								srcSet={user.srcSet || USERS.GRACE.srcSet}
								src={user.src || USERS.GRACE.src}
								userName={`${user.name} ${user.firstname}`}
								color={USERS.GRACE.color}
							/>
						))}
				</AvatarGroup>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardMarketingTeam;
