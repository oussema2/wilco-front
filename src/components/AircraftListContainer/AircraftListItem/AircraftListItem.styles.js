import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../../Theme';

export const styles = StyleSheet.create( {
	listItemContainer: {
		height: 40,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	makeAndModel: {
		marginLeft: 10,
		...fonts.body,
		color: palette.grayscale.shutterGrey
	},
	dot: {
		marginLeft: 8,
		...fonts.bodySmall,
		color: palette.grayscale.abbey
	},
	tailNumber: {
		marginLeft: 8,
		...fonts.body
	},
	optionsContainer: {
		marginLeft: 'auto'
	},
	checkBox: {
		margin: 0,
		width: 10,
		padding: 0
	},
	avatarContainer: { marginLeft: 10 }
} );
