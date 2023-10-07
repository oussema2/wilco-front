import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	firstInputStyle: {
		marginTop: 16,
		marginBottom: 8
	},

	inputStyle: {
		marginVertical: 8
	},

	buttonContainer: {
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 8
	},

	separatorView: {
		height: 28
	},

	separatorSectionView: {
		height: 16,
		backgroundColor: palette.grayscale.aliceBlue
	},

	separatorEndView: {
		marginTop: 10,
		height: 40
	},

	basicInfoTitle: {
		color: palette.secondary.default,
		textAlign: 'center'
	},

	basicInfoContainer: {
		backgroundColor: palette.grayscale.white,
		marginTop: 30
	},

	pilotInfoContainer: {
		paddingTop: 16,
		backgroundColor: palette.grayscale.white
	}
} );
