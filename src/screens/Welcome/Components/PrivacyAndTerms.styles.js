import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 20
	},
	text: {
		...fonts.caption,
		fontSize: 12,
		textAlign: 'center',
		marginHorizontal: 58,
		color: palette.grayscale.shutterGrey
	},
	link: {
		textDecorationLine: 'underline'
	}
} );
