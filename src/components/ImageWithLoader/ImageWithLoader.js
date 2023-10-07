import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Image } from '../Image';
import { styles } from './ImageWithLoader.styles';
import { useOnLoadImage } from '../../hooks/useOnLoadImage';

const ImageWithLoader = ( {
	renderLoader, ...imageProps
} ) => {
	const [ loading, onLoadEnd ] = useOnLoadImage();
	const finalImageProps = { ...imageProps, onLoadEnd };

	return (
		<>
			<Image {...finalImageProps} />

			{ loading && (
				<View style={styles.loaderContainer}>
					{renderLoader()}
				</View>
			)}
		</>
	);
};

ImageWithLoader.propTypes = {
	renderLoader: PropTypes.func.isRequired
};

export default ImageWithLoader;
