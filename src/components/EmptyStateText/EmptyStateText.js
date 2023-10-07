import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './EmptyStateText.styles';

const EmptyStateText = ( { text } ) => (
	<View style={styles.containerView}>
		<Text style={styles.emptyStateBanner}>{text}</Text>
	</View>
);

EmptyStateText.propTypes = {
	text: PropTypes.string.isRequired
};

EmptyStateText.defaultProps = {
};

export default EmptyStateText;
