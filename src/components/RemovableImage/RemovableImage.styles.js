import { StyleSheet } from 'react-native';

export const imageStyles = ( { tintColor, size } ) => StyleSheet.create( {
	image: {
		tintColor,
		height: size,
		width: size,
		display: 'flex',
		flexDirection: 'column-reverse'
	}
} );

export const buttonStyles = StyleSheet.create( {
	button: {
		width: 28,
		height: 28,
		marginLeft: 20,
		marginBottom: 12,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		borderRadius: 16
	}
} );
