import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Input as InputElement } from 'react-native-elements';
import { useFocus } from '../../hooks/useFocus';
import { PasswordVisibilitySwitch } from '../PasswordVisibilitySwitch';
import {
	defaultStyle,
	focusedStyle,
	errorStyle,
	disabledStyle,
	viewStyles,
	errorMessageHiddenStyle
} from './Input.styles';
import { fonts, palette } from '../../Theme';
import ClearText from './components/ClearText';
import { ActivityIndicator } from '../ActivityIndicator';

const Input = ( {
	testID,
	value,
	error,
	disabled,
	isPassword,
	onFocus,
	onBlur,
	onChange,
	hideError,
	placeholder,
	autoCapitalize,
	onSubmitEditing,
	returnKeyType,
	scrollEnabled,
	clearText,
	isLoading,
	helperText,
	autoCorrect
} ) => {
	const [ focused, onInputFocused, onInputBlurred ] = useFocus( onFocus, onBlur );
	const [ showPassword, setShowPassword ] = useState( false );

	let styles = defaultStyle;
	if ( focused ) { styles = { ...styles, ...focusedStyle }; }
	if ( error ) { styles = { ...styles, ...errorStyle }; }
	if ( disabled ) { styles = { ...styles, ...disabledStyle }; }

	let errorMessageStyles = styles.errorMessage;
	const helperTextStyle = error ? styles.helperText : styles.helperTextWithoutError;
	if ( hideError ) { errorMessageStyles = errorMessageHiddenStyle.errorMessage; }

	const _renderPasswordVisibilitySwitch = () => (
		<PasswordVisibilitySwitch
			testID="password-switch"
			passwordVisible={showPassword}
			onChange={() => setShowPassword( !showPassword )}
		/>
	);

	const _renderClearText = () => (
		<ClearText
			testID="clear-text-switch"
			value={value}
			onPress={clearText}
		/>
	);

	const _renderIsLoading = () => (
		<ActivityIndicator
			testID="activity-indicator"
			size="small"
		/>
	);

	const _setFontFamily = ( ref ) => ref && ref.props && ref.setNativeProps( {
		text: ref.props.value,
		style: ( ref.props.value ) ? fonts.bodyFocus : fonts.body // works only on iOS
	} );

	// eslint-disable-next-line consistent-return
	const _renderRightIcon = () => {
		if ( isPassword ) return _renderPasswordVisibilitySwitch();
		if ( isLoading ) return _renderIsLoading();
		if ( clearText ) return _renderClearText();
	};

	return (
		<View style={viewStyles.container}>
			<InputElement
				ref={_setFontFamily}
				testID={testID}
				containerStyle={styles.container}
				inputContainerStyle={styles.inputContainer}
				inputStyle={styles.input}
				selectionColor={palette.primary.default}
				placeholderTextColor={palette.grayscale.aluminum}
				value={value}
				disabled={disabled}
				onFocus={onInputFocused}
				onBlur={onInputBlurred}
				onChangeText={onChange}
				autoCapitalize={autoCapitalize}
				autoCorrect={autoCorrect}
				secureTextEntry={isPassword && !showPassword}
				textAlignVertical="center"
				errorMessage={error}
				errorStyle={errorMessageStyles}
				placeholder={placeholder}
				rightIcon={_renderRightIcon}
				onSubmitEditing={onSubmitEditing}
				returnKeyType={returnKeyType}
				scrollEnabled={scrollEnabled}
			/>
			{helperText && !error && (
				<Text testID="helperText-testID" style={helperTextStyle}>
					{helperText}
				</Text>
			)}
		</View>
	);
};

Input.propTypes = {
	testID: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.oneOfType( [ PropTypes.string, PropTypes.bool ] ),
	disabled: PropTypes.bool,
	isPassword: PropTypes.bool,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	hideError: PropTypes.bool,
	placeholder: PropTypes.string,
	autoCapitalize: PropTypes.oneOf( [ 'characters', 'words', 'sentences', 'none' ] ),
	onSubmitEditing: PropTypes.func,
	returnKeyType: PropTypes.oneOf( [ 'done', 'go', 'next', 'search', 'send', 'default' ] ),
	scrollEnabled: PropTypes.bool,
	clearText: PropTypes.func,
	isLoading: PropTypes.bool,
	helperText: PropTypes.string,
	autoCorrect: PropTypes.bool
};

Input.defaultProps = {
	testID: 'Input-Component',
	value: '',
	error: '',
	disabled: false,
	isPassword: false,
	onFocus: () => {},
	onBlur: () => {},
	onChange: () => {},
	hideError: false,
	placeholder: '',
	autoCapitalize: 'none',
	onSubmitEditing: () => {},
	returnKeyType: 'default',
	scrollEnabled: true,
	clearText: null,
	isLoading: null,
	helperText: null,
	autoCorrect: true
};

export default Input;
