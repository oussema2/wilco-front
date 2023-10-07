import React from 'react';
import { Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';
import { remove } from '../../../assets/icons';
import { styles } from './ClearText.styles';

const ClearText = ( { testID, value, onPress } ) => {
	const clearTextIconSource = value.length > 0 ? remove : null;
	return (
		<Pressable onPress={onPress}>
			{clearTextIconSource && (
				<Image
					testID={testID}
					source={clearTextIconSource}
					style={styles.visibilityIcon}
				/>
			)}
		</Pressable>
	);
};

ClearText.propTypes = {
	testID: PropTypes.string,
	value: PropTypes.string,
	onPress: PropTypes.func
};

ClearText.defaultProps = {
	testID: 'clear-text-component',
	value: '',
	onPress: () => {}
};

export default ClearText;
