import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { TertiaryButton } from '../TertiaryButton';
import { photoVideo } from '../../assets/icons';
import PlaceholderButton from '../PlaceholderButton/PlaceholderButton';
import { useAddPhotosButton } from '../../hooks/useAddPhotosButton';

const AddPhotosButton = ( {
	testID, title, onPhotosSelected, selectedPhotos, maxPhotosAllowed, showPlaceholder
} ) => {
	const handleGalleryPermission = useAddPhotosButton(
		onPhotosSelected,
		maxPhotosAllowed,
		selectedPhotos
	);

	return (
		showPlaceholder
			? (
				<PlaceholderButton
					testID={testID}
					imageSource={photoVideo}
					onPress={handleGalleryPermission}
					title="Add photos"
				/>
			)
			: (
				<TertiaryButton
					testID={testID}
					title={title}
					size="small"
					onPress={handleGalleryPermission}
				/>
			)
	);
};

AddPhotosButton.propTypes = {
	testID: PropTypes.string,
	title: PropTypes.string,
	onPhotosSelected: PropTypes.func,
	selectedPhotos: PropTypes.any,
	maxPhotosAllowed: PropTypes.number,
	showPlaceholder: PropTypes.bool
};

AddPhotosButton.defaultProps = {
	testID: 'addPhotosButton-component',
	title: 'Add photo/s',
	onPhotosSelected: () => {},
	selectedPhotos: [],
	maxPhotosAllowed: 10,
	showPlaceholder: false
};

export default observer( AddPhotosButton );
