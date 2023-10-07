import React from 'react';
import { Pressable, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Image } from '../Image';
import { meatballsMenu } from '../../assets/icons/index';
import { styles } from './MeatballsMenu.styles';
import { palette } from '../../Theme';

const MeatballsMenu = ( {
	testID, style, containerStyle, onPress
} ) => (
	<Pressable onPress={onPress} style={containerStyle}>
		<Image
			testID={testID}
			source={meatballsMenu}
			style={{ ...styles.icon, ...style }}
			tintColor={palette.grayscale.abbey}
		/>
	</Pressable>
);

MeatballsMenu.propTypes = {
	testID: PropTypes.string,
	style: ViewPropTypes.style,
	containerStyle: ViewPropTypes.style,
	onPress: PropTypes.func
};

MeatballsMenu.defaultProps = {
	testID: 'meatballsMenu-component',
	style: {},
	containerStyle: {},
	onPress: () => {}
};

export default MeatballsMenu;
