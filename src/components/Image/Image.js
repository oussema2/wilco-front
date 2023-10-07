import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './Image.styles';

const Image = ( {
	source, testID, size, tintColor, style, resizeMode, onLoadEnd
} ) => (
	<FastImage
		key={( tintColor ) ? 1 : 0}
		testID={testID}
		style={{ ...styles( { size } ).image, ...style }}
		source={source}
		tintColor={tintColor}
		resizeMode={resizeMode}
		onLoadEnd={onLoadEnd}
	/>
);

Image.propTypes = {
	source: PropTypes.oneOfType( [
		PropTypes.instanceOf( Object ),
		PropTypes.number
	] ).isRequired,
	testID: PropTypes.string,
	size: PropTypes.number,
	tintColor: PropTypes.string,
	style: ViewPropTypes.style,
	resizeMode: PropTypes.string,
	onLoadEnd: PropTypes.func
};

Image.defaultProps = {
	testID: 'image',
	size: 32,
	tintColor: undefined,
	style: {},
	resizeMode: 'cover',
	onLoadEnd: undefined
};

export default Image;
