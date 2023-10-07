import { Dimensions, StyleSheet } from 'react-native';
import { dimensions } from '../../../Theme';

const horizontalPadding = dimensions.horizontalPadding * 2;
const width = Dimensions.get( 'window' ).width - horizontalPadding;
const avatarDimension = 132;
const borderRadius = 4;

export const styles = StyleSheet.create( {
	headerContainer: {
		alignItems: 'center', marginTop: 30, justifyContent: 'center'
	},
	headerMargin: { marginTop: 60 },
	contentContainer: {
		alignItems: 'center'
	},
	userAvatar: { width: avatarDimension, height: avatarDimension, borderRadius: avatarDimension },
	userName: { width: 84, height: 24 },
	contentLine1: {
		width: 269, height: 44, borderRadius, marginTop: 24
	},
	contentLine2: {
		width: Math.min( width, 324 ), height: 20, borderRadius, marginTop: 24
	},
	contentLine3: {
		width: Math.min( width, 278 ), height: 20, borderRadius, marginTop: 8
	},
	contentLine4: {
		width: Math.min( width, 211 ), height: 20, borderRadius, marginTop: 36, marginBottom: 36
	},
	contentLine5: {
		width: Math.min( width, 211 ), height: 56, borderRadius: 26, marginTop: 36
	},
	contentLine6: {
		width: Math.min( width, 108 ), height: 20, borderRadius, marginTop: 74
	},
	contentLine7: {
		width: Math.min( width, 240 ), height: 20, borderRadius, marginTop: 16
	},
	postContentContainer: {
		flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginBottom: 30
	}
} );
