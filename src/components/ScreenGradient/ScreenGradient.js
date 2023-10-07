import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { BackgroundGradient } from '../BackgroundGradient';
import { palette } from '../../Theme';

const ScreenGradient = ( { testID, style, children } ) => (
	<BackgroundGradient
		testID={testID}
		style={style}
		colors={[ palette.primary.dark, palette.grayscale.white ]}
		start={{ x: 0, y: 0 }}
		end={{ x: 0.25, y: 0.3 }}
		locations={[ 0.5, 1 ]}
	>
		{children}
	</BackgroundGradient>
);

ScreenGradient.propTypes = {
	testID: PropTypes.string,
	style: ViewPropTypes.style,
	children: PropTypes.node
};

ScreenGradient.defaultProps = {
	testID: 'linearGradient',
	style: {},
	children: null
};

export default ScreenGradient;
