import { StyleSheet } from 'react-native';
import { fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	horizontalPadding: { flex: 1 },
	checkboxListContainer: {
		flex: 1,
		paddingBottom: 100
	},
	fixedBottomContentContainer: {
		height: 70,
		justifyContent: 'center',
		flexDirection: 'row'
	},
	buttonContainer: {
		flex: 0.5,
		alignItems: 'center'
	},
	label: {
		...fonts.title,
		marginBottom: 20,
		marginTop: 10
	}
} );
