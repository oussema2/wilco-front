import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	commentContainer: {
		marginTop: 18,
		borderBottomColor: '#F2F2F2',
		borderBottomWidth: 1,
		paddingBottom: 16
	},
	text: {
		...fonts.body,
		color: palette.grayscale.black
	}
} );
