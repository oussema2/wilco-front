import React from 'react';
import PropTypes from 'prop-types';
import { InputWrapper } from '../InputWrapper';
import { MultilineInput } from '../MultilineInput';
import MentionInput from '../MentionInput/MentionInput';

const TextArea = ( {
	testID, textInputStyle, required, error, minimumLines, inputProps, capitalizeFirstLetter,
	supportMention, maxLength, popover, onFocus, bold
} ) => (
	<InputWrapper
		testID={testID}
		containerStyle={textInputStyle}
		required={required}
		error={error}
		Input={supportMention ? MentionInput : MultilineInput}
		minimumLines={minimumLines}
		capitalizeFirstLetter={capitalizeFirstLetter}
		maxLength={maxLength}
		popover={popover}
		bold={bold}
		{...inputProps}
		onFocus={onFocus || inputProps.onFocus}
	/>
);

TextArea.propTypes = {
	textInputStyle: PropTypes.instanceOf( Object ),
	testID: PropTypes.string,
	error: PropTypes.string,
	required: PropTypes.bool,
	minimumLines: PropTypes.number,
	inputProps: PropTypes.instanceOf( Object ),
	capitalizeFirstLetter: PropTypes.bool,
	supportMention: PropTypes.bool,
	maxLength: PropTypes.number,
	popover: PropTypes.node,
	onFocus: PropTypes.any,
	bold: PropTypes.bool
};

TextArea.defaultProps = {
	textInputStyle: {},
	testID: 'textArea',
	error: '',
	required: false,
	minimumLines: 1,
	inputProps: { label: '' },
	capitalizeFirstLetter: false,
	supportMention: false,
	maxLength: undefined,
	popover: null,
	onFocus: null,
	bold: true
};

export default TextArea;
