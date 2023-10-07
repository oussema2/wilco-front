import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	listContainer: {
		position: 'relative',
		backgroundColor: palette.grayscale.iron,
		width: '100%',
		borderRadius: 4,
		zIndex: 1,
		marginBottom: 16
	},
	list: {
		borderWidth: 0,
		borderRadius: 4,
		paddingVertical: 10,
		zIndex: 1
	},
	listItem: {
		paddingVertical: 6,
		paddingHorizontal: 15,
		alignItems: 'flex-start',
		zIndex: 2
	},
	listItemText: {
		...fonts.body, color: palette.grayscale.black
	}
} );
