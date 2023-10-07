import React from 'react';
import {
	View, Text, Pressable, Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import { defaultStyle, errorStyle } from './TouchableInput.styles';
import { chevronRight } from '../../assets/icons';
import { Image } from '../Image';

const TouchableInput = ( {
	testID, label, value, placeholder, required, error, containerStyle, onPress
} ) => {
	let styles = defaultStyle;
	if ( error ) { styles = { ...styles, ...errorStyle }; }

	const _onPress = () => {
		Keyboard.dismiss();
		onPress();
	};

	return (
		<View testID={testID} style={{ ...styles.touchableInputContainer, ...containerStyle }}>
			<View style={styles.labelContainer}>
				<Text testID="touchable-input-label" style={styles.label}>{label}</Text>
				{required && <Text testID="touchable-input-required" style={styles.required}>*</Text>}
			</View>
			<Pressable onPress={_onPress}>
				<View style={styles.textContainer}>
					<Text numberOfLines={1} testID="touchable-input-text" style={value ? styles.text : styles.placeholder}>{value || placeholder}</Text>
					<Image testID="touchable-input-icon" source={chevronRight} style={styles.iconStyle} />
				</View>
			</Pressable>
			<View style={styles.errorContainer}>
				<Text testID="touchable-input-error" style={styles.error}>{error}</Text>
			</View>
		</View>
	);
};

TouchableInput.propTypes = {
	testID: PropTypes.string,
	label: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	containerStyle: PropTypes.instanceOf( Object ),
	onPress: PropTypes.func
};

TouchableInput.defaultProps = {
	testID: 'touchableInput-component',
	label: '',
	placeholder: '',
	required: false,
	error: '',
	containerStyle: {},
	onPress: () => {}
};

export default TouchableInput;
