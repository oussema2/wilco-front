import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	containerView: {
		alignItems: 'center'
	},

	emptyStateImage: {
		width: 67,
		height: 47,
		marginTop: 40,
		marginBottom: 25
	},

	emptyStateBanner: {
		...fonts.bodyFocus,
		color: palette.grayscale.shutterGrey,
		textAlign: 'center'
	}
} );
