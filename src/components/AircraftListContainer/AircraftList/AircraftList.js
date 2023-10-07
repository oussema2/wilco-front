import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { AircraftListItem } from '../AircraftListItem';
import { ExpansionPanel } from '../../ExpansionPanel';
import Aircraft from '../../../entities/Aircraft';
import { styles } from './AircraftList.styles';

const AircraftList = ( {
	testID, aircrafts, selectedAircraftID, onAircraftSelected, onAircraftOptionsPressed, showAvatar
} ) => {
	const expansionPanelBar = (
		<Text style={styles.expansionPanelBar}>{aircrafts[ 0 ].makeAndModel}</Text>
	);
	const renderAircraft = ( aircraft, isSelected, onItemSelected ) => (
		<AircraftListItem
			isSelected={isSelected}
			onAircraftSelected={onItemSelected}
			testID={`${aircraft.makeAndModel} ${aircraft.tailNumber} item`}
			aircraft={aircraft}
			optionsOnPress={() => onAircraftOptionsPressed( aircraft.id )}
			showAvatar={showAvatar}
		/>
	);

	return (
		<ExpansionPanel
			testID={testID}
			bar={expansionPanelBar}
			data={aircrafts}
			renderItem={renderAircraft}
			keyExtractor={( aircraft ) => aircraft.id}
			selectedItemKey={selectedAircraftID}
			onItemSelected={onAircraftSelected}
		/>
	);
};

AircraftList.propTypes = {
	testID: PropTypes.string,
	aircrafts: PropTypes.arrayOf( PropTypes.instanceOf( Aircraft ) ).isRequired,
	selectedAircraftID: PropTypes.number,
	onAircraftSelected: PropTypes.func,
	onAircraftOptionsPressed: PropTypes.func,
	showAvatar: PropTypes.bool
};

AircraftList.defaultProps = {
	testID: 'aircraftList-component',
	selectedAircraftID: null,
	onAircraftSelected: () => {},
	onAircraftOptionsPressed: () => {},
	showAvatar: false
};

export default observer( AircraftList );
