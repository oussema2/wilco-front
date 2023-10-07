import React from 'react';
import {
	View,
	Text
} from 'react-native';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import noop from '../../../helpers/noop';
import PostPresenter from '../../../presenters/PostPresenter';
import { HorizontalPadding } from '../../HorizontalPadding';
import { styles } from './PreviewComments.styles';

const PreviewComments = ( {
	testID, postPresenter, showPreviewComments, renderComment, commentButtonWasPressed
} ) => (
	<View testID={testID}>
		{ showPreviewComments && postPresenter
			.previewCommentPresenters.map( ( commentPresenter ) => (
				<View key={commentPresenter.comment.id}>
					{renderComment( commentPresenter )}
				</View>
			) )}

		{ showPreviewComments && postPresenter.showSeeAllCommentsButton && (
			<HorizontalPadding style={styles.seeAllCommentsContainer}>
				<Text
					testID="see-all-comments-testID"
					style={styles.seeAllCommentsText}
					onPress={commentButtonWasPressed}
				>
					See all comments
				</Text>
			</HorizontalPadding>
		)}
	</View>
);

PreviewComments.propTypes = {
	testID: PropTypes.string,
	postPresenter: PropTypes.instanceOf( PostPresenter ).isRequired,
	showPreviewComments: PropTypes.bool,
	renderComment: PropTypes.func,
	commentButtonWasPressed: PropTypes.func
};

PreviewComments.defaultProps = {
	testID: 'preview-comments-component',
	showPreviewComments: false,
	renderComment: noop,
	commentButtonWasPressed: noop
};

export default observer( PreviewComments );
