import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	image: {
		width: '100%',
		backgroundColor: palette.grayscale.aluminum
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
	},
	renderLoaderContainer: {
		width: '100%',
		justifyContent: 'center',
		backgroundColor: palette.grayscale.aluminum
	}
} );
