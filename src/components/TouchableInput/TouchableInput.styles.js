import { Platform, StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const defaultStyle = StyleSheet.create( {
	touchableInputContainer: {
		height: 98
	},
	labelContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignContent: 'center'
	},
	label: {
		...fonts.title,
		marginBottom: 4
	},
	required: {
		...fonts.bodyFocus,
		color: palette.error.default,
		marginLeft: 4
	},
	textContainer: {
		flexDirection: 'row',
		borderRadius: 8,
		backgroundColor: palette.grayscale.wildSand,
		minHeight: 52,
		paddingHorizontal: 12,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	text: {
		...fonts.bodyFocus,
		color: palette.grayscale.black,
		...Platform.select( {
			android: { fontSize: 13, marginLeft: 2 }
		} ),
		flex: 1
	},
	placeholder: {
		...Platform.select( {
			ios: { ...fonts.body },
			android: { ...fonts.bodyFocus, fontSize: 13, marginLeft: 2 }
		} ),
		color: palette.grayscale.aluminum
	},
	errorContainer: {
		marginVertical: 5
	},
	error: {
		...fonts.caption,
		color: palette.error.default
	},
	iconStyle: { width: 14, height: 23 }
} );

export const errorStyle = {
	...defaultStyle,
	textContainer: {
		...defaultStyle.textContainer,
		backgroundColor: palette.error.background
	}
};
