import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	containerView: {
		alignItems: 'flex-start'
	},
	emptyStateBanner: {
		...fonts.body,
		color: palette.grayscale.shutterGrey,
		textAlign: 'center'
	}
} );
