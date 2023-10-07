import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { createStyles } from './Avatar.styles';
import { aircraft, user } from '../../assets/icons';
import { Image } from '../Image';
import { ImageWithLoader } from '../ImageWithLoader';
import { palette } from '../../Theme';

const Avatar = ( {
	testID, source, variant, size
} ) => {
	const styles = createStyles( size );

	const defaultSource = variant === 'user' ? user : aircraft;
	const defaultAvatarStyles = styles[ variant ];
	const defaultTintColor = palette.grayscale.white;

	const imageSource = source || defaultSource;
	const avatarStyles = source ? styles.image : defaultAvatarStyles;
	const tintColor = source ? undefined : defaultTintColor;

	const renderLoader = () => (
		<View style={styles.avatarView}>
			<Image
				testID={`${testID}-loader`}
				tintColor={defaultTintColor}
				source={defaultSource}
				style={defaultAvatarStyles}
			/>
		</View>
	);

	return	(
		<View style={styles.avatarView} testID={testID}>
			<ImageWithLoader
				tintColor={tintColor}
				source={imageSource}
				style={avatarStyles}
				renderLoader={renderLoader}
			/>
		</View>
	);
};

Avatar.propTypes = {
	testID: PropTypes.string,
	source: PropTypes.shape( {
		uri: PropTypes.string.isRequired
	} ),
	variant: PropTypes.oneOf( [ 'user', 'aircraft' ] ),
	size: PropTypes.oneOf( [ 'big', 'medium', 'small' ] )
};

Avatar.defaultProps = {
	testID: 'Avatar-Component',
	source: null,
	variant: 'user',
	size: 'medium'
};

export default Avatar;
