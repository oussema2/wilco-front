import { StyleSheet } from 'react-native';
import { palette } from '../../../Theme';

export const styles = StyleSheet.create( {
	postTitle: {
		marginLeft: 20,
		marginBottom: 16,
		backgroundColor: palette.grayscale.white
	},
	sharePostButtonContainer: {
		marginTop: 40,
		alignItems: 'center'
	},
	activityIndicator: {
		marginBottom: 20
	},
	separatorView: {
		height: 40
	},
	postTitleContainer: { paddingTop: 16, backgroundColor: palette.grayscale.white },
	footerContainer: { backgroundColor: palette.grayscale.aliceBlue, paddingTop: 15 },
	listViewItemContainer: { backgroundColor: palette.grayscale.aliceBlue },
	postSeparatorView: {
		height: 20,
		backgroundColor: palette.grayscale.aliceBlue
	}
} );
