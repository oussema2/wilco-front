import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { BackgroundGradient } from '../BackgroundGradient';
import { palette } from '../../Theme';

const ActionSheetGradient = ( { testID, style, children } ) => (
	<BackgroundGradient
		testID={testID}
		style={style}
		colors={[ palette.primary.dark, palette.grayscale.white ]}
		start={{ x: 1, y: 0 }}
		end={{ x: 0.9, y: 1 }}
	>
		{children}
	</BackgroundGradient>
);

ActionSheetGradient.propTypes = {
	testID: PropTypes.string,
	style: ViewPropTypes.style,
	children: PropTypes.node
};

ActionSheetGradient.defaultProps = {
	testID: 'linearGradient',
	style: {},
	children: null
};

export default ActionSheetGradient;
