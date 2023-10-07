import React from 'react';
import PropTypes from 'prop-types';
import { Switch as SwitchElement } from 'react-native-elements';
import { palette } from '../../Theme';

const Switch = ( { testID, value, onValueChange } ) => (
	<SwitchElement
		testID={testID}
		value={value}
		onValueChange={onValueChange}
		color={palette.primary.default}
		ios_backgroundColor={palette.grayscale.shutterGrey}
	/>
);

Switch.propTypes = {
	testID: PropTypes.string,
	value: PropTypes.bool.isRequired,
	onValueChange: PropTypes.func.isRequired
};

Switch.defaultProps = {
	testID: 'switch'
};

export default Switch;
