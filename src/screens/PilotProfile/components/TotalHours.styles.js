import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	title: {
		marginTop: 16,
		marginBottom: 20
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingRight: 10,
		marginRight: 24,
		marginBottom: 5
	},
	horizontalPadding: {
		backgroundColor: palette.grayscale.white,
		marginBottom: 24
	},
	text: {
		marginLeft: 4,
		...fonts.bodyFocus
	},
	separatorViewBottom: { height: 20 }
} );
