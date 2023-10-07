import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Image } from '../Image';
import { styles } from './EmptyState.styles';
import { palette } from '../../Theme';

const EmptyState = ( {
	testID, containerStyle, source, text, imageStyle, tintColor
} ) => (
	<View style={[ styles.containerView, containerStyle ]}>
		<Image
			testID="emptyStateImage-testID"
			style={{ ...styles.emptyStateImage, ...imageStyle }}
			source={source}
			tintColor={tintColor}
		/>
		<Text testID={testID} style={styles.emptyStateBanner}>{text}</Text>
	</View>
);

EmptyState.propTypes = {
	testID: PropTypes.string,
	source: PropTypes.any.isRequired,
	text: PropTypes.string.isRequired,
	containerStyle: PropTypes.instanceOf( Object ),
	imageStyle: PropTypes.instanceOf( Object ),
	tintColor: PropTypes.string
};

EmptyState.defaultProps = {
	testID: 'emptyStateText-testID',
	imageStyle: {},
	containerStyle: {},
	tintColor: palette.grayscale.wildSand
};

export default EmptyState;
