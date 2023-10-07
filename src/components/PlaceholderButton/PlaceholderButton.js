import React from 'react';
import {
	Image, Text, TouchableOpacity,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './PlaceholderButton.styles';

const PlaceholderButton = ( {
	testID, title, imageSource, onPress
} ) => (
	<TouchableOpacity onPress={onPress} style={styles.container}>
		<View style={styles.innerContainer}>
			<Image testID="placeholder-button-image" style={styles.image} source={imageSource} />
			<Text testID={testID} style={styles.text}>{title}</Text>
		</View>
	</TouchableOpacity>
);

PlaceholderButton.propTypes = {
	testID: PropTypes.string,
	imageSource: PropTypes.node,
	title: PropTypes.string,
	onPress: PropTypes.func
};

PlaceholderButton.defaultProps = {
	testID: 'placeholder-button-component',
	imageSource: null,
	onPress: () => {},
	title: ''
};

export default PlaceholderButton;
