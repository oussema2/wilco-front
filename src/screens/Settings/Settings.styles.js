import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	container: { flex: 1, justifyContent: 'space-between' },
	separatorView: {
		height: 56
	},
	separatorTitle: {
		height: 16
	},
	scrollView: {
		marginBottom: 50
	},
	logOutContainer: { paddingBottom: 37 },
	logOutItem: {
		...fonts.subTitle,
		color: palette.error.default
	},
	deleteAccountItem: {
		color: palette.error.default
	}
} );
