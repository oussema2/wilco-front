import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './SuplementalTitle.styles';

const SuplementalTitle = ( { testID, text, style } ) => (
	<Text testID={testID} style={[ styles.text, style ]}>
		{text}
	</Text>
);

SuplementalTitle.propTypes = {
	testID: PropTypes.string,
	text: PropTypes.string.isRequired,
	style: Text.propTypes.style
};

SuplementalTitle.defaultProps = {
	testID: 'suplementalTitle-Component',
	style: {}
};

export default SuplementalTitle;
