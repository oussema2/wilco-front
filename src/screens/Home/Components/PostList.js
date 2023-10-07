import React from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../Home.styles';
import { Post } from '../../../components/Post';
import { ActivityIndicator } from '../../../components/ActivityIndicator';
import SkeletonHome from './SkelentonHome';
import noop from '../../../helpers/noop';

const PostList = observer( ( {
	testID, commentButtonWasPressed, contentWasPressed, handleLoadMore, onRefresh, isRefreshing,
	isLoading, postPresenters, onHashtagPress
}, ref ) => {
	// eslint-disable-next-line react/prop-types
	const _renderPost = ( { item: postPresenter } ) => (
		<Post
			testID="post-component"
			postPresenter={postPresenter}
			commentButtonWasPressed={() => commentButtonWasPressed( postPresenter.post.id )}
			contentWasPressed={() => contentWasPressed( postPresenter.post.id )}
			showPreviewComments
			showOptionsComments={false}
			onHashtagPress={onHashtagPress}
		/>
	);

	const _renderFooter = () => (
		( postPresenters?.length > 0 && isLoading && !isRefreshing ) ? (
			<ActivityIndicator
				testID="activityIndicator-testID"
				isLoading={isLoading && !isRefreshing}
				containerStyle={styles.activityIndicatorContainer}
			/>
		) : ( isLoading && !isRefreshing ) && <SkeletonHome />
	);

	return (
		<View style={styles.postContainer}>
			<FlatList
				ref={ref}
				testID={testID}
				data={postPresenters}
				renderItem={_renderPost}
				keyExtractor={( postPresenter ) => postPresenter.post.id}
				onRefresh={onRefresh}
				refreshing={isRefreshing}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={_renderFooter}
				initialNumToRender={5}
				maxToRenderPerBatch={5}
				windowSize={12}
			/>
		</View>
	);
}, { forwardRef: true } );

PostList.propTypes = {
	testID: PropTypes.string,
	commentButtonWasPressed: PropTypes.func,
	contentWasPressed: PropTypes.func,
	handleLoadMore: PropTypes.func,
	onRefresh: PropTypes.func,
	isRefreshing: PropTypes.bool,
	isLoading: PropTypes.bool,
	postPresenters: PropTypes.any,
	onHashtagPress: PropTypes.func
};

PostList.defaultProps = {
	testID: 'posts-flatList',
	commentButtonWasPressed: noop,
	contentWasPressed: noop,
	handleLoadMore: noop,
	onRefresh: noop,
	isRefreshing: false,
	isLoading: false,
	postPresenters: [],
	onHashtagPress: noop
};
export default PostList;
