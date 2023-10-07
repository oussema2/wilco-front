import { Dimensions, StyleSheet } from 'react-native';
import { dimensions } from '../../../Theme';

const horizontalPadding = dimensions.horizontalPadding * 2;
const width = Dimensions.get( 'window' ).width - horizontalPadding;
const avatarDimension = 44;
const borderRadius = 4;

export const styles = StyleSheet.create( {
	headerContainer: {
		flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 12
	},
	userAvatar: { width: avatarDimension, height: avatarDimension, borderRadius: avatarDimension },
	userInfo: { marginLeft: 20 },
	userInfoLine1: { width: 218, height: 20, borderRadius },
	userInfoLine2: {
		marginTop: 6, width: 50, height: 12, borderRadius
	},
	postContentLine1: {
		width: 350, height: 16, borderRadius, marginTop: 4
	},
	postContentLine2: {
		width, height: 16, borderRadius, marginTop: 4
	},
	postContentLine3: {
		width, height: 16, borderRadius, marginTop: 4, marginBottom: 16
	},
	postContentLine4: {
		width, height: 12, borderRadius, marginTop: 4
	},
	postContentContainer: {
		flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginBottom: 30
	},
	postContentLine5: { width: 96, height: 12, marginRight: 48 },
	postContentLine6: { width: 96, height: 12 }
} );
