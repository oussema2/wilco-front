import React from 'react';
import { Pressable, View } from 'react-native';
import PropTypes from 'prop-types';

import ImagePicker from 'react-native-image-crop-picker';
import { styles } from './EditAvatar.styles';
import { Avatar } from '../Avatar';
import { TextButton } from '../TextButton';
import useGalleryPermissionHandler from '../../hooks/useGalleryPermissionHandler';

const EditAvatar = ( {
	testID, onAvatarChange, source, variant, size
} ) => {
	const _onImageSelected = ( image ) => {
		onAvatarChange( { uri: image.path, base64: image.data } );
	};

	const _openImagePicker = async () => {
		try {
			const image = await ImagePicker.openPicker( {
				mediaType: 'photo',
				cropping: true,
				cropperCircleOverlay: true,
				includeBase64: true,
				cropperChooseText: 'Save'
			} );
			_onImageSelected( image );
		} catch { }
	};

	const handleGalleryPermission = useGalleryPermissionHandler( _openImagePicker );
	const variantText = variant === 'user' ? 'profile' : variant;
	const buttonTitle = source ? `Change ${variantText} photo` : `Add ${variantText} photo`;

	return (
		<View style={styles.editAvatar} testID={testID}>
			<Pressable
				testID="edit-avatar-image-testID"
				onPress={() => handleGalleryPermission()}
			>
				<Avatar source={source} variant={variant} size={size} />
			</Pressable>
			<TextButton
				testID="edit-avatar-button-testID"
				onPress={() => handleGalleryPermission()}
				title={buttonTitle}
			/>
		</View>
	);
};

EditAvatar.propTypes = {
	testID: PropTypes.string,
	onAvatarChange: PropTypes.func.isRequired,
	source: PropTypes.shape( {
		uri: PropTypes.string.isRequired
	} ),
	variant: PropTypes.oneOf( [ 'user', 'aircraft' ] ),
	size: PropTypes.oneOf( [ 'big', 'medium', 'small' ] )
};

EditAvatar.defaultProps = {
	testID: 'EditAvatar-Component',
	source: null,
	variant: 'user',
	size: 'medium'
};

export default EditAvatar;
