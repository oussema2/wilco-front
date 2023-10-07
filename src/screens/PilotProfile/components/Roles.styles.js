import { StyleSheet } from 'react-native';
import { palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	title: {
		marginTop: 16,
		marginBottom: 20
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingRight: 10
	},
	textWithIcon: {
		marginRight: 24,
		marginBottom: 5
	},
	communityTagsIcon: {
		width: 28,
		height: 28
	},
	horizontalPadding: {
		backgroundColor: palette.grayscale.white,
		marginTop: 24
	},
	separatorViewBottom: { height: 20 }
} );
