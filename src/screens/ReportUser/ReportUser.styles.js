import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export default StyleSheet.create( {
	subHeaderContainer: {
		height: 80, justifyContent: 'center', alignItems: 'center'
	},
	subHeaderText: {
		textAlign: 'center',
		...fonts.body,
		color: palette.grayscale.shutterGrey
	},
	buttonContainer: {
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 8
	}
} );
