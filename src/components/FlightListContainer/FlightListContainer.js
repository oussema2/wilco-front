import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { OwlCarousel } from '../OwlCarousel';
import { Title } from '../Title';
import { FlightList } from './FlightList';
import { EmptyState } from '../EmptyState';
import { HorizontalPadding } from '../HorizontalPadding';
import { cloud } from '../../assets/icons/index';
import { styles } from './FlightListContainer.styles';

// eslint-disable-next-line react/prop-types
const EmptyFlightList = () => {
	const _emptyText = 'We couldn’t find any flights for this tail number. Try another or upload manually!';
	return (
		<HorizontalPadding style={styles.emptyState}>
			<EmptyState source={cloud} text={_emptyText} />
		</HorizontalPadding>
	);
};

const FlightListContainer = ( {
	testID, listOfFlights, selectedFlightID, onFlightSelected
} ) => {
	// eslint-disable-next-line react/prop-types
	const _renderItem = ( { item: flights, index } ) => (
		<FlightList
			testID={`flightsPage-${index}-FlightList`}
			flights={flights}
			selectedFlightID={selectedFlightID}
			onFlightSelected={onFlightSelected}
		/>
	);

	return (
		<View testID={testID} style={styles.containerView}>
			<HorizontalPadding>
				<Title
					testID="flightList-Title"
					text="Flight data - Select flight"
					textTransform="none"
					required
				/>
			</HorizontalPadding>
			<View style={styles.title} />
			{
				( listOfFlights.length === 0 )
					? <EmptyFlightList />
					: <OwlCarousel items={listOfFlights} renderItem={_renderItem} />
			}
		</View>
	);
};

FlightListContainer.propTypes = {
	testID: PropTypes.string,
	listOfFlights: PropTypes.arrayOf( PropTypes.array ),
	selectedFlightID: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number
	] ),
	onFlightSelected: PropTypes.func
};

FlightListContainer.defaultProps = {
	testID: 'flightListContainer-Component',
	selectedFlightID: null,
	onFlightSelected: () => {},
	listOfFlights: [ [] ]
};

export default FlightListContainer;
