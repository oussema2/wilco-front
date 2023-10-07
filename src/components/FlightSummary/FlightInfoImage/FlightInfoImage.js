import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './FlightInfoImage.styles';

const FlightInfoImage = ( { testID, source } ) => (
	<Image testID={testID} style={styles.image} source={source} />
);

FlightInfoImage.propTypes = {
	testID: PropTypes.string,
	source: PropTypes.any.isRequired
};

FlightInfoImage.defaultProps = {
	testID: 'flightInfoImage-component'
};

export default FlightInfoImage;
