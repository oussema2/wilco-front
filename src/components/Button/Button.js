import React from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonElement } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Image } from '../Image';
import noop from '../../helpers/noop';
import { styles } from './Button.styles';

const Button = ( {
	testID, title, buttonStyle, titleStyle, size, onPress, disabled
} ) => {
	const _sizeForButton = {
		'small': { height: 52, width: 164 },
		'medium': { height: 52, width: 236 },
		'big': { height: 60, width: 335 }
	};

	const _buttonStyle = {
		...styles.button,
		..._sizeForButton[ size ],
		...buttonStyle
	};

	const _titleStyle = {
		...styles.title,
		...titleStyle
	};

	const _iconStyles = {
		size: 24,
		...styles.icon,
		..._buttonStyle.iconStyle
	};

	const _renderIcon = () => (
		<Image
			testID="icon"
			source={_iconStyles.source}
			size={_iconStyles.size}
			tintColor={_iconStyles.tintColor}
		/>
	);

	return (
		<ButtonElement
			icon={_iconStyles.source && _renderIcon}
			testID={testID}
			buttonStyle={_buttonStyle}
			titleStyle={_titleStyle}
			title={title}
			onPress={onPress}
			disabled={disabled}
			TouchableComponent={TouchableOpacity}
		/>
	);
};

Button.propTypes = {
	title: PropTypes.string,
	testID: PropTypes.string,
	buttonStyle: PropTypes.instanceOf( Object ),
	titleStyle: PropTypes.instanceOf( Object ),
	size: PropTypes.oneOf( [ 'big', 'medium', 'small', 'custom' ] ),
	onPress: PropTypes.func,
	disabled: PropTypes.bool
};

Button.defaultProps = {
	title: '',
	testID: 'button',
	buttonStyle: {},
	titleStyle: {},
	size: 'medium',
	onPress: noop,
	disabled: false
};

export default Button;
