/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { isMentionPartType } from 'react-native-controlled-mentions';
import { PART_TYPE } from '../constants/post';

const isTriggerPartType = ( part ) => part.partType && part.partType.trigger;

const isPatternPartType = ( part ) => part.partType && part.partType.pattern;

export const isAirportMentionPartType = ( part ) => {
	return isPatternPartType( part ) && part.partType.pattern === PART_TYPE.airports.pattern;
};

export const isHashtagMentionTriggerPartType = ( part ) => {
	return isTriggerPartType( part ) && part.partType.trigger === PART_TYPE.hashtagTrigger.trigger;
};

export const isHashtagMentionPatternPartType = ( part ) => {
	return part.partType && !isMentionPartType( part.partType ) && !isAirportMentionPartType( part );
};

export const isPilotMentionPartType = ( part ) => {
	return isTriggerPartType( part ) && part.partType.trigger === PART_TYPE.mention.trigger;
};
