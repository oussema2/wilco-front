import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	text: {
		...fonts.suplementalTitle,
		color: palette.primary.default,
		minHeight: 24
	}
} );
