import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	containerView: {
		minHeight: 44,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	backArrowContainer: {
		flex: 0.25,
		justifyContent: 'flex-start'
	},
	backArrow: {
		height: 20,
		width: 20
	},
	backArrowPlaceholder: {
		width: 20
	},
	titleContainer: {
		flex: 0.5,
		justifyContent: 'center'
	},
	title: {
		...fonts.title,
		color: palette.grayscale.black,
		flex: 1,
		textAlign: 'center',
		alignItems: 'center'
	},
	rightIconPlaceholder: {
		width: 20
	},
	rightImageStyle: {
		width: 20,
		height: 20
	},
	rightTextContainer: {
		flex: 0.25,
		justifyContent: 'flex-end'
	},
	rightTextStyle: {
		fontSize: 16,
		alignSelf: 'center'
	}
} );
