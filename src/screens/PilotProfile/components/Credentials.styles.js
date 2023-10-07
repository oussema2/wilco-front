import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create( {
	title: {
		marginBottom: 20
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start'
	},
	certificateIconStyle: {
		width: 15,
		height: 20
	},
	ratingIconStyle: {
		width: 18,
		height: 18
	},
	textWithIcon: {
		marginRight: 24,
		marginBottom: 4
	},
	separatorViewCredentials: {
		height: 16
	},
	horizontalPadding: { backgroundColor: 'white', marginBottom: 24 },
	credentialsContainer: { marginTop: 24 },
	emptyStateTextContainer: { marginBottom: 20 },
	separatorViewBottom: { height: 20 }
} );
