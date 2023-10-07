import { Text } from 'react-native-elements';
import React from 'react';
import { styles } from './MessageTooltipPopover.styles';

const MessageTooltipPopover = () => (
	<Text testID="messageTooltipPopover-testID" style={styles.text}>
		You can mention a person using
		{' '}
		<Text style={styles.boldText}>@name</Text>
		, add an airport identifier by using the
		{' '}
		<Text style={styles.boldText}>+ICAO</Text>
		{' '}
		code or add
		{' '}
		<Text style={styles.boldText}>#hashtags</Text>
		.
	</Text>
);

export default MessageTooltipPopover;
