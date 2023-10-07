import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import noop from '../../helpers/noop';
import { TextButton } from '../TextButton';
import { styles } from './CommentBar.styles';
import { MultilineInput } from '../MultilineInput';

const CommentBar = ( {
	testID, value, onChange, onReplyPressed
} ) => (
	<View testID={testID} style={styles.containerView}>
		<MultilineInput testID="comment-Input" capitalizeFirstLetter value={value} onChange={onChange} />
		<View style={styles.replyButton}>
			<TextButton testID="reply-TextButton" title="Reply" onPress={onReplyPressed} />
		</View>
	</View>
);

CommentBar.propTypes = {
	testID: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onReplyPressed: PropTypes.func
};

CommentBar.defaultProps = {
	testID: 'commentBar-Component',
	value: '',
	onChange: noop,
	onReplyPressed: noop
};

export default CommentBar;
