import React from 'react';
import {
	View, TextInput as InputElement, Text
} from 'react-native';
import PropTypes from 'prop-types';
import {
	viewStyles
} from './MultilineInput.styles';
import { useFocus } from '../../hooks/useFocus';
import { palette } from '../../Theme';
import { useInputsStyle } from '../../hooks/useInputsStyle';
import { exclamationTriangle } from '../../assets/icons';
import { Image } from '../Image';

const MultilineInput = ( {
	testID, value, error, disabled, onFocus, onBlur, onChange, minimumLines, capitalizeFirstLetter,
	placeholder, maxLength, bold, inputRef
} ) => {
	const [ focused, onInputFocused, onInputBlurred ] = useFocus( onFocus, onBlur );
	const [ styles, minHeight ] = useInputsStyle(
		focused, error, disabled, minimumLines, value, bold
	);

	const maxLengthExceeded = value?.length > maxLength;

	const backgroundColor = ( error || maxLengthExceeded )
		? palette.error.background : styles.input.backgroundColor;

	return (
		<View style={viewStyles.container}>
			<InputElement
				testID={testID}
				style={{
					...styles.input,
					minHeight,
					backgroundColor
				}}
				ref={inputRef}
				placeholderTextColor={palette.grayscale.aluminum}
				selectionColor={palette.primary.default}
				value={value}
				editable={!disabled}
				onFocus={onInputFocused}
				onBlur={onInputBlurred}
				onChangeText={onChange}
				placeholder={placeholder}
				autoCapitalize={( capitalizeFirstLetter ) ? 'sentences' : 'none'}
				multiline
				scrollEnabled={false} // necessary for KeyboardAvoidingView to work
			/>

			{!!maxLength && ( !error || maxLengthExceeded ) && (
				<View style={styles.footnoteContainer}>
					{maxLengthExceeded && (
						<Image testID="alert-icon" source={exclamationTriangle} style={styles.footnoteIcon} resizeMode="contain" />
					)}
					<Text style={maxLengthExceeded ? styles.footnoteError : styles.footnote} align="right">{`${value?.length || 0}`}</Text>
					<Text style={styles.footnote}>{`/${maxLength}`}</Text>
				</View>
			)}

			{!!error && !maxLengthExceeded && (
				<Text testID="helperText-testID" style={styles.errorMessage}>
					{error}
				</Text>
			)}
		</View>
	);
};

MultilineInput.propTypes = {
	testID: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	disabled: PropTypes.bool,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	minimumLines: PropTypes.number,
	capitalizeFirstLetter: PropTypes.bool,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	inputRef: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.shape( { current: PropTypes.any } )
	] ),
	bold: PropTypes.bool
};

MultilineInput.defaultProps = {
	testID: 'MultilineInput-Component',
	value: '',
	error: '',
	disabled: false,
	onFocus: () => {},
	onBlur: () => {},
	onChange: () => {},
	minimumLines: 1,
	capitalizeFirstLetter: false,
	placeholder: '',
	maxLength: undefined,
	inputRef: undefined,
	bold: true
};

export default MultilineInput;
