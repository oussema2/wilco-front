import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get( 'window' ).width;
const windowHeight = Dimensions.get( 'window' ).height;

export const styles = StyleSheet.create( {
	dotContainer: {
		marginBottom: 40,
		backgroundColor: '#00000077',
		paddingVertical: 30,
		paddingTop: 25,
		width: windowWidth
	},
	headerSafeArea: {
		zIndex: 100,
		flexDirection: 'row',
		width: '100%',
		position: 'absolute'
	},
	headerContainer: {
		width: '100%',
		alignItems: 'flex-end'
	},
	headerButton: {
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		width: 45,
		backgroundColor: '#00000077',
		borderRadius: 45,
		marginRight: 20,
		marginTop: 10
	},
	loaderContainer: {
		width: '100%'
	},
	loader: {
		height: windowHeight,
		alignItems: 'center',
		justifyContent: 'center'
	}
} );
