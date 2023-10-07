import React from 'react';
import PropTypes from 'prop-types';
import noop from '../../helpers/noop';
import { plus } from '../../assets/icons';
import { PrimaryButton } from '../PrimaryButton';
import { styles } from './RoundedPrimaryButton.styles';

const RoundedPrimaryButton = ( {
	testID, onPress
} ) => {
	const _iconStyle = {
		iconStyle: {
			source: plus
		}
	};

	return (
		<PrimaryButton
			testID={testID}
			buttonStyle={{ ...styles.button, ..._iconStyle }}
			onPress={onPress}
		/>
	);
};

RoundedPrimaryButton.propTypes = {
	testID: PropTypes.string,
	onPress: PropTypes.func
};

RoundedPrimaryButton.defaultProps = {
	testID: 'roundedPrimaryButton',
	onPress: noop
};

export default RoundedPrimaryButton;
