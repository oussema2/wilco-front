import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import { cross } from '../../../assets/icons';
import { buttonStyles } from '../RemovableImage.styles';
import { Image } from '../../Image';

const RemoveImageButton = ( { onPress } ) => (
	<Pressable onPress={onPress} style={buttonStyles.button}>
		<Image testID="removeImageButton" source={cross} size={10} />
	</Pressable>
);

RemoveImageButton.propTypes = {
	onPress: PropTypes.func.isRequired
};

export default RemoveImageButton;
