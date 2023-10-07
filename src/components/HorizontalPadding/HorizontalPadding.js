import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { dimensions } from '../../Theme';

const HorizontalPadding = ( {
	testID, padding, children, style
} ) => (
	<View testID={testID} style={[ { paddingHorizontal: padding }, style ]}>
		{children}
	</View>
);

HorizontalPadding.propTypes = {
	testID: PropTypes.string,
	padding: PropTypes.number,
	children: PropTypes.node.isRequired,
	style: ViewPropTypes.style
};

HorizontalPadding.defaultProps = {
	testID: 'horizontalPadding-component',
	padding: dimensions.horizontalPadding,
	style: null
};

export default HorizontalPadding;
