import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import noop from '../../helpers/noop';
import { RoundedPrimaryButton } from '../RoundedPrimaryButton';
import { styles } from './PostFlightButton.styles';

const PostFlightButton = ( {
	testID, onPress
} ) => (
	<View
		testID={testID}
		style={styles.containerView}
	>
		<RoundedPrimaryButton
			testID="postText-button"
			onPress={onPress}
		/>
	</View>
);

PostFlightButton.propTypes = {
	testID: PropTypes.string,
	onPress: PropTypes.func
};

PostFlightButton.defaultProps = {
	testID: 'postFlight-component',
	onPress: noop
};

export default PostFlightButton;
