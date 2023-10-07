import { StyleSheet } from 'react-native';
import { fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	row: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 20,
		backgroundColor: 'transparent',
		marginHorizontal: 0,
		paddingHorizontal: 0,
		borderWidth: 0,
		borderBottomWidth: 0
	},
	radioButton: {
		backgroundColor: 'transparent',
		marginRight: 12
	},
	list: { borderWidth: 0, borderBottomWidth: 0 },
	label: {
		...fonts.body
	}
} );
