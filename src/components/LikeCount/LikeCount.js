import React from 'react';
import {
	View, Text, Image, Pressable
} from 'react-native';
import PropTypes from 'prop-types';
import { thumbsUp } from '../../assets/icons';
import { likedStyle, unlikedStyle } from './LikeCount.styles';

const LikeCount = ( {
	testID, count, liked, onPress
} ) => {
	const styles = liked ? likedStyle : unlikedStyle;

	return (
		<Pressable onPress={onPress}>
			<View testID={testID} style={styles.likeCountContainer}>
				<Image testID="like-count-image" style={styles.likeIcon} source={thumbsUp} />
				<Text testID="like-count-text" style={styles.likes}>
					{`${count} ${count === 1 ? 'like' : 'likes'}`}
				</Text>
			</View>
		</Pressable>
	);
};

LikeCount.propTypes = {
	testID: PropTypes.string,
	count: PropTypes.number,
	liked: PropTypes.bool,
	onPress: PropTypes.func
};

LikeCount.defaultProps = {
	testID: 'likeCount-component',
	count: 0,
	liked: false,
	onPress: () => {}
};

export default LikeCount;
