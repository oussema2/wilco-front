import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	container: {
		marginLeft: 50
	},
	scrollView: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	bullet: {
		...fonts.bodyFocus,
		color: palette.grayscale.black,
		fontSize: 20,
		marginTop: 5
	},
	aircraftItem: {
		marginRight: 5
	},
	aircraftItemIcon: {
		width: 20,
		height: 14
	}
} );
