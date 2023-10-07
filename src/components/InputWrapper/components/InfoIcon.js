import React from 'react';
import { Image, View } from 'react-native';
import { styles } from '../InputWrapper.styles';
import { infoCircle } from '../../../assets/icons';

const InfoIcon = () => (
	<View style={styles.imageTooltipContainer}>
		<Image
			style={styles.imageTooltip}
			source={infoCircle}
		/>
	</View>
);

export default InfoIcon;
