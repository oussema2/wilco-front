import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { BackgroundGradient } from '../BackgroundGradient';
import { palette } from '../../Theme';

const ModalGradient = ( { testID, style, children } ) => (
	<BackgroundGradient
		testID={testID}
		style={style}
		colors={[ palette.primary.dark, palette.grayscale.white ]}
		start={{ x: 1, y: 0 }}
		end={{ x: 0.9, y: 0.8 }}
	>
		{children}
	</BackgroundGradient>
);

ModalGradient.propTypes = {
	testID: PropTypes.string,
	style: ViewPropTypes.style,
	children: PropTypes.node
};

ModalGradient.defaultProps = {
	testID: 'linearGradient',
	style: {},
	children: null
};

export default ModalGradient;
