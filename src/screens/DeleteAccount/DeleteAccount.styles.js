import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	scrollView: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 53
	},
	infoContainer: {
		flex: 1,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	deleteAccountButtonContainer: {
		alignItems: 'flex-end'
	},
	button: {
		alignSelf: 'flex-end',
		backgroundColor: palette.error.default
	},
	imageExclamationTriangle: {
		width: 40,
		height: 40,
		marginBottom: 16
	},
	subtitle: { textAlign: 'center' },
	listInfoContainer: {
		alignSelf: 'flex-start',
		paddingHorizontal: 29
	},
	listInfoContent: {
		marginTop: 37,
		alignSelf: 'flex-start'
	},
	warningContainer: {
		alignSelf: 'flex-start',
		paddingHorizontal: 25,
		width: '100%',
		marginVertical: 48
	},
	warningContent: {
		backgroundColor: palette.warning.default,
		minHeight: 20,
		width: '100%',
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center'
	},
	imageExclamationCircle: {
		width: 32,
		height: 32,
		marginHorizontal: 5
	},
	warningText: {
		...fonts.bodyFocus,
		color: palette.grayscale.shutterGrey,
		flex: 1,
		textAlign: 'center'
	},
	confirmationSubtitle: { marginHorizontal: 20 },
	passwordContainer: {
		width: '100%',
		marginTop: 48
	}
} );
