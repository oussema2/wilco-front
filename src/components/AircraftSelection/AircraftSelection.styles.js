import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create( {
	aircraftSelectionContainer: {
		marginBottom: 36
	},
	aircraftSelectionHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12
	},
	buttonWithAircrafts: {
		alignSelf: 'flex-start',
		marginTop: 24,
		marginLeft: 20
	},
	buttonWithoutAircrafts: {
		alignSelf: 'center',
		marginTop: 24
	}
} );
