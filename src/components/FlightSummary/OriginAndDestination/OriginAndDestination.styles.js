import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	container: {
		display: 'flex',
		flexDirection: 'row',
		marginRight: 24
	},
	itemContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	fromAndTo: {
		marginTop: 5,
		...fonts.bodyFocus,
		color: palette.grayscale.black
	},
	times: {
		...fonts.body,
		color: palette.grayscale.shutterGrey
	},
	arrow: {
		margin: 7,
		tintColor: palette.grayscale.aluminum,
		width: 18,
		height: 18
	}
} );
