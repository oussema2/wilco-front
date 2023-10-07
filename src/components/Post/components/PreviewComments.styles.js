import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	seeAllCommentsContainer: {
		width: '100%',
		marginVertical: 16
	},
	seeAllCommentsText: {
		...fonts.bodySmall,
		textAlign: 'center',
		alignSelf: 'center',
		color: palette.primary.default
	}
} );
