import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	container: {
		width: '100%',
		paddingHorizontal: 20
	},
	innerContainer: {
		marginBottom: 16,
		height: 128,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderRadius: 1,
		borderColor: palette.primary.default,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		height: 24,
		width: 24
	},
	text: {
		...fonts.bodySmall,
		color: palette.primary.default
	}
} );
