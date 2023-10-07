import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from './ImageCarousel.styles';
import { RemovableImage } from '../RemovableImage';
import { PHOTO_AND_TRACK_ASPECT_RATIO as imageAspectRatio } from '../../constants/images';
import { ImageViewer } from '../ImageViewer';
import { Pagination } from '../Pagination';
import { OwlCarousel } from '../OwlCarousel';
import { ActivityIndicator } from '../ActivityIndicator';
import { ImageWithLoader } from '../ImageWithLoader';
import { palette } from '../../Theme';

const ImageCarousel = ( {
	testID, previewSources, sources, removeImage
} ) => {
	const [ imageViewerVisible, setImageViewerVisible ] = useState( false );
	const [ carouselIndex, setCarouselIndex ] = useState( 0 );
	const [ indexWhenCloseModal, setIndexWhenCloseModal ] = useState( 0 );
	const [ imageHeight, setImageHeight ] = useState( 213 );
	const _onCarouselWidthSet = ( width ) => setImageHeight( Math.round( width / imageAspectRatio ) );
	const imageStyle = { ...styles.image, height: imageHeight };

	useEffect( () => {
		if ( carouselIndex >= previewSources?.length ) setCarouselIndex( previewSources?.length - 1 );
	}, [ previewSources?.length ] );

	const renderLoader = () => (
		<ActivityIndicator
			color={palette.grayscale.white}
			containerStyle={[ { height: imageHeight }, styles.renderLoaderContainer ]}
		/>
	);

	const renderCarouselItem = ( { item } ) => {
		const imageProps = { style: imageStyle, resizeMode: 'cover', source: item };
		return removeImage
			? (
				<RemovableImage
					{...imageProps}
					removeOnPress={() => removeImage( item )}
				/>
			)
			: (
				<Pressable onPress={() => setImageViewerVisible( true )}>
					<ImageWithLoader {...imageProps} renderLoader={renderLoader} />
				</Pressable>
			);
	};

	const createPaginationView = ( dotsLength, activeDotIndex ) => (
		<Pagination length={dotsLength} activeIndex={activeDotIndex} />
	);

	const _onClosePress = ( index ) => {
		setIndexWhenCloseModal( index );
		setImageViewerVisible( false );
	};

	const _imageViewer = () => (
		<ImageViewer
			index={carouselIndex}
			items={sources}
			pagination={createPaginationView}
			visible={imageViewerVisible}
			onClosePress={_onClosePress}
		/>
	);

	return (
		<>
			{( sources ) ? _imageViewer() : null}

			<OwlCarousel
				testID={testID}
				items={previewSources}
				renderItem={renderCarouselItem}
				onWidthSet={_onCarouselWidthSet}
				index={carouselIndex}
				setIndex={setCarouselIndex}
				indexWhenCloseViewer={indexWhenCloseModal}
			/>
		</>
	);
};

ImageCarousel.propTypes = {
	testID: PropTypes.string,
	previewSources: PropTypes.arrayOf( PropTypes.object ).isRequired,
	sources: PropTypes.arrayOf( PropTypes.object ),
	removeImage: PropTypes.func
};

ImageCarousel.defaultProps = {
	testID: 'imageCarousel-component',
	sources: [],
	removeImage: null
};

export default observer( ImageCarousel );
