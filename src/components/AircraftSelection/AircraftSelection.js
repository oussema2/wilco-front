import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { AircraftListContainer } from '../AircraftListContainer';
import AircraftSelectionHeader from './AircraftSelectionHeader';
import { HorizontalPadding } from '../HorizontalPadding';
import Aircraft from '../../entities/Aircraft';
import { styles } from './AircraftSelection.styles';
import { TextButton } from '../TextButton';

const AircraftSelection = ( {
	title, onAddAircraft, aircrafts, selectedAircraftID, onAircraftSelected, onAircraftOptionsPressed,
	showAvatar, showButtonInBottom, required
} ) => (
	<View style={styles.aircraftSelectionContainer}>
		<HorizontalPadding>
			<AircraftSelectionHeader
				title={title}
				required={required}
				onAddAircraft={!showButtonInBottom && onAddAircraft}
			/>
		</HorizontalPadding>
		<AircraftListContainer
			testID="aircraft-list-container"
			aircrafts={aircrafts}
			selectedAircraftID={selectedAircraftID}
			onAircraftSelected={onAircraftSelected}
			onAircraftOptionsPressed={onAircraftOptionsPressed}
			showAvatar={showAvatar}
		/>
		{showButtonInBottom && (
			<TextButton
				testID="add-aircraft-button"
				title="Add an aircraft"
				style={aircrafts.length ? styles.buttonWithAircrafts : styles.buttonWithoutAircrafts}
				onPress={onAddAircraft}
			/>
		)}
	</View>
);

AircraftSelection.propTypes = {
	title: PropTypes.string,
	onAddAircraft: PropTypes.func.isRequired,
	aircrafts: PropTypes.arrayOf( PropTypes.instanceOf( Aircraft ) ).isRequired,
	onAircraftSelected: PropTypes.func.isRequired,
	onAircraftOptionsPressed: PropTypes.func,
	selectedAircraftID: PropTypes.number,
	showAvatar: PropTypes.bool,
	showButtonInBottom: PropTypes.bool,
	required: PropTypes.bool
};

AircraftSelection.defaultProps = {
	title: 'Select aircraft',
	selectedAircraftID: null,
	onAircraftOptionsPressed: () => {},
	showAvatar: false,
	showButtonInBottom: false,
	required: false
};

export default observer( AircraftSelection );
