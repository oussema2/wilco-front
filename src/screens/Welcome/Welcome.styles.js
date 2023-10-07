import { StyleSheet } from 'react-native';
import { fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	title: {
		...fonts.heading,
		textAlign: 'center',
		marginTop: 24,
		marginHorizontal: 30
	},
	signInButton: {
		marginTop: 88
	},
	logInButton: {
		marginTop: 20
	},
	container: {
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center',
		marginTop: 88
	},
	brandSymbol: {
		width: 118,
		height: 60
	}
} );
