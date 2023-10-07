import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	textItemsSelectedCount: {
		...fonts.subTitle,
		color: palette.grayscale.black
	},
	textItemsSelectedCountContainer: {
		backgroundColor: palette.primary.background,
		borderRadius: 4,
		alignContent: 'center',
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: { marginHorizontal: 6 },
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: 30
	}
} );
