import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './PickerListItem.styles';

const PickerListItem = ( {
	testID, text, style
} ) => (
	<View testID={testID} style={styles.listItemContainer}>
		<Text style={[ styles.text, style ]}>{text}</Text>
	</View>
);

PickerListItem.propTypes = {
	text: PropTypes.string.isRequired,
	testID: PropTypes.string,
	style: PropTypes.any
};

PickerListItem.defaultProps = {
	testID: 'pickerListItem-component',
	style: null
};

export default PickerListItem;
