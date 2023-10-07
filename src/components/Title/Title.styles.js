import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = ( { textTransform } ) => StyleSheet.create( {
	text: {
		...fonts.title,
		color: palette.grayscale.black,
		minHeight: 22,
		textTransform
	},
	rightText: {
		...fonts.textLink,
		textAlign: 'right',
		flex: 1,
		color: palette.primary.default
	},
	required: {
		color: palette.error.default,
		fontSize: 16
	}
} );
