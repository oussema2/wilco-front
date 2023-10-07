import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	overlay: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		height: 402,
		width: 375,
		borderRadius: 8

	},
	modal: {
		paddingTop: 24,
		paddingHorizontal: 12,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: '100%'
	},

	title: {
		...fonts.suplementalTitle
	},

	listContainer: {
		marginTop: 24,
		marginBottom: 34,
		width: '100%'
	},

	listItem: {
		paddingHorizontal: 12
	},

	selectedListItem: {
		backgroundColor: palette.primary.background,
		borderColor: palette.primary.default,
		borderWidth: 1,
		paddingHorizontal: 12,
		borderRadius: 8
	},

	actionsContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start'
	}
} );
