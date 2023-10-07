import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	separatorItems: {
		marginBottom: 20
	},
	screenHeader: {
		marginBottom: 5
	},
	flatListHeader: {
		height: 32
	},
	flatListFooter: {
		position: 'relative',
		paddingVertical: 0,
		marginTop: 0,
		marginBottom: 30
	},
	tabIndicator: {
		backgroundColor: palette.primary.default,
		height: 2
	},
	tabItemTitle: {
		...fonts.tabs,
		textTransform: 'none'
	},
	tabItemContainer: {
		backgroundColor: palette.grayscale.white
	},
	tabViewItemContainer: {
		width: '100%',
		height: '100%',
		flex: 1,
		backgroundColor: palette.grayscale.white
	},
	tabActive: { color: palette.primary.default },
	tabInactive: {
		...fonts.tabsMedium,
		color: palette.grayscale.black
	}
} );
