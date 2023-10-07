import React from 'react';
import PropTypes from 'prop-types';

import { styles } from './ActionSheetButton.styles';
import { Button } from '../Button';
import noop from '../../helpers/noop';

const ActionSheetButton = ( {
	testID, title, size, onPress, buttonStyle, titleStyle, type
} ) => {
	const _buttonStyle = {
		...styles.button,
		...buttonStyle
	};

	const _typeStyle = styles[ type ];

	const _titleStyle = {
		..._typeStyle,
		...titleStyle
	};
	return (
		<Button
			testID={testID}
			buttonStyle={_buttonStyle}
			titleStyle={_titleStyle}
			title={title}
			size={size}
			onPress={onPress}
		/>
	);
};

ActionSheetButton.propTypes = {
	title: PropTypes.string,
	testID: PropTypes.string,
	buttonStyle: PropTypes.instanceOf( Object ),
	titleStyle: PropTypes.instanceOf( Object ),
	size: PropTypes.oneOf( [ 'big', 'medium', 'small', '' ] ),
	onPress: PropTypes.func,
	type: PropTypes.oneOf( [ 'default', 'constructive', 'destructive' ] )
};

ActionSheetButton.defaultProps = {
	title: '',
	testID: 'action-sheet-button',
	buttonStyle: {},
	titleStyle: {},
	size: 'medium',
	onPress: noop,
	type: 'default'
};

export default ActionSheetButton;
