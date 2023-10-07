import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = ( { textTransform } ) => StyleSheet.create( {
	text: {
		...fonts.subTitle,
		color: palette.grayscale.black,
		minHeight: 22,
		textTransform
	}
} );
