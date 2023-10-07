import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	separatorItemsView: {
		marginBottom: 20
	},
	separatorFooterView: {
		height: 40
	},
	screenHeader: {
		marginBottom: 5
	},
	footerFlatList: {
		position: 'relative',
		paddingVertical: 0,
		marginTop: 0,
		marginBottom: 30
	},
	emptyStateContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 100
	},
	emptyStateImage: { width: 80, height: 80 },
	contentContainerStyle: { flexGrow: 1 },
	flatListHeader: {
		height: 32
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
		backgroundColor: palette.grayscale.white
	},
	tabActive: { color: palette.primary.default },
	tabInactive: {
		...fonts.tabsMedium,
		color: palette.grayscale.black
	}
} );
