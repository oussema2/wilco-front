import React from 'react';
import {
	FlatList,
	View
} from 'react-native';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react-lite';
import { styles } from './PilotPosts.styles';
import { ActivityIndicator } from '../../../components/ActivityIndicator';
import { Post } from '../../../components/Post';
import { SuplementalTitle } from '../../../components/SuplementalTitle';
import EmptyStateText from '../../../components/EmptyStateText/EmptyStateText';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { TertiaryButton } from '../../../components/TertiaryButton';

const PilotPosts = observer( ( {
	testID, presenter, pilotInfo, showPosts
}, ref ) => {
	const _listHeaderComponent = () => (
		<View>
			{pilotInfo}
			{ showPosts && (
				<View style={styles.postTitleContainer}>
					<SuplementalTitle
						testID="posts-title"
						text="Posts"
						style={styles.postTitle}
					/>
				</View>
			) }
		</View>
	);

	const _noItemDisplay = ( pilotProfilePresenter ) => {
		const {
			emptyPostsText, sharePostsButtonWasPressed,
			pilotPostsPresenter
		} = pilotProfilePresenter;

		const separatorView = ( !pilotPostsPresenter?.hasAnyPost )
				&& <View style={styles.separatorView} />;

		return showPosts && (
			<>
				<HorizontalPadding>
					<EmptyStateText text={emptyPostsText} />

					{( sharePostsButtonWasPressed ) && (
						<View style={styles.sharePostButtonContainer}>
							<TertiaryButton
								testID="shareFlightButton-component"
								title="Share a post"
								size="small"
								onPress={sharePostsButtonWasPressed}
							/>
						</View>
					)}

					{separatorView}
				</HorizontalPadding>
				<View style={styles.postSeparatorView} />
			</>
		);
	};

	// eslint-disable-next-line react/prop-types
	const _renderPost = ( { item: postPresenter } ) => (
		<View style={styles.listViewItemContainer}>
			<Post
				testID="post-component"
				postPresenter={postPresenter}
				commentButtonWasPressed={() => {
					presenter.pilotPostsPresenter.commentButtonWasPressed( postPresenter.post.id );
				}}
				contentWasPressed={() => {
					presenter.pilotPostsPresenter.contentWasPressed( postPresenter.post.id );
				}}
				goToPostDetail={presenter.pilotPostsPresenter.contentWasPressed}
				showPreviewComments
				showOptionsComments={false}
				showBackground
			/>
		</View>
	);

	const _renderFooter = ( pilotPostPresenter ) => (
		<View style={styles.footerContainer}>
			<ActivityIndicator
				testID="activityIndicator-testID"
				// eslint-disable-next-line react/destructuring-assignment
				isLoading={pilotPostPresenter?.isLoading && !presenter.isRefreshing}
				// eslint-disable-next-line react/destructuring-assignment,max-len
				containerStyle={pilotPostPresenter?.isLoading && !presenter.isRefreshing && styles.activityIndicator}
			/>
		</View>
	);

	return (
		<View testID={testID}>
			{!!presenter && (
				<FlatList
					testID="posts-flatList"
					ref={ref}
					data={showPosts && presenter.pilotPostsPresenter?.postPresenters}
					renderItem={_renderPost}
					ListEmptyComponent={_noItemDisplay( presenter )}
					keyExtractor={( postPresenter ) => postPresenter.post.id}
					ListHeaderComponent={_listHeaderComponent()}
					onEndReached={presenter.pilotPostsPresenter?.handleLoadMore}
					onEndReachedThreshold={0.5}
					onRefresh={presenter.onRefresh}
					refreshing={presenter.isRefreshing}
					ListFooterComponent={_renderFooter( presenter.pilotPostsPresenter )}
					initialNumToRender={5}
					maxToRenderPerBatch={5}
					windowSize={12}
				/>
			)}
		</View>
	);
}, { forwardRef: true } );

PilotPosts.propTypes = {
	testID: PropTypes.string,
	presenter: PropTypes.any.isRequired,
	pilotInfo: PropTypes.node,
	showPosts: PropTypes.bool
};

PilotPosts.defaultProps = {
	testID: 'pilot-posts-component',
	pilotInfo: null,
	showPost: true
};

export default PilotPosts;
