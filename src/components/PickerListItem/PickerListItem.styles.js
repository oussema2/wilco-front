import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	listItemContainer: {
		height: 60,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	text: {
		marginLeft: 10,
		...fonts.body,
		color: palette.grayscale.shutterGrey
	},
	optionsContainer: {
		marginLeft: 'auto'
	}
} );
