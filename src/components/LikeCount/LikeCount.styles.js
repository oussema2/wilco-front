import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const unlikedStyle = StyleSheet.create( {
	likeCountContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	likeIcon: {
		width: 16.67,
		height: 16.67,
		tintColor: palette.grayscale.abbey
	},
	likes: {
		marginLeft: 9.67,
		...fonts.bodySmall,
		color: palette.grayscale.abbey
	}
} );

export const likedStyle = StyleSheet.create( {
	...unlikedStyle,
	likeIcon: {
		...unlikedStyle.likeIcon,
		tintColor: palette.primary.default
	},
	likes: {
		...unlikedStyle.likes,
		color: palette.primary.default
	}
} );
