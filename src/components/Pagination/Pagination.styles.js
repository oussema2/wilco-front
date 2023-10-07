import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	container: {
		backgroundColor: 'transparent',
		paddingVertical: 0,
		marginTop: 8
	},
	dotContainer: {
		marginHorizontal: 4
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 5,
		backgroundColor: palette.primary.default
	},
	inactiveDot: {
		backgroundColor: palette.grayscale.iron
	}
} );
