import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	keyboardAwareScrollView: {
		backgroundColor: palette.grayscale.aliceBlue
	},
	subHeaderContainer: {
		height: 80, justifyContent: 'center', alignItems: 'center'
	},
	subHeaderText: {
		textAlign: 'center',
		...fonts.body,
		color: palette.grayscale.shutterGrey
	},
	flightSeparatorView: {
		height: 24,
		backgroundColor: palette.grayscale.aliceBlue,
		marginBottom: 16
	},
	trackSeparatorView: {
		height: 24,
		backgroundColor: palette.grayscale.aliceBlue,
		marginBottom: 0
	},
	rightTextDisabled: { color: palette.grayscale.shutterGrey },
	aircraftSelectionContainer: {
		backgroundColor: palette.grayscale.white
	},
	separatorView: {
		height: 16
	},
	sectionBackground: {
		backgroundColor: palette.grayscale.white
	},
	buttonContainer: {
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 10
	}
} );
