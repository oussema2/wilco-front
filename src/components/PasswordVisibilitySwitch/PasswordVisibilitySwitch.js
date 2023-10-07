import React from 'react';
import { Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';
import { eye, eyeSlash } from '../../assets/icons';
import { styles } from './PasswordVisibilitySwitch.styles';

const PasswordVisibilitySwitch = ( { testID, passwordVisible, onChange } ) => {
	const visibilityIconSource = passwordVisible ? eye : eyeSlash;
	return (
		<Pressable onPress={onChange}>
			<Image testID={testID} source={visibilityIconSource} style={styles.visibilityIcon} />
		</Pressable>
	);
};

PasswordVisibilitySwitch.propTypes = {
	testID: PropTypes.string,
	passwordVisible: PropTypes.bool.isRequired,
	onChange: PropTypes.func
};

PasswordVisibilitySwitch.defaultProps = {
	testID: 'passwordVisibilitySwitch-component',
	onChange: () => {}
};

export default PasswordVisibilitySwitch;
