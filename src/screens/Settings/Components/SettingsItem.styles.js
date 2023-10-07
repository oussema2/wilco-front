import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	listItemContainer: {
		backgroundColor: 'transparent',
		padding: 0
	},
	listItemTitleView: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		marginVertical: 14
	},
	listItemTitle: {
		color: palette.grayscale.black,
		...fonts.body
	},
	listItemImageContainerView: {
		alignItems: 'flex-end',
		flex: 1
	},
	listItemImageView: { width: 24, height: 24 },
	divisorLine: { borderTopWidth: 1, borderColor: palette.bluescale.lightBlue }
} );
