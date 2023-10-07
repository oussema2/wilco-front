import React from 'react';
import {
	View, Text, Image, Pressable
} from 'react-native';
import PropTypes from 'prop-types';
import noop from '../../helpers/noop';
import { comment } from '../../assets/icons';
import { styles } from './CommentCount.styles';

const CommentCount = ( { testID, count, onPress } ) => (
	<Pressable onPress={onPress}>
		<View testID={testID} style={styles.commentCountContainer}>
			<Image testID="comment-count-image" style={styles.commentIcon} source={comment} />
			<Text testID="comment-count-text" style={styles.comments}>
				{`${count} ${count === 1 ? 'comment' : 'comments'}`}
			</Text>
		</View>
	</Pressable>
);

CommentCount.propTypes = {
	testID: PropTypes.string,
	count: PropTypes.number,
	onPress: PropTypes.func
};

CommentCount.defaultProps = {
	testID: 'commentCount-component',
	count: 0,
	onPress: noop
};

export default CommentCount;
