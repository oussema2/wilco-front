import { StyleSheet } from 'react-native';
import { fonts, palette } from '../../Theme';

export const styles = StyleSheet.create( {
	wrapper: {},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#2b2b2b',
		fontSize: 30,
		fontWeight: 'bold'
	},
	buttonWrapperStyle: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		left: 0,
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
		paddingBottom: 30,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	paginationStyle: {
		top: 0,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginTop: -30,
		position: 'absolute'
	},
	title: {
		...fonts.heading,
		textAlign: 'center',
		marginHorizontal: 41
	},
	subtitle: {
		...fonts.subTitle,
		textAlign: 'center',
		marginTop: 15,
		marginHorizontal: 20,
		color: palette.grayscale.shutterGrey
	},
	textContainer: { height: 168	},
	image: {
		marginTop: 100
	},
	scrollView: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButtonContainer: { zIndex: 9999, elevation: 5 }
} );
