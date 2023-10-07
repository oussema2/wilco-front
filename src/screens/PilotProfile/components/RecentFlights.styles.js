import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	title: {
		marginBottom: 12
	},
	containerView: {
		minHeight: 60
	},
	innerContainerView: {
		minHeight: 20,
		marginVertical: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	originAndDestination: {
		flexDirection: 'row',
		flex: 0.45
	},
	airportName: {
		...fonts.bodyFocus,
		color: palette.grayscale.black,
		textTransform: 'uppercase',
		maxWidth: 52
	},
	arrowIcon: {
		marginHorizontal: 8,
		marginVertical: 1,
		alignSelf: 'center'
	},
	date: {
		...fonts.body,
		color: palette.grayscale.shutterGrey,
		flex: 0.25,
		textAlign: 'right'
	}
} );
