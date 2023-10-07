import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		marginBottom: 20
	},
	textWithIcon: {
		flexDirection: 'row',
		marginRight: 8,
		marginBottom: 12,
		backgroundColor: palette.primary.middleBlue,
		paddingHorizontal: 12,
		minHeight: 24,
		borderRadius: 20
	},
	text: {
		...fonts.caption,
		marginRight: 10,
		color: palette.grayscale.black
	},
	removeIcon: {
		width: 14,
		height: 14
	},
	tagItemSeparator: {
		width: 20
	},
	removeContainer: { justifyContent: 'center' }
} );
