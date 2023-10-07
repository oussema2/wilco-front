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
		backgroundColor: palette.primary.background,
		paddingHorizontal: 16,
		paddingVertical: 10,
		paddingTop: 12,
		borderRadius: 20
	},
	text: {
		...fonts.bodySmall,
		color: palette.grayscale.abbey
	},
	removeIcon: {
		marginLeft: 10,
		width: 20,
		height: 20
	}
} );
