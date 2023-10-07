import { StyleSheet } from 'react-native';
import { PHOTO_AND_TRACK_ASPECT_RATIO as trackAspectRatio } from '../../constants/images';

export const styles = StyleSheet.create( {
	trackSwitch: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 16
	},
	trackContainer: {
		flexDirection: 'row',
		marginBottom: 0
	},
	track: {
		flex: 1,
		aspectRatio: trackAspectRatio
	}
} );
