import RNSF from 'react-native-fs';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { Platform } from 'react-native';
import { palette } from '../Theme';
import useGalleryPermissionHandler from './useGalleryPermissionHandler';

export const useAddPhotosButton = ( onPhotosSelected, maxPhotosAllowed, selectedPhotos ) => {
	const _getBase64 = async ( images ) => {
		await Promise.all( images.map( async ( image ) => {
			const base64 = await RNSF.readFile( image.path, 'base64' );
			image.base64 = base64;
		} ) );
	};

	const mediaPathForAndroid = ( media ) => `file://${media.realPath}`;

	const mediaPathForIos = ( media ) => media.path.replace( 'file://', '' );

	const _onImagesSelected = ( images ) => {
		const _photos = images.map( ( image ) => ( {
			...image,
			uri: Platform.select( {
				android: mediaPathForAndroid( image ),
				ios: mediaPathForIos( image )
			} ),
			base64: image.base64
		} ) );
		onPhotosSelected( _photos );
	};

	const _openImagePicker = async () => {
		try {
			const multipleImagePickerOptions = {
				selectedColor: palette.primary.default,
				maxSelectedAssets: maxPhotosAllowed,
				mediaType: 'image',
				selectedAssets: selectedPhotos,
				usedCameraButton: false,
				maximumMessageTitle: 'Limit Reached'
			};

			let images = await MultipleImagePicker.openPicker( multipleImagePickerOptions );
			await _getBase64( images );
			_onImagesSelected( images );
		} catch { }
	};

	const handleGalleryPermission = useGalleryPermissionHandler( _openImagePicker );

	return handleGalleryPermission;
};
