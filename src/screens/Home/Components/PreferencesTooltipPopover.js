import { Text } from 'react-native-elements';
import React from 'react';
import { Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './PreferencesTooltipPopover.styles';
import noop from '../../../helpers/noop';

const PreferencesTooltipPopover = ( { onPress } ) => (
	<View>
		<Text style={styles.title}>
			Choose the way to view your feed
		</Text>

		<Text style={styles.subtitle}>
			Don’t miss anything!
			Now you can set up your preferences and they will appear in “My Feed” tab.
			Only you can see which airports are set as your preferred ones.
		</Text>

		<Pressable onPress={onPress}>
			<Text style={styles.button}>
				Got it!
			</Text>
		</Pressable>
	</View>
);

PreferencesTooltipPopover.propTypes = {
	onPress: PropTypes.func
};
PreferencesTooltipPopover.defaultProps = {
	onPress: noop
};

export default PreferencesTooltipPopover;
