import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const styles = StyleSheet.create( {
	emailInput: {
		marginTop: 24
	},
	commonInput: {
		marginTop: 24
	},
	buttonContainer: {
		marginTop: 48,
		alignItems: 'center'
	},
	separatorHeaderView: {
		height: 20
	},
	separatorFormView: {
		height: 20
	},
	stepIndicatorActive: {
		width: 24,
		height: 8,
		backgroundColor: palette.primary.default,
		borderRadius: 5,
		marginRight: 8
	},
	stepIndicatorInactive: {
		width: 24,
		height: 8,
		backgroundColor: palette.grayscale.iron,
		borderRadius: 5,
		marginRight: 8
	},
	stepIndicatorContainer: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	stepItemSeparator: { width: 8 }
} );
