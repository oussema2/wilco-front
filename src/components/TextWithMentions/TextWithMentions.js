import { parseValue } from 'react-native-controlled-mentions';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { mentionStyles } from '../MentionInput/MentionInput.styles';
import AutoLink from '../AutoLink/AutoLink';
import noop from '../../helpers/noop';
import { PART_TYPE } from '../../constants/post';
import {
	isAirportMentionPartType,
	isHashtagMentionPatternPartType,
	isHashtagMentionTriggerPartType,
	isPilotMentionPartType
} from '../../helpers/mentions';

const TextWithMentions = ( {
	testID, value, style, onMentionPress, onHashtagPress
} ) => {
	const renderPart = ( part, index ) => {
		if ( isPilotMentionPartType( part ) ) {
			return (
				<Text
					testID={`${index}-${part.data?.trigger}`}
					key={`${index}-${part.data?.trigger}`}
					style={part.partType.textStyle}
					onPress={() => onMentionPress( part.data.id )}
				>
					{part.text}
				</Text>
			);
		}

		if ( isHashtagMentionTriggerPartType( part ) ) {
			return (
				<Text
					testID={`${index}-${part.data?.trigger}`}
					key={`${index}-${part.data?.trigger}`}
					style={part.partType.textStyle}
					onPress={() => onHashtagPress( part.data.name )}
				>
					{part.text}
				</Text>
			);
		}

		if ( isHashtagMentionPatternPartType( part ) ) {
			return (
				<Text
					testID={part.text}
					key={index}
					style={part.partType.textStyle}
					onPress={() => onHashtagPress( part.text?.replace( '#', '' ) )}
				>
					{part.text}
				</Text>
			);
		}

		if ( isAirportMentionPartType( part ) ) {
			return (
				<Text
					testID={part.text}
					key={index}
					style={part.partType.textStyle}
				>
					{part.text.replace( '+', '' ).toUpperCase()}
				</Text>
			);
		}

		return <AutoLink key={index} text={part.text} />;
	};

	const { parts } = parseValue( value, [
		{ trigger: PART_TYPE.mention.trigger, textStyle: mentionStyles.linkStyle },
		{ pattern: PART_TYPE.airports.pattern, textStyle: mentionStyles.airportStyle },
		{ pattern: PART_TYPE.hashtagPattern.pattern, textStyle: mentionStyles.linkStyle },
		{ trigger: PART_TYPE.hashtagTrigger.trigger, textStyle: mentionStyles.linkStyle }
	] );

	return <Text testID={testID} style={style}>{parts.map( renderPart )}</Text>;
};

TextWithMentions.propTypes = {
	testID: PropTypes.string,
	value: PropTypes.string,
	style: PropTypes.instanceOf( Object ),
	onMentionPress: PropTypes.func,
	onHashtagPress: PropTypes.func
};

TextWithMentions.defaultProps = {
	testID: 'MentionText-testID',
	value: '',
	style: {},
	onMentionPress: noop,
	onHashtagPress: noop
};

export default TextWithMentions;
