import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	actions: {
		width: 335,
		height: 'auto'
	},

	cancelButtonContainer: {
		width: 335,
		marginTop: 12,
		marginBottom: 24,
		borderRadius: 8,
		backgroundColor: palette.grayscale.white
	}
} );
