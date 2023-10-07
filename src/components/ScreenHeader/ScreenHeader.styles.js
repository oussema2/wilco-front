import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	containerView: {
		minHeight: 60,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	rightButtonStyle: {
		backgroundColor: 'transparent',
		padding: 0,
		alignSelf: 'flex-end'
	},
	rightButtonTitleStyle: {
		...fonts.textLink,
		color: palette.error.default
	},
	title: {
		...fonts.heading,
		color: palette.grayscale.black
	}
} );
