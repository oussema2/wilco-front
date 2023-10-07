import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../../Theme';

export const styles = StyleSheet.create( {
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginRight: 24,
		marginLeft: 24,
		flex: 0.4
	},
	text: {
		...fonts.body,
		color: palette.grayscale.shutterGrey,
		marginLeft: 8
	}
} );
