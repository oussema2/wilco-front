import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	row: {
		marginVertical: 5, backgroundColor: 'transparent', marginHorizontal: 0, paddingHorizontal: 0, borderWidth: 0, borderBottomWidth: 0
	},
	checkbox: {
		borderWidth: 0,
		backgroundColor: palette.grayscale.mercury,
		borderRadius: 4,
		width: 20,
		height: 20,
		marginRight: 12
	},
	selectMultiple: { borderWidth: 0, borderBottomWidth: 0 },
	selectedCheckbox: { backgroundColor: 'transparent' },
	label: {
		...fonts.body
	},
	selectedLabel: {
		...fonts.bodyFocus
	}
} );
