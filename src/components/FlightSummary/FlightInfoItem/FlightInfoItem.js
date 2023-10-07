import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { styles } from './FlightInfoItem.styles';

const FlightInfoItem = ( {
	testID, image, text
} ) => (
	<View testID={testID} style={styles.itemContainer}>
		{image}
		<Text style={styles.text}>{text}</Text>
	</View>
);

FlightInfoItem.propTypes = {
	testID: PropTypes.string,
	image: PropTypes.any.isRequired,
	text: PropTypes.string.isRequired
};

FlightInfoItem.defaultProps = {
	testID: 'flightInfoItem-component'
};

export default FlightInfoItem;
