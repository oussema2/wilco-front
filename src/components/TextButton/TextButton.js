import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { defaultStyle, destructiveStyle } from './TextButton.styles';
import noop from '../../helpers/noop';

const TextButton = ( {
	testID, title, variant, onPress, style
} ) => {
	let styles = defaultStyle;
	if ( variant === 'destructive' ) { styles = destructiveStyle; }

	return (
		<Button
			testID={testID}
			buttonStyle={{ ...styles.button, ...style }}
			titleStyle={styles.title}
			title={title}
			size="custom"
			onPress={onPress}
		/>
	);
};

TextButton.propTypes = {
	testID: PropTypes.string,
	title: PropTypes.string.isRequired,
	variant: PropTypes.oneOf( [ 'default', 'destructive' ] ),
	onPress: PropTypes.func,
	style: ViewPropTypes.style
};

TextButton.defaultProps = {
	testID: 'textButton-Component',
	variant: 'default',
	onPress: noop,
	style: {}
};

export default TextButton;
