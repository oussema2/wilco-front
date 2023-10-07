import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	button: {
		backgroundColor: palette.grayscale.white,
		borderColor: palette.grayscale.abbey,
		borderWidth: 2
	},
	title: {
		...fonts.bodySmall,
		color: palette.grayscale.abbey
	}
} );
