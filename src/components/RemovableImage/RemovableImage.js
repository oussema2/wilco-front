import React from 'react';
import PropTypes from 'prop-types';
import {
	ImageBackground, ViewPropTypes
} from 'react-native';
import RemoveImageButton from './components/RemoveImageButton';
import { imageStyles } from './RemovableImage.styles';

const RemovableImage = ( {
	source, testID, size, tintColor, style, resizeMode, removeOnPress
} ) => (
	<ImageBackground
		testID={testID}
		style={{ ...imageStyles( { size, tintColor } ).image, ...style }}
		resizeMode={resizeMode}
		source={source}
	>
		<RemoveImageButton onPress={removeOnPress} />
	</ImageBackground>
);

RemovableImage.propTypes = {
	source: PropTypes.oneOfType( [
		PropTypes.instanceOf( Object ),
		PropTypes.number
	] ).isRequired,
	testID: PropTypes.string,
	size: PropTypes.number,
	tintColor: PropTypes.string,
	style: ViewPropTypes.style,
	resizeMode: PropTypes.string,
	removeOnPress: PropTypes.func.isRequired
};

RemovableImage.defaultProps = {
	testID: 'image',
	size: 32,
	tintColor: null,
	style: {},
	resizeMode: 'cover'
};

export default RemovableImage;
