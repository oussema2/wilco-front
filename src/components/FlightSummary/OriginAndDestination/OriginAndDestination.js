import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { arrowRight } from '../../../assets/icons';
import { styles } from './OriginAndDestination.styles';

const OriginAndDestination = ( {
	testID, from, to, departureTime, arrivalTime
} ) => (
	<View testID={testID} style={styles.container}>
		<View style={styles.itemContainer}>
			<Text style={styles.fromAndTo}>{from}</Text>
			<Text style={styles.times}>{departureTime}</Text>
		</View>
		<Image style={styles.arrow} source={arrowRight} />
		<View style={styles.itemContainer}>
			<Text style={styles.fromAndTo}>{to}</Text>
			<Text style={styles.times}>{arrivalTime}</Text>
		</View>
	</View>
);

OriginAndDestination.propTypes = {
	testID: PropTypes.string,
	from: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	departureTime: PropTypes.string.isRequired,
	arrivalTime: PropTypes.string.isRequired
};

OriginAndDestination.defaultProps = {
	testID: 'originAndDestination-Component'
};

export default OriginAndDestination;
