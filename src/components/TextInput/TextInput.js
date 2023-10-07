import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { InputWrapper } from '../InputWrapper';

const TextInput = ( {
	testID, textInputStyle, required, isPassword, autoCapitalize, error, inputProps, helperText
} ) => (
	<InputWrapper
		testID={testID}
		containerStyle={textInputStyle}
		required={required}
		isPassword={isPassword}
		autoCapitalize={autoCapitalize}
		error={error}
		helperText={helperText}
		Input={Input}
		{...inputProps}
	/>
);

TextInput.propTypes = {
	textInputStyle: PropTypes.instanceOf( Object ),
	testID: PropTypes.string,
	error: PropTypes.oneOfType( [ PropTypes.string, PropTypes.bool ] ),
	isPassword: PropTypes.bool,
	autoCapitalize: PropTypes.oneOf( [ 'characters', 'words', 'sentences', 'none' ] ),
	required: PropTypes.bool,
	inputProps: PropTypes.instanceOf( Object ),
	helperText: PropTypes.string
};

TextInput.defaultProps = {
	textInputStyle: {},
	testID: 'textInput',
	error: '',
	isPassword: false,
	autoCapitalize: 'none',
	required: false,
	inputProps: { label: '' },
	helperText: null
};

export default TextInput;
