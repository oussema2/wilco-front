import { StyleSheet } from 'react-native';
import { palette } from '../../Theme';

export const mentionStyles = StyleSheet.create( {
	linkStyle: {
		fontWeight: 'bold',
		color: palette.primary.default
	},
	suggestionContainer: {
		paddingTop: 10,
		backgroundColor: palette.primary.light,
		marginBottom: -10,
		width: '100%',
		zIndex: 1000,
		paddingLeft: 8
	},
	suggestionItem: {
		marginBottom: 10,
		marginHorizontal: 0
	},
	activityIndicator: {
		minHeight: 40,
		marginLeft: 10,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	airportStyle: {
		fontWeight: 'bold'
	}
} );
