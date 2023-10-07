import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	placeholderContainer: {
		flex: 1,
		backgroundColor: palette.grayscale.white,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		marginBottom: 50
	},
	horizontalPadding: { alignItems: 'center', marginHorizontal: '15%' },
	image: {
		width: 80,
		height: 80,
		marginBottom: 18
	},
	text: {
		...fonts.bodyFocus,
		color: palette.grayscale.shutterGrey,
		textAlign: 'center'
	},
	separatorView: {
		height: 20
	}
} );
