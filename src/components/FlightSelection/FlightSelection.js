import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { HorizontalPadding } from '../HorizontalPadding';
import { styles } from './FlightSelection.styles';
import { Title } from '../Title';
import SelectedFlightInfo from '../../screens/CreatePost/components/SelectedFlightInfo';
import PlaceholderButton from '../PlaceholderButton/PlaceholderButton';
import { planeDeparture } from '../../assets/icons';
import noop from '../../helpers/noop';
import FlightToDisplay from '../../entitiesToDisplay/FlightsToDisplay';
import Aircraft from '../../entities/Aircraft';

const FlightSelection = ( {
	selectedFlight, selectedAircraft, onClearFlightPressed, onAddFlightButtonPressed
} ) => (
	<View style={styles.flightSelectionContainer}>
		<HorizontalPadding>
			<Title
				text="Flight info"
				style={styles.flightTitle}
				rightText={selectedFlight && 'Clear'}
				rightAction={onClearFlightPressed}
			/>
		</HorizontalPadding>

		{ selectedFlight && (
			<SelectedFlightInfo selectedFlight={selectedFlight} selectedAircraft={selectedAircraft} />
		)}

		{ !selectedFlight && (
			<PlaceholderButton
				testID="aircraft-placeholder-testID"
				imageSource={planeDeparture}
				onPress={onAddFlightButtonPressed}
				title="Share a flight"
			/>
		)}
	</View>
);

FlightSelection.propTypes = {
	selectedFlight: PropTypes.instanceOf( FlightToDisplay ),
	selectedAircraft: PropTypes.instanceOf( Aircraft ),
	onClearFlightPressed: PropTypes.func,
	onAddFlightButtonPressed: PropTypes.func
};

FlightSelection.defaultProps = {
	selectedFlight: null,
	selectedAircraft: null,
	onClearFlightPressed: noop,
	onAddFlightButtonPressed: noop
};

export default observer( FlightSelection );
