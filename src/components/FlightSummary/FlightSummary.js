import React from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import PostFlightPresenter from '../../presenters/PostFlightPresenter';
import { OriginAndDestination } from './OriginAndDestination';
import { FlightInfoItem } from './FlightInfoItem';
import { FlightInfoImage } from './FlightInfoImage';
import {
	route, rulerVertical, speed, stopwatch
} from '../../assets/icons';
import { styles } from './FlightSummary.styles';
import { Avatar } from '../Avatar';

const FlightSummary = ( { testID, postFlightPresenter } ) => {
	const {
		from, to, departureTime, arrivalTime, pictureThumbnailSource, makeAndModel, duration, maxSpeed,
		maxAltitude, distance
	} = postFlightPresenter;
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View testID={testID} style={styles.summaryContainer}>
				<OriginAndDestination
					testID="origin-and-destination"
					from={from}
					to={to}
					departureTime={departureTime}
					arrivalTime={arrivalTime}
				/>
				<FlightInfoItem
					testID="aircraft-info"
					image={(
						<Avatar
							variant="aircraft"
							size="small"
							source={pictureThumbnailSource}
						/>
					)}
					text={makeAndModel}
				/>
				<FlightInfoItem
					testID="duration-info"
					image={<FlightInfoImage source={stopwatch} />}
					text={duration}
				/>
				{maxSpeed && (
					<FlightInfoItem
						testID="max-speed-info"
						image={<FlightInfoImage source={speed} />}
						text={maxSpeed}
					/>
				)}
				{maxAltitude && (
					<FlightInfoItem
						testID="max-altitude-info"
						image={<FlightInfoImage source={rulerVertical} />}
						text={maxAltitude}
					/>
				)}
				{distance && (
					<FlightInfoItem
						testID="distance-info"
						image={<FlightInfoImage source={route} />}
						text={distance}
					/>
				)}
			</View>
		</ScrollView>
	);
};

FlightSummary.propTypes = {
	testID: PropTypes.string,
	postFlightPresenter: PropTypes.instanceOf( PostFlightPresenter ).isRequired
};

FlightSummary.defaultProps = {
	testID: 'flightSummary-component'
};

export default observer( FlightSummary );
