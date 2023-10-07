import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const defaultStyle = StyleSheet.create( {
	itemContainer: {
		borderWidth: 1,
		borderColor: 'transparent',
		marginHorizontal: 8,
		marginBottom: 5
	},
	innerItemContainer: {
		marginHorizontal: 8,
		marginLeft: 0
	}
} );

export const selectedStyle = StyleSheet.create( {
	itemContainer: {
		...defaultStyle.itemContainer,
		backgroundColor: palette.primary.background,
		borderColor: palette.primary.default,
		borderRadius: 8
	},
	innerItemContainer: {
		...defaultStyle.innerItemContainer
	}
} );
