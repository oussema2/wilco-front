import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	button: {
		borderRadius: 26,
		backgroundColor: palette.primary.default
	},
	icon: {
		tintColor: palette.grayscale.white
	},
	title: {
		...fonts.buttonTextSmall,
		color: palette.grayscale.white
	}
} );
