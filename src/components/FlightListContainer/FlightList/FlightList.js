import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import FlightToDisplay from '../../../entitiesToDisplay/FlightsToDisplay';
import { FlightListItem } from '../../FlightListItem';
import { SelectableListItem } from '../../SelectableListItem';

const FlightList = ( {
	flights, selectedFlightID, onFlightSelected
} ) => {
	const renderFlight = ( flight, isSelected, onItemSelected ) => (
		<FlightListItem
			isSelected={isSelected}
			onFlightSelected={onItemSelected}
			testID={`flight-${flight.id}-FlightListItem`}
			flight={flight}
		/>
	);

	return (
		<>
			{flights.map( ( flight ) => (
				<SelectableListItem
					key={flight.id}
					itemKey={flight.id}
					item={flight}
					isSelected={selectedFlightID === flight.id}
					onItemSelected={onFlightSelected}
					renderItem={renderFlight}
				/>
			) )}
		</>
	);
};

FlightList.propTypes = {
	flights: PropTypes.arrayOf( PropTypes.instanceOf( FlightToDisplay ) ),
	selectedFlightID: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number
	] ),
	onFlightSelected: PropTypes.func
};

FlightList.defaultProps = {
	flights: [],
	selectedFlightID: null,
	onFlightSelected: () => {}
};

export default observer( FlightList );
