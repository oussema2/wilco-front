import { Image, View, ViewPropTypes } from 'react-native';
import { ban } from '../../../../../../assets/icons';
import React from 'react';
import styles from '../CometChatDeleteMessageIcon/style';

const CometChatDeleteMessageIcon = ( {
	containerStyle
} ) => {
	return	(
		<View style={ [ styles.banIconWrapperStyle, containerStyle ] }>
			<Image style={styles.iconStyle} source={ban} />
		</View>
	);
};

CometChatDeleteMessageIcon.propTypes = {
	containerStyle: ViewPropTypes.style
};

CometChatDeleteMessageIcon.defaultProps = {
	containerStyle: null
};

export default CometChatDeleteMessageIcon;

