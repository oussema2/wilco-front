import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './Subtitle.styles';

const Subtitle = ( {
	testID, text, textTransform, style
} ) => (
	<Text testID={testID} style={{ ...styles( { textTransform } ).text, ...style }}>
		{text}
	</Text>
);

Subtitle.propTypes = {
	testID: PropTypes.string,
	text: PropTypes.string.isRequired,
	textTransform: PropTypes.oneOf( [ 'capitalize', 'none' ] ),
	style: Text.propTypes.style
};

Subtitle.defaultProps = {
	testID: 'subtitle-component',
	textTransform: 'none',
	style: {}
};

export default Subtitle;
