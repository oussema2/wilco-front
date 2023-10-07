import { StyleSheet } from 'react-native';
import { palette, fonts } from '../../Theme';

export const styles = StyleSheet.create( {
	viewContainer: {
		minHeight: 98
	},
	labelContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignContent: 'center'
	},
	label: {
		...fonts.title,
		marginBottom: 4
	},
	tooltipLabel: {
		...fonts.title,
		marginBottom: 4,
		paddingRight: 16
	},
	required: {
		...fonts.bodyFocus,
		color: palette.error.default,
		marginLeft: 4
	},
	imageTooltipContainer: {
		width: 35,
		alignItems: 'center'
	},
	imageTooltip: {
		width: 16,
		height: 16,
		marginLeft: 0
	}
} );
