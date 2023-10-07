import { StyleSheet } from 'react-native';
import { fonts } from '../../Theme';

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
		paddingHorizontal: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: '100%'
	},

	title: {
		...fonts.suplementalTitle
	},

	actionsContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	}
} );
