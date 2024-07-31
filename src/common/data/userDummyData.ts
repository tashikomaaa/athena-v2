import UserImage from '../../assets/img/wanna/wanna1.png';
import UserImageWebp from '../../assets/img/wanna/wanna1.webp';
import UserImage2 from '../../assets/img/wanna/wanna2.png';
import UserImage2Webp from '../../assets/img/wanna/wanna2.webp';
import UserImage3 from '../../assets/img/wanna/wanna3.png';
import UserImage3Webp from '../../assets/img/wanna/wanna3.webp';
import UserImage4 from '../../assets/img/wanna/wanna4.png';
import UserImage4Webp from '../../assets/img/wanna/wanna4.webp';
import UserImage5 from '../../assets/img/wanna/wanna5.png';
import UserImage5Webp from '../../assets/img/wanna/wanna5.webp';
import UserImage6 from '../../assets/img/wanna/wanna6.png';
import UserImage6Webp from '../../assets/img/wanna/wanna6.webp';
import UserImage7 from '../../assets/img/wanna/wanna7.png';
import UserImage7Webp from '../../assets/img/wanna/wanna7.webp';
import SERVICES, { IServiceProps } from './serviceDummyData';

import User7Landing from '../../assets/img/wanna/landing1.png';
import { TColor } from '../../type/color-type';

export interface IUser {
	bonus: number;
	status: string;
	rd: string;
	createdBy?: string;
	emailConfirmed: boolean;
	pp: string;
	badges: string[];
	email: string;
	phoneNumber: string;
	name: string;
	firstname: string;
	password: string;
	isAdmin: boolean;
	isActive: boolean;
	uuid: string;
	registrationDate: string;
	lastLogin: string;
	assoId: string;
	missionId: string;
	athena?: boolean;
	argos?: boolean;
	acteon?: boolean;
}

export interface IUserProps {
	id: string;
	isAdmin: boolean;
	assoId: string;
	username: string;
	email: string;
	phoneNumber: string;
	firstname: string;
	name: string;
	surname: string;
	position: string;
	src: string;
	srcSet: string;
	isOnline: boolean;
	isReply?: boolean;
	color: TColor;
	fullImage?: string;
	services?: IServiceProps[];
	password: string;
}

const john: IUserProps = {
	id: '1',
	phoneNumber: '+330606060606',
	assoId: '',
	firstname: '',
	username: 'john',
	name: 'John',
	surname: 'Doe',
	position: 'CEO, Founder',
	email: 'john@omtanke.studio',
	src: UserImage,
	srcSet: UserImageWebp,
	isOnline: true,
	isAdmin: true,
	isReply: true,
	color: 'primary',
	services: [SERVICES.SURFING, SERVICES.KITE_SURFING, SERVICES.TENNIS],
	password: '@ABC123',
};

const grace: IUserProps = {
	firstname: '',
	id: '2',
	assoId: '',
	phoneNumber: '+330606060606',
	username: 'grace',
	name: 'Grace',
	surname: 'Buckland',
	position: 'Staff',
	email: 'grace@omtanke.studio',
	src: UserImage2,
	srcSet: UserImage2Webp,
	isOnline: true,
	isAdmin: true,
	color: 'warning',
	services: [SERVICES.SNOWBOARDING, SERVICES.ICE_SKATING, SERVICES.KITE_SURFING],
	password: '@ABC123',
};

const jane: IUserProps = {
	firstname: '',
	id: '3',
	assoId: '',
	phoneNumber: '+330606060606',
	username: 'jane',
	name: 'Jane',
	surname: 'Lee',
	position: 'Staff',
	email: 'jane@omtanke.studio',
	src: UserImage3,
	srcSet: UserImage3Webp,
	isOnline: true,
	isAdmin: true,
	color: 'secondary',
	services: [SERVICES.YOGA, SERVICES.HANDBALL, SERVICES.CRICKET],
	password: '@ABC123',
};

const ryan: IUserProps = {
	firstname: '',
	id: '4',
	assoId: '',
	phoneNumber: '+330606060606',
	username: 'ryan',
	name: 'Ryan',
	surname: 'McGrath',
	position: 'Worker',
	email: 'ryan@omtanke.studio',
	src: UserImage4,
	srcSet: UserImage4Webp,
	isOnline: false,
	isAdmin: true,
	color: 'info',
	services: [SERVICES.HIKING, SERVICES.FOOTBALL, SERVICES.HANDBALL],
	password: '@ABC123',
};

const ella: IUserProps = {
	firstname: '',
	id: '5',
	assoId: '',
	username: 'ella',
	phoneNumber: '+330606060606',
	name: 'Ella',
	surname: 'Oliver',
	position: 'Worker',
	email: 'ella@omtanke.studio',
	src: UserImage5,
	srcSet: UserImage5Webp,
	isOnline: false,
	isAdmin: true,
	color: 'success',
	services: [SERVICES.ICE_SKATING, SERVICES.TENNIS, SERVICES.SNOWBOARDING, SERVICES.YOGA],
	password: '@ABC123',
};

const chloe: IUserProps = {
	firstname: '',
	id: '6',
	assoId: '',
	phoneNumber: '+330606060606',
	username: 'chloe',
	name: 'Chloe',
	surname: 'Walker',
	position: 'Staff',
	email: 'chloe@omtanke.studio',
	src: UserImage6,
	srcSet: UserImage6Webp,
	isOnline: true,
	isAdmin: true,
	color: 'warning',
	services: [SERVICES.VOLLEYBALL, SERVICES.CRICKET],
	password: '@ABC123',
};

const sam: IUserProps = {
	firstname: '',
	id: '7',
	assoId: '',
	phoneNumber: '+330606060606',
	username: 'sam',
	name: 'Sam',
	surname: 'Roberts',
	position: 'Worker',
	email: 'sam@omtanke.studio',
	src: UserImage7,
	srcSet: UserImage7Webp,
	isOnline: false,
	isAdmin: true,
	color: 'danger',
	fullImage: User7Landing,
	password: '@ABC123',
};

const USERS: { [key: string]: IUserProps } = {
	JOHN: john,
	GRACE: grace,
	JANE: jane,
	RYAN: ryan,
	ELLA: ella,
	CHLOE: chloe,
	SAM: sam,
};

export function getUserDataWithUsername(username: string): IUserProps {
	// @ts-ignore
	return USERS[Object.keys(USERS).filter((f) => USERS[f].username.toString() === username)];
}

export function getUserDataWithId(id?: string): IUserProps {
	// @ts-ignore
	return USERS[Object.keys(USERS).filter((f) => USERS[f].id.toString() === id.toString())];
}

export default USERS;
