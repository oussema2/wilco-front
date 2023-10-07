import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './DivisorLine.styles';

const DivisorLine = ( {
	testID, style
} ) => (
	<View testID={testID} style={[ styles.lineStyle, style ]} />
);

DivisorLine.propTypes = {
	testID: PropTypes.string,
	style: ViewPropTypes.style
};

DivisorLine.defaultProps = {
	testID: 'divisorLine-component',
	style: null
};

export default DivisorLine;
