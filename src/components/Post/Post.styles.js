import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	postContainer: {
		marginBottom: 24,
		paddingTop: 16
	},
	background: {
		backgroundColor: palette.grayscale.white
	},
	title: {
		...fonts.textLink,
		color: palette.grayscale.black,
		marginTop: 8
	},
	text: {
		...fonts.body,
		color: palette.grayscale.black,
		marginTop: 8
	},
	imageContainer: {
		marginTop: 16
	},
	communitiesContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		paddingVertical: 16
	},
	communitiesScrollView: {
		paddingHorizontal: 18
	},
	communitiesLinearGradient: {
		height: 15, marginBottom: -15
	},
	communityTagItemIcon: {
		width: 10,
		height: 13
	},
	communityTagItemText: {
		...fonts.caption,
		marginRight: 11,
		color: palette.grayscale.black
	},
	communityTagItem: {
		borderRadius: 20,
		flexDirection: 'row',
		minHeight: 24,
		marginRight: 8,
		backgroundColor: palette.primary.background,
		paddingHorizontal: 12
	},
	communityTagItemContainer: {
		justifyContent: 'center'
	}
} );
