import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './FlightFormSwitch.styles';
import { Title } from '../../../components/Title';
import { Switch } from '../../../components/Switch';
import { HorizontalPadding } from '../../../components/HorizontalPadding';

const FlightFormSwitch = ( {
	testID, shouldShowAddFlightManually, toggleShowAddFlightManually
} ) => (
	<HorizontalPadding>
		<View testID={testID} style={styles.flightFormSwitch}>
			<Title
				text="Add flight manually"
				textTransform="none"
			/>
			<Switch
				value={shouldShowAddFlightManually}
				onValueChange={toggleShowAddFlightManually}
			/>
		</View>
	</HorizontalPadding>
);

FlightFormSwitch.propTypes = {
	testID: PropTypes.string,
	shouldShowAddFlightManually: PropTypes.bool.isRequired,
	toggleShowAddFlightManually: PropTypes.func.isRequired
};

FlightFormSwitch.defaultProps = {
	testID: 'FlightFormSwitch'
};

export default FlightFormSwitch;
