import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const defaultStyle = StyleSheet.create( {
	headerView: {
		minHeight: 44,
		flexDirection: 'row'
	},
	pilotAvatarView: {
		backgroundColor: palette.grayscale.aluminum,
		height: 44,
		aspectRatio: 1,
		borderRadius: 22,
		alignSelf: 'center'
	},
	optionsImage: {
		height: 20,
		width: 20,
		marginTop: 1
	},
	starImage: {
		height: 16,
		width: 16
	},
	titleView: {
		marginLeft: 10,
		marginVertical: 2,
		justifyContent: 'center',
		flex: 1
	},
	pilotName: {
		...fonts.bodyFocus,
		color: palette.secondary.default,
		flexWrap: 'wrap'
	},
	titleInfo: {
		...fonts.body,
		color: palette.secondary.default
	},
	titleExtraInfoSeparatorView: {
		...fonts.bodySmall,
		color: palette.grayscale.abbey
	},
	titleExtraInfo: {
		...fonts.caption,
		color: palette.grayscale.shutterGrey
	},
	bodyView: {
		marginTop: 4
	},
	bodyInfo: {
		...fonts.caption,
		color: palette.grayscale.shutterGrey,
		flexWrap: 'wrap'
	},
	bodyQuaternaryInfo: {
		...fonts.captionSmallFocus,
		color: palette.primary.default,
		flexWrap: 'wrap',
		marginTop: 4
	},
	bodyExtraInfoSeparatorView: {
		...fonts.caption,
		color: palette.grayscale.abbey
	},
	leftViewContainer: {
		minHeight: 44,
		flexDirection: 'row',
		flex: 1
	},
	rightViewContainer: { justifyContent: 'center' },
	rightActionImage: { width: 31, height: 31 }
} );

export const withoutBodyStyle = StyleSheet.create( {
	bodyView: {
		...defaultStyle.bodyView,
		marginTop: 0,
		height: 0
	}
} );

export const smallStyle = StyleSheet.create( {
	...defaultStyle,
	headerView: {
		...defaultStyle.headerView,
		minHeight: 40
	},
	pilotAvatarView: {
		...defaultStyle.pilotAvatarView,
		height: 28,
		marginTop: 6
	},
	bodyView: {
		...withoutBodyStyle.bodyView
	}
} );
