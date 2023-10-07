import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { styles } from '../CreatePost.styles';
import { Image } from '../../../components/Image';
import { flightInfoAircraft, map } from '../../../assets/icons';
import { FlightListItem } from '../../../components/FlightListItem';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import FlightToDisplay from '../../../entitiesToDisplay/FlightsToDisplay';
import Aircraft from '../../../entities/Aircraft';

const SelectedFlightInfo = ( { selectedFlight, selectedAircraft } ) => (
	<HorizontalPadding style={styles.selectedFlightContainer}>
		<View style={styles.selectedFlightInnerContainer}>
			<Image source={flightInfoAircraft} style={styles.flightInfoAircraft} />
			<Text testID="selected-aircraft-text" style={styles.selectedAircraft}>
				<Text style={styles.aircraftMakeAndModel}>
					{selectedAircraft.makeAndModel}
				</Text>
				{'  •  '}
				<Text style={styles.aircraftTailNumber}>
					{selectedAircraft.tailNumber || 'Post manually'}
				</Text>
			</Text>
		</View>
		<View style={styles.flightInfoDivisorLine} />
		<View style={styles.flightInfoContainer}>
			<Image source={map} style={styles.flightInfoMapImage} />
			<FlightListItem showCheckBox={false} testID="selected-flight-item" flight={selectedFlight} />
		</View>
	</HorizontalPadding>
);

SelectedFlightInfo.propTypes = {
	selectedFlight: PropTypes.instanceOf( FlightToDisplay ),
	selectedAircraft: PropTypes.instanceOf( Aircraft )
};

SelectedFlightInfo.defaultProps = {
	selectedFlight: null,
	selectedAircraft: null
};

export default SelectedFlightInfo;
