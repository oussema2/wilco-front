import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	textWithIcon: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	iconView: {
		width: 28,
		height: 28,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	icon: {
		height: 14,
		width: 20,
		tintColor: palette.secondary.default
	},

	text: {
		marginLeft: 4,
		...fonts.bodyFocus
	}
} );
