import React from 'react';
import PropTypes from 'prop-types';
import noop from '../../helpers/noop';
import { Button } from '../Button';
import { styles } from './PrimaryButton.styles';

const PrimaryButton = ( {
	testID, title, size, onPress, buttonStyle, disabled
} ) => {
	const _buttonStyle = {
		...styles.button,
		...buttonStyle
	};

	return (
		<Button
			testID={testID}
			buttonStyle={_buttonStyle}
			title={title}
			size={size}
			onPress={onPress}
			disabled={disabled}
		/>
	);
};

PrimaryButton.propTypes = {
	title: PropTypes.string,
	testID: PropTypes.string,
	size: PropTypes.string,
	onPress: PropTypes.func,
	buttonStyle: PropTypes.instanceOf( Object ),
	disabled: PropTypes.bool
};

PrimaryButton.defaultProps = {
	title: '',
	testID: 'primaryButton',
	size: 'custom',
	onPress: noop,
	buttonStyle: {},
	disabled: false
};

export default PrimaryButton;
