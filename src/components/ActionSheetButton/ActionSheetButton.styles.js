import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	button: {
		height: 52,
		width: '100%',
		borderRadius: 0,
		backgroundColor: 'transparent',
		padding: 0
	},

	constructive: {
		color: palette.primary.default,
		...fonts.buttonText
	},

	destructive: {
		color: palette.error.default,
		...fonts.buttonTextSmall
	},

	default: {
		color: palette.grayscale.abbey,
		...fonts.buttonTextSmall
	}
} );
