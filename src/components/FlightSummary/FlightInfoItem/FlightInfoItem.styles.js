import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	itemContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginRight: 24
	},
	text: {
		...fonts.body,
		color: palette.grayscale.shutterGrey
	}
} );
