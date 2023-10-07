import { Platform, StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const viewStyles = StyleSheet.create( {
	container: {
		flex: 1
	}
} );

export const defaultStyle = StyleSheet.create( {
	container: {
		paddingHorizontal: 0
	},
	inputContainer: {
		borderBottomWidth: 0,
		backgroundColor: palette.grayscale.wildSand,
		paddingHorizontal: 12,
		borderRadius: 8,
		textAlignVertical: 'center',
		marginBottom: 5,
		minHeight: 52
	},
	input: {
		...Platform.select( {
			ios: { ...fonts.bodyFocus },
			android: { fontWeight: 'bold' }
		} ),
		color: palette.grayscale.black,
		paddingVertical: 0
	},
	errorMessage: {
		...fonts.caption,
		color: palette.error.default,
		marginLeft: 0,
		margin: 0
	},
	helperText: {
		...fonts.caption,
		color: palette.grayscale.black
	},
	helperTextWithoutError: {
		...fonts.caption,
		color: palette.grayscale.black,
		marginTop: -14
	}
} );

export const focusedStyle = StyleSheet.create( {
	...defaultStyle,
	inputContainer: {
		...defaultStyle.inputContainer,
		backgroundColor: palette.grayscale.iron
	}
} );

export const errorStyle = StyleSheet.create( {
	...defaultStyle,
	inputContainer: {
		...defaultStyle.inputContainer,
		backgroundColor: palette.error.background
	}
} );

export const disabledStyle = StyleSheet.create( {
	...defaultStyle,
	inputContainer: {
		...defaultStyle.inputContainer,
		backgroundColor: palette.grayscale.mercury
	}
} );

export const errorMessageHiddenStyle = StyleSheet.create( {
	errorMessage: {
		...defaultStyle.errorMessage,
		height: 0
	}
} );
