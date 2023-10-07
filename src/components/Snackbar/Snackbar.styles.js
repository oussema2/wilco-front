import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const defaultStyles = StyleSheet.create( {
	snackbar: {
		marginBottom: 50,
		marginHorizontal: 8,
		minHeight: 67,
		borderRadius: 8,
		backgroundColor: palette.grayscale.black,
		color: palette.grayscale.white
	}
} );

export const successStyles = StyleSheet.create( {
	...defaultStyles,
	snackbar: {
		...defaultStyles.snackbar,
		backgroundColor: palette.success.default
	}
} );

export const errorStyles = StyleSheet.create( {
	...defaultStyles,
	snackbar: {
		...defaultStyles.snackbar,
		backgroundColor: palette.error.default
	}
} );
