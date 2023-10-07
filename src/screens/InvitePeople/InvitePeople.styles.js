import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	scrollView: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 40
	},
	subtitle: {
		textAlign: 'center',
		marginHorizontal: 29,
		color: palette.grayscale.shutterGrey
	},
	imageContainer: {
		flexDirection: 'row',
		marginTop: 72
	},
	button: {
		marginTop: 72
	},
	image: {
		width: 159,
		height: 78
	}
} );
