import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	overlay: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		height: 224,
		width: 335,
		borderRadius: 8
	},

	modal: {
		paddingTop: 24,
		paddingHorizontal: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		height: '100%'
	},

	textContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '50%'
	},

	title: {
		...fonts.suplementalTitle,
		textAlign: 'center'
	},

	description: {
		...fonts.body,
		textAlign: 'center',
		color: palette.grayscale.shutterGrey
	}
} );
