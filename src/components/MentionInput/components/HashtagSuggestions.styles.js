import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	item: {
		...fonts.bodyFocus,
		color: palette.secondary.default,
		marginVertical: 10
	},
	horizontalHashtagSeparator: {
		marginHorizontal: 10,
		fontWeight: 'bold'
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 5
	},
	hashtagImage: {
		width: 16,
		height: 16,
		marginHorizontal: 0
	}
} );
