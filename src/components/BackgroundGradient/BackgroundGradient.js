import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './BackgroundGradient.styles';

const BackgroundGradient = ( {
	testID, style, start, end, locations, colors, children
} ) => (
	<LinearGradient
		testID={testID}
		colors={colors}
		start={start}
		end={end}
		locations={locations}
		style={{
			...styles.linearGradient,
			...style
		}}
	>
		{children}
	</LinearGradient>
);

BackgroundGradient.propTypes = {
	testID: PropTypes.string,
	style: ViewPropTypes.style,
	colors: PropTypes.arrayOf( PropTypes.string ).isRequired,
	start: PropTypes.shape( {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	} ),
	end: PropTypes.shape( {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	} ),
	locations: PropTypes.arrayOf( PropTypes.number ),
	children: PropTypes.node
};

BackgroundGradient.defaultProps = {
	testID: 'linearGradient',
	style: {},
	start: undefined,
	end: undefined,
	locations: undefined,
	children: null
};

export default BackgroundGradient;
