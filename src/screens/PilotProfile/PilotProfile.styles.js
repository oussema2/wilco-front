import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	basicInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginTop: 20
	},
	userNameDisplay: {
		...fonts.hero,
		marginTop: 16,
		textAlign: 'center'
	},
	bannerDisplay: {
		...fonts.subTitle,
		color: palette.grayscale.shutterGrey,
		marginVertical: 28,
		textAlign: 'center'
	},
	editProfileButton: {
		alignSelf: 'center',
		marginTop: 20
	},
	messageButton: {
		alignSelf: 'center',
		marginTop: 20
	},
	pilotInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%'
	},
	shareFlightButtonContainer: {
		marginTop: 40,
		alignItems: 'center'
	},
	separatorViewRecentFlights: {
		height: 40
	},
	separatorViewPosts: {
		height: 30
	},
	tabIndicator: {
		backgroundColor: palette.primary.default,
		height: 2
	},
	tabItemTitle: {
		...fonts.tabs,
		textTransform: 'none'
	},
	tabItemContainer: { backgroundColor: palette.grayscale.white },
	tabViewItemContainer: {
		backgroundColor: palette.grayscale.aliceBlue,
		width: '100%'
	},
	tabActive: { color: palette.primary.default },
	tabInactive: {
		...fonts.tabsMedium,
		color: palette.grayscale.black
	},
	recentFlightContainer: {
		backgroundColor: palette.grayscale.white,
		marginTop: 24,
		paddingTop: 16,
		paddingBottom: 40
	},
	maxHeightInactiveTab: { maxHeight: 0 },
	container: {
		flex: 1,
		paddingBottom: 32
	},
	separatorView: {
		height: 20,
		backgroundColor: palette.grayscale.aliceBlue
	}
} );
