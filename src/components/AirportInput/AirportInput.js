import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Input } from '../Input';

const AirportInput = ( {
	testID, containerStyle, onSubmit, placeholder, disabled, error, hasError, onChange
} ) => {
	const [ textValue, setTextValue ] = useState( '' );
	const _clearTextValue = () => {
		setTextValue( '' );
	};

	const _onSubmitEditing = ( ) => {
		const valid = onSubmit( textValue );
		if ( valid ) _clearTextValue();
	};

	return (
		<View testID={testID} style={containerStyle}>
			<Input
				autoCorrect={false}
				onChange={( value ) => onChange( value, setTextValue )}
				placeholder={placeholder}
				value={textValue}
				onSubmitEditing={_onSubmitEditing}
				returnKeyType="done"
				scrollEnabled={false}
				disabled={disabled}
				clearText={_clearTextValue}
				error={hasError && textValue && error}
			/>
		</View>
	);
};

AirportInput.propTypes = {
	containerStyle: PropTypes.instanceOf( Object ),
	testID: PropTypes.string,
	onSubmit: PropTypes.func,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	error: PropTypes.string,
	onChange: PropTypes.func
};

AirportInput.defaultProps = {
	containerStyle: {},
	testID: 'airport-input',
	onSubmit: () => {},
	placeholder: '',
	disabled: false,
	hasError: false,
	error: '',
	onChange: () => {}
};

export default AirportInput;
