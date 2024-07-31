import React, { FC } from 'react';
import PropTypes from 'prop-types';
import logoBlack from '../assets/logos/3.png';
import logoWhite from '../assets/logos/1.png';
import logoLitle from '../assets/logos/2.png';
interface ILogoProps {
	width?: number;
	height?: number;
	dest?: string;
}
const getLogo = (destination: string) => {
	switch (destination) {
		case 'white':
			return logoBlack;
		case 'black':
			return logoWhite;
		case 'litle':
			return logoLitle;
		default:
			return logoLitle;
	}
}
const Logo: FC<ILogoProps> = ({ width, height, dest }) => {
	return (
		<img
			alt='logo athena'
			src={getLogo(dest || '')}
			width={height !== 854 && !!height ? height * (2155 / 854) : width}
			// height={width !== 2155 && !!width ? width * (854 / 2155) : height}
		/>
	);
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	dest: PropTypes.string,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
	dest: 'litle',
};

export default Logo;
