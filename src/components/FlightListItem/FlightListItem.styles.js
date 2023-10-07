import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	containerView: {
		height: 40,
		marginTop: 4,
		flex: 1
	},
	innerContainerView: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1
	},
	originAndDestination: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	airportName: {
		...fonts.bodyFocus,
		color: palette.grayscale.black,
		textTransform: 'uppercase',
		maxWidth: 55
	},
	arrowIcon: {
		marginHorizontal: 4,
		marginVertical: 1
	},
	timeView: {
		flex: 1,
		marginHorizontal: 20,
		flexDirection: 'row'
	},
	time: {
		...fonts.body,
		color: palette.grayscale.shutterGrey
	},
	timeSeparatorView: {
		...fonts.bodySmall,
		color: palette.grayscale.abbey,
		marginHorizontal: 8
	},
	date: {
		...fonts.body,
		color: palette.grayscale.shutterGrey,
		textAlign: 'right'
	},
	checkBox: {
		margin: 0,
		width: 20,
		padding: 0
	}
} );
