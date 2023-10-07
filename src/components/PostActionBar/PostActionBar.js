import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import noop from '../../helpers/noop';
import Post from '../../entities/Post';
import { LikeCount } from '../LikeCount';
import { CommentCount } from '../CommentCount';
import { styles } from './PostActionBar.styles';
import { HorizontalPadding } from '../HorizontalPadding';

const PostActionBar = ( {
	testID, post, numberOfLikes, liked, onLikePressed, onCommentPressed
} ) => (
	<View>
		<HorizontalPadding>
			<View testID={testID} style={styles.actionBar}>
				<LikeCount
					testID="action-bar-like-count"
					count={numberOfLikes}
					liked={liked}
					onPress={onLikePressed}
				/>
				<CommentCount testID="post-comment-count" count={post.numberOfComments} onPress={onCommentPressed} />
			</View>
		</HorizontalPadding>
		<LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} colors={[ '#f2f2f2', '#FFF' ]} style={{ height: post.numberOfComments ? 10 : 0 }} />
	</View>
);

PostActionBar.propTypes = {
	testID: PropTypes.string,
	post: PropTypes.instanceOf( Post ).isRequired,
	numberOfLikes: PropTypes.number,
	liked: PropTypes.bool,
	onLikePressed: PropTypes.func,
	onCommentPressed: PropTypes.func
};

PostActionBar.defaultProps = {
	testID: 'postActionBar-component',
	numberOfLikes: 0,
	liked: false,
	onLikePressed: noop,
	onCommentPressed: noop
};

export default observer( PostActionBar );
