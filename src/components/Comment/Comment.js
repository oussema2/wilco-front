import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import CommentHeaderView from '../HeaderView/CommentHeaderView';
import CommentPresenter from '../../presenters/CommentPresenter';
import { styles } from './Comment.styles';
import AutoLink from '../AutoLink/AutoLink';
import ReadMoreText from '../ReadMoreText/ReadMoreText';

const Comment = ( {
	testID, commentPresenter, showOptions, isPreviewComment, commentWasPressed
} ) => (
	<View testID={testID} style={styles.commentContainer}>
		<CommentHeaderView
			testID="pilotsInfo-HeaderView"
			pilotName={commentPresenter.pilotName}
			dateToDisplay={commentPresenter.dateToDisplay}
			optionsOnPress={showOptions && commentPresenter.commentOptionsWasPressed}
			pilotOnPress={isPreviewComment
				? commentWasPressed : commentPresenter.commentPilotWasPressed}
			imageSource={commentPresenter.pilotProfilePictureThumbnailSource}
		/>

		{ isPreviewComment ? (
			<ReadMoreText testID="comment-testID" text={commentPresenter.text} style={styles.text} onPress={commentWasPressed} />
		) :	(
			<Text onPress={commentWasPressed} testID="comment-testID">
				<AutoLink testID="text-Text" text={commentPresenter.text} style={styles.text} />
			</Text>
		)}
	</View>
);

Comment.propTypes = {
	testID: PropTypes.string,
	commentPresenter: PropTypes.instanceOf( CommentPresenter ).isRequired,
	showOptions: PropTypes.bool,
	isPreviewComment: PropTypes.bool,
	commentWasPressed: PropTypes.func
};

Comment.defaultProps = {
	testID: 'comment-Component',
	showOptions: true,
	isPreviewComment: false,
	commentWasPressed: () => {}
};

export default Comment;
