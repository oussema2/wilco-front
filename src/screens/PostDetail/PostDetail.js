/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import {
	View, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { TEXT } from '../../constants/formFields/commentForm';
import usePostDetailWireframe from '../../wireframes/usePostDetailWireframe';
import BaseScreen from '../BaseScreen/BaseScreen';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { NavigationBar } from '../../components/NavigationBar';
import Post from '../../components/Post/Post';
import { Title } from '../../components/Title';
import { Comment } from '../../components/Comment';
import { CommentBar } from '../../components/CommentBar';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import { styles } from './PostDetail.styles';
import { SCROLL_VIEW_POSITION } from '../../constants/theme';

const PostDetail = ( {
	testID,
	route
} ) => {
	const {
		postId,
		scrollToEnd,
		scrollToFirstComment
	} = route.params;
	const ref = useRef();

	const scrollToFirstCommentCallback = () => {
		setTimeout( () => {
			if ( scrollToFirstComment ) {
				ref.current
					?.scrollToIndex( { animated: false, index: 0, viewPosition: SCROLL_VIEW_POSITION } );
			}
		}, 500 );
	};

	const presenter = usePostDetailWireframe( { postId, scrollToEnd, scrollToFirstCommentCallback } );

	const _listHeaderComponent = ( { postDetailPresenter } ) => (
		<View style={styles.containerView}>
			<Post testID="post-component" postPresenter={postDetailPresenter.postPresenter} showBackground={false} />
			{postDetailPresenter.commentPresenters.length > 0 && (
				<HorizontalPadding>
					<Title testID="commentsTitle-component" text="Comments" />
				</HorizontalPadding>
			)}
		</View>
	);

	const _renderComment = ( { item: commentPresenter } ) => (
		<HorizontalPadding>
			<Comment
				testID="comment-Comment"
				commentPresenter={commentPresenter}
			/>
		</HorizontalPadding>
	);

	const _scrollToEnd = () => {
		setTimeout( () => {
			if ( presenter.scrollToEnd ) {
				ref.current
					?.scrollToEnd( { animated: false } );
			}
		}, 500 );
	};

	const _handleLoadMore = () => {
		presenter.handleLoadMore();
	};

	const _renderFooter = ( localPresenter ) =>	{
		const { isLoadingComments, isRefreshing } = localPresenter;

		return (
			<ActivityIndicator
				testID="activityIndicatorComments-testID"
				// eslint-disable-next-line react/destructuring-assignment
				isLoading={isLoadingComments && !isRefreshing}
			/>
		);
	};

	const _onRefresh = ( ) => {
		presenter.onRefresh();
	};

	return (
		<BaseScreen
			testID={testID}
			isLoading={!!presenter && presenter.isCommenting}
		>
			{( !presenter.isLoadingPost )
				? ( ( !!presenter?.postPresenter ) && (
					<>
						<HorizontalPadding>
							<NavigationBar
								testID="navigationBar-component"
								title={presenter.title}
								onBackArrowPress={presenter.backButtonWasPressed}
							/>
						</HorizontalPadding>

						<FlatList
							ref={ref}
							testID="comments-FlatList"
							data={presenter.commentPresenters}
							renderItem={_renderComment}
							keyExtractor={( commentPresenter ) => commentPresenter.comment.id}
							ListHeaderComponent={_listHeaderComponent( { postDetailPresenter: presenter } )}
							onRefresh={_onRefresh}
							refreshing={presenter.isRefreshing}
							onContentSizeChange={() => _scrollToEnd()}
							onEndReached={_handleLoadMore}
							onEndReachedThreshold={0.5}
							ListFooterComponent={_renderFooter( presenter )}
						/>

						<KeyboardAvoidingView
							enabled
							behavior={( Platform.OS === 'ios' ) ? 'padding' : null}
							keyboardVerticalOffset={Platform.select( {
								ios: 50,
								android: 500
							} )}
						>
							<HorizontalPadding>
								<CommentBar
									testID="comment-CommentBar"
									onReplyPressed={presenter.form.onSubmit}
									{...presenter.form.$( TEXT )
										.bind()}
								/>
							</HorizontalPadding>
						</KeyboardAvoidingView>
					</>
				) ) : (
					<ActivityIndicator containerStyle={styles.loadingPost} testID="activityIndicatorPost-testID" />
				)}

		</BaseScreen>
	);
};

PostDetail.propTypes = {
	testID: PropTypes.string,
	route: PropTypes.instanceOf( Object ).isRequired
};

PostDetail.defaultProps = {
	testID: 'postDetail-screen'
};

export default observer( PostDetail );
