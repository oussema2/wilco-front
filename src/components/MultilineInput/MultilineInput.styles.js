import { Platform, StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const viewStyles = StyleSheet.create( {
	container: {
		flex: 1
	}
} );

export const defaultStyle = StyleSheet.create( {
	input: {
		...Platform.select( {
			ios: { ...fonts.bodyFocus },
			android: { fontWeight: 'bold' }
		} ),
		backgroundColor: palette.grayscale.wildSand,
		minHeight: 52,
		paddingHorizontal: 12,
		paddingTop: 16,
		paddingBottom: 16,
		borderRadius: 8,
		textAlignVertical: 'top',
		color: palette.grayscale.black
	},
	errorMessage: {
		...fonts.caption,
		color: palette.error.default,
		marginTop: 5,
		marginLeft: 0,
		margin: 0
	},
	footnoteContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 10
	},
	footnote: {
		...fonts.caption,
		color: palette.grayscale.shutterGrey
	},
	footnoteError: {
		...fonts.caption,
		color: palette.error.default
	},
	footnoteIcon: { width: 16, height: 16 }
} );

export const focusedStyle = StyleSheet.create( {
	...defaultStyle,
	input: {
		...defaultStyle.input,
		backgroundColor: palette.grayscale.iron
	}
} );

export const errorStyle = StyleSheet.create( {
	...defaultStyle,
	input: {
		...defaultStyle.input,
		backgroundColor: palette.error.background
	}
} );

export const disabledStyle = StyleSheet.create( {
	...defaultStyle,
	input: {
		...defaultStyle.input,
		backgroundColor: palette.grayscale.mercury
	}
} );

export const normalStyle = StyleSheet.create( {
	...defaultStyle,
	input: {
		...defaultStyle.input,
		...fonts.body
	}
} );
