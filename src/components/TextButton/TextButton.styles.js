import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const defaultStyle = StyleSheet.create( {
	button: {
		backgroundColor: 'transparent',
		padding: 0,
		alignSelf: 'flex-end'
	},
	title: {
		...fonts.textLink,
		color: palette.primary.default
	}
} );

export const destructiveStyle = StyleSheet.create( {
	...defaultStyle,
	title: {
		...defaultStyle.title,
		color: palette.error.default
	}
} );
