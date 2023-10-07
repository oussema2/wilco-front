import { palette } from '../../Theme';

export const tabBarOptions = {
	activeTintColor: palette.grayscale.black,
	inactiveTintColor: palette.grayscale.aluminum,
	showLabel: false,
	style: {
		minHeight: 54,
		shadowColor: '#808080',
		shadowOffset: {
			width: 2,
			height: 4
		},
		shadowOpacity: 0.30,
		shadowRadius: 10,
		elevation: 8
	},
	tabStyle: {
		marginTop: 1
	}
};
