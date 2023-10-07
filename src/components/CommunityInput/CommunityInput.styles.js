import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	viewContainer: {
		minHeight: 98,
		zIndex: 2,
		elevation: 2
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
	SearchInputContainer: {
		zIndex: 1,
		elevation: 1
	},
	helperText: { ...fonts.caption, marginBottom: 8, marginTop: -8 },
	helperTextError: {
		color: palette.error.default
	}
} );
