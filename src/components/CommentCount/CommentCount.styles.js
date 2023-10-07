import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	commentCountContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	commentIcon: {
		width: 16.67,
		height: 14.58,
		tintColor: palette.grayscale.abbey
	},
	comments: {
		marginLeft: 9.67,
		...fonts.bodySmall,
		color: palette.grayscale.abbey
	}
} );
