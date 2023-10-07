import React, { useEffect, useRef, useState } from 'react';
import {
	Keyboard, View
} from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { styles } from './CommunityInput.styles';
import { Input } from '../Input';
import SuggestionsList from './components/SuggestionsList';
import {
	hasOnlyOneWord,
	hasWordsThatStartWithValue,
	simplifyNameToSearch
} from '../../helpers/strings';

const CommunityInput = ( {
	testID, containerStyle, label, onSubmit, placeholder, options, scrollTo, disabled,
	helperText, isLoading, hasError
} ) => {
	const [ suggestionsVisible, setSuggestionsVisible ] = useState( false );
	const [ suggestions, setSuggestions ] = useState( options );
	const [ textValue, setTextValue ] = useState( '' );
	const communityContainerRef = useRef( null );

	const _onBlur = ( ) => {
		setSuggestionsVisible( false );
	};

	const _onFocus = ( ) => {
		scrollTo();
		setSuggestionsVisible( true );
	};

	const _clearTextValue = () => {
		setTextValue( '' );
	};

	const _onSubmitEditing = ( ) => {
		onSubmit( textValue );
		_clearTextValue();
		setSuggestionsVisible( false );
	};

	const onPressSuggestion = ( item ) => {
		onSubmit( item );
		_clearTextValue();
		Keyboard.dismiss();
	};

	useEffect( () => {
		const searchSuggestions = () => {
			const simplifiedTextValue = simplifyNameToSearch( textValue );

			setSuggestions(
				options.filter( ( option ) => {
					const simplifiedOptionName = simplifyNameToSearch( option.name );

					if ( hasOnlyOneWord( textValue ) ) {
						return hasWordsThatStartWithValue( simplifiedOptionName, simplifiedTextValue );
					}

					return simplifiedOptionName.includes( simplifiedTextValue );
				} ) );
		};
		searchSuggestions();
		if ( textValue?.length === 0 ) setSuggestions( options );
	}, [ textValue, options ] );

	const helperTextStyle = [ styles.helperText, ( hasError ) && styles.helperTextError ];

	return (
		<View
			testID={testID}
			style={{ ...styles.viewContainer, ...containerStyle }}
			ref={communityContainerRef}
		>
			<View style={styles.labelContainer}>
				<Text testID="input-label" style={styles.label}>{ label }</Text>
			</View>
			<View style={styles.SearchInputContainer}>
				<Input
					onBlur={_onBlur}
					onFocus={_onFocus}
					onChange={( value ) => setTextValue( value )}
					placeholder={placeholder}
					value={textValue}
					onSubmitEditing={_onSubmitEditing}
					returnKeyType="done"
					scrollEnabled={false}
					disabled={disabled}
					clearText={_clearTextValue}
					isLoading={isLoading}
				/>
				<SuggestionsList
					suggestionsVisible={suggestionsVisible}
					suggestions={suggestions}
					onPress={onPressSuggestion}
				/>
				<Text testID="helperText-ID" style={helperTextStyle}>{helperText}</Text>
			</View>
		</View>
	);
};

CommunityInput.propTypes = {
	containerStyle: PropTypes.instanceOf( Object ),
	testID: PropTypes.string,
	label: PropTypes.string,
	onSubmit: PropTypes.func,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf( PropTypes.any ),
	scrollTo: PropTypes.func,
	disabled: PropTypes.bool,
	helperText: PropTypes.string,
	isLoading: PropTypes.bool,
	hasError: PropTypes.bool
};

CommunityInput.defaultProps = {
	containerStyle: {},
	testID: 'community-input',
	label: '',
	onSubmit: () => {},
	placeholder: '',
	options: [],
	scrollTo: () => {},
	disabled: false,
	helperText: '',
	isLoading: false,
	hasError: false
};

export default CommunityInput;
