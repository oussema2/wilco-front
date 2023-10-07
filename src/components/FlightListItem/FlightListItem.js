import React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import FlightToDisplay from '../../entitiesToDisplay/FlightsToDisplay';
import { Image } from '../Image';
import { arrowRight } from '../../assets/icons';
import { styles } from './FlightListItem.styles';
import { palette } from '../../Theme';

const FlightListItem = ( {
	testID, flight, isSelected, onFlightSelected, showCheckBox
} ) => (
	<View testID={testID} style={styles.containerView}>
		<View style={styles.innerContainerView}>
			{showCheckBox && (
				<CheckBox
					containerStyle={styles.checkBox}
					size={24}
					checkedColor={palette.primary.darkCyan}
					checkedIcon="dot-circle-o"
					uncheckedIcon="circle-o"
					checked={isSelected}
					onPress={onFlightSelected}
				/>
			)}
			<View style={styles.originAndDestination}>
				<Text testID="departureAirport-Text" style={styles.airportName} numberOfLines={1}>{flight.from}</Text>
				<View style={styles.arrowIcon}>
					<Image testID="rightArrow-Image" source={arrowRight} size={15} tintColor={palette.grayscale.aluminum} />
				</View>
				<Text testID="arrivalAirport-Text" style={styles.airportName} numberOfLines={1}>{flight.to}</Text>
			</View>
			<View style={styles.timeView}>
				<Text style={styles.time} numberOfLines={1}>{flight.departureTime}</Text>
				<Text testID="hourSeparator-Text" style={styles.timeSeparatorView}>•</Text>
				<Text style={styles.time} numberOfLines={1}>{flight.arrivalTime}</Text>
			</View>
			<Text style={styles.date}>{flight.shortDate}</Text>
		</View>
	</View>
);

FlightListItem.propTypes = {
	testID: PropTypes.string,
	flight: PropTypes.instanceOf( FlightToDisplay ).isRequired,
	isSelected: PropTypes.bool,
	onFlightSelected: PropTypes.func,
	showCheckBox: PropTypes.bool
};

FlightListItem.defaultProps = {
	testID: 'flightListItem-Component',
	isSelected: false,
	onFlightSelected: () => {},
	showCheckBox: true
};

export default observer( FlightListItem );
