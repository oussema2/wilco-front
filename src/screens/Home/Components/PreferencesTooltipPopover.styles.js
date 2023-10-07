import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	title: {
		...fonts.caption,
		color: palette.grayscale.white,
		fontWeight: 'bold',
		marginBottom: 10
	},
	subtitle: {
		...fonts.caption,
		color: palette.grayscale.white,
		marginBottom: 10
	},
	button: {
		...fonts.textLink,
		color: palette.primary.default,
		textAlign: 'right'
	}
} );
