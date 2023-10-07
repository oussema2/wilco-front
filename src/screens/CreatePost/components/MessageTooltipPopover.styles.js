import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	text: {
		...fonts.caption,
		color: palette.grayscale.white
	},
	boldText: {
		...fonts.caption,
		color: palette.grayscale.white,
		fontWeight: 'bold'
	}
} );
