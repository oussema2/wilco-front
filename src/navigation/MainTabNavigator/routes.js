import {
	home, bell, user, users
} from '../../assets/icons';

export const PLACEHOLDER_SCREEN_NAME = ' ';

export const ROUTES = {
	Home: {
		icon: home,
		name: 'Home'
	},
	Members: {
		icon: users,
		name: 'Members'
	},
	Notifications: {
		icon: bell,
		name: 'Notifications'
	},
	Profile: {
		icon: user,
		name: 'Profile'
	}
};
