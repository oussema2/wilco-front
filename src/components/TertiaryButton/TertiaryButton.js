import React from 'react';
import PropTypes from 'prop-types';
import noop from '../../helpers/noop';
import { Button } from '../Button';
import { styles } from './TertiaryButton.styles';

const TertiaryButton = ( {
	testID, title, size, onPress, buttonStyle
} ) => {
	const _buttonStyle = {
		...styles.button,
		...buttonStyle
	};

	return (
		<Button
			testID={testID}
			buttonStyle={_buttonStyle}
			titleStyle={styles.title}
			title={title}
			size={size}
			onPress={onPress}
		/>
	);
};

TertiaryButton.propTypes = {
	title: PropTypes.string,
	testID: PropTypes.string,
	size: PropTypes.string,
	onPress: PropTypes.func,
	buttonStyle: PropTypes.instanceOf( Object )
};

TertiaryButton.defaultProps = {
	title: '',
	testID: 'tertiaryButton-component',
	size: 'custom',
	onPress: noop,
	buttonStyle: {}
};

export default TertiaryButton;
