import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	checkboxListContainer: {
		flex: 1,
		paddingBottom: 100
	},
	subHeaderContainer: {
		height: 80, justifyContent: 'center', alignItems: 'center'
	},
	subHeaderText: {
		textAlign: 'center',
		...fonts.body,
		color: palette.grayscale.shutterGrey,
		marginHorizontal: '15%'
	},
	rightTextDisabled: { color: palette.grayscale.shutterGrey },
	separatorView: {
		height: 30
	}
} );
