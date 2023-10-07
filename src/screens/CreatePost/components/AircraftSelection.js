// import React from 'react';
// import PropTypes from 'prop-types';
// import { observer } from 'mobx-react-lite';
// import { View } from 'react-native';
// import { styles } from '../CreatePost.styles';
// import { AircraftListContainer } from '../../../components/AircraftListContainer';
// import AircraftSelectionHeader from './AircraftSelectionHeader';
// import Aircraft from '../../../entities/Aircraft';

// const AircraftSelection = ( {
// 	onAddAircraft, aircrafts, selectedAircraftID, onAircraftSelected
// } ) => (
// 	<View style={styles.aircraftSelectionContainer}>
// 		<AircraftSelectionHeader onAddAircraft={onAddAircraft} />
// 		<AircraftListContainer
// 			testID="aircraft-list-container"
// 			aircrafts={aircrafts}
// 			selectedAircraftID={selectedAircraftID}
// 			onAircraftSelected={onAircraftSelected}
// 		/>
// 	</View>
// );

// AircraftSelection.propTypes = {
// 	onAddAircraft: PropTypes.func.isRequired,
// 	aircrafts: PropTypes.arrayOf( PropTypes.instanceOf( Aircraft ) ).isRequired,
// 	onAircraftSelected: PropTypes.func.isRequired,
// 	selectedAircraftID: PropTypes.number
// };

// AircraftSelection.defaultProps = {
// 	selectedAircraftID: null
// };

// export default observer( AircraftSelection );
