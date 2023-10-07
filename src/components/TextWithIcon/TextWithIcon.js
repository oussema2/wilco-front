import React from 'react';
import {
	Image, Text, View, ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import { styles } from './TextWithIcon.styles';

const TextWithIcon = ( {
	testID, icon, children, style, imageStyle, numberOfLines
} ) => (
	<View testID={testID} style={[ styles.textWithIcon, style ]}>
		<View style={styles.iconView}>
			<Image style={[ styles.icon, imageStyle ]} source={icon} />
		</View>
		<Text style={styles.text} numberOfLines={numberOfLines}>
			{children}
		</Text>
	</View>
);

TextWithIcon.propTypes = {
	testID: PropTypes.string,
	icon: PropTypes.any.isRequired,
	children: PropTypes.string,
	style: ViewPropTypes.style,
	imageStyle: ViewPropTypes.style,
	numberOfLines: PropTypes.number
};

TextWithIcon.defaultProps = {
	testID: 'text-with-icon',
	children: '',
	style: null,
	imageStyle: null,
	numberOfLines: undefined
};

export default TextWithIcon;
