import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const sizes = {
	big: {
		avatarView: {
			height: 132,
			aspectRatio: 1
		},

		user: {
			height: 72,
			aspectRatio: 1
		},

		aircraft: {
			width: 60,
			height: 54,
			marginLeft: 6
		}
	},

	medium: {
		avatarView: {
			height: 44,
			aspectRatio: 1
		},

		user: {
			height: 24,
			aspectRatio: 1
		},

		aircraft: {
			height: 18,
			width: 24,
			marginLeft: 2
		}
	},

	small: {
		avatarView: {
			height: 28,
			aspectRatio: 1
		},

		user: {
			height: 15,
			aspectRatio: 1
		},

		aircraft: {
			height: 12,
			width: 14,
			marginLeft: 2
		}
	}
};

export const createStyles = ( size ) => StyleSheet.create( {
	avatarView: {
		backgroundColor: palette.grayscale.aluminum,
		aspectRatio: 1,
		borderRadius: 68,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		...sizes[ size ].avatarView
	},

	image: {
		height: '100%',
		width: '100%',
		borderRadius: 68
	},

	user: {
		height: 24,
		aspectRatio: 1,
		...sizes[ size ].user
	},

	aircraft: {
		...sizes[ size ].aircraft
	}
} );
