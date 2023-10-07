import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	buttonContainer: {
		alignItems: 'center'
	},
	emailTextInput: {
		marginVertical: 24
	},
	passwordTextInput: {
		marginBottom: 48
	},
	container: {
		width: '100%',
		flexDirection: 'column',
		flex: 1
	},
	forgotPasswordContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: 112
	},
	forgotPasswordText: {
		color: palette.grayscale.black,
		...fonts.buttonTextSmall
	}
} );
