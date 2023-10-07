/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { MentionInput as MentionInputNative } from 'react-native-controlled-mentions';
import { observer } from 'mobx-react-lite';
import { useFocus } from '../../hooks/useFocus';
import { useInputsStyle } from '../../hooks/useInputsStyle';
import PilotSuggestions from './components/PilotSuggestions';
import HashtagSuggestions from './components/HashtagSuggestions';
import { mentionStyles } from './MentionInput.styles';
import useMentionInputWireframe from '../../wireframes/useMentionInputWireframe';
import { useDebounce } from './components/useDebounce';
import { PART_TYPE } from '../../constants/post';

const MentionInput = ( {
	testID, value, error, disabled, onFocus, onBlur, onChange,
	placeholder, capitalizeFirstLetter, minimumLines, bold
} ) => {
	const presenter = useMentionInputWireframe();
	const [ focused, onInputFocused, onInputBlurred ] = useFocus( onFocus, onBlur );
	const [ styles, minHeight ] = useInputsStyle(
		focused, error, disabled, minimumLines, value, bold
	);

	return (
		<MentionInputNative
			testID={testID}
			textInputStyle={styles.postMessageTextInput}
			minimumLines={5}
			autoCapitalize={( capitalizeFirstLetter ) ? 'sentences' : 'none'}
			value={value}
			onFocus={onInputFocused}
			onBlur={onInputBlurred}
			onChange={onChange}
			placeholder={placeholder}
			scrollEnabled={!!presenter.hasKeyword}
			style={{
				...styles.input,
				minHeight: !presenter.hasKeyword ? minHeight : 52,
				maxHeight: presenter.hasKeyword ? 52 : undefined
			}}
			multiline
			partTypes={[
				{
					trigger: PART_TYPE.mention.trigger,
					renderSuggestions: ( { keyword, onSuggestionPress } ) => {
						useDebounce( keyword, presenter.pilotMentionInputState?.onKeywordChanged, 10 );

						return (
							<PilotSuggestions
								onSuggestionPress={onSuggestionPress}
								presenter={presenter.pilotMentionInputState}
							/>
						);
					},
					textStyle: mentionStyles.linkStyle,
					isBottomMentionSuggestionsRender: true,
					isInsertSpaceAfterMention: true,
					allowedSpacesCount: 1
				},
				{
					trigger: PART_TYPE.hashtagTrigger.trigger,
					renderSuggestions: ( { keyword, onSuggestionPress } ) => {
						useDebounce( keyword, presenter.hashtagMentionInputState?.onKeywordChanged, 10 );

						return (
							<HashtagSuggestions
								onSuggestionPress={onSuggestionPress}
								presenter={presenter.hashtagMentionInputState}
							/>
						);
					},
					textStyle: mentionStyles.linkStyle,
					isBottomMentionSuggestionsRender: true,
					isInsertSpaceAfterMention: true,
					allowedSpacesCount: 0
				},
				{
					pattern: PART_TYPE.hashtagPattern.pattern,
					textStyle: mentionStyles.linkStyle
				},
				{
					pattern: PART_TYPE.url.pattern,
					textStyle: mentionStyles.linkStyle
				},
				{
					pattern: PART_TYPE.urlShort.pattern,
					textStyle: mentionStyles.linkStyle
				},
				{
					pattern: PART_TYPE.airports.pattern,
					textStyle: mentionStyles.linkStyle
				}
			]}
		/>
	);
};

MentionInput.propTypes = {
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
	bold: PropTypes.bool
};

MentionInput.defaultProps = {
	testID: 'community-input',
	value: '',
	error: '',
	disabled: false,
	onFocus: () => {},
	onBlur: () => {},
	onChange: () => {},
	minimumLines: 1,
	capitalizeFirstLetter: false,
	placeholder: '',
	bold: true
};

export default observer( MentionInput );
