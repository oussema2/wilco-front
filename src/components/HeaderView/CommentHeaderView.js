import React from 'react';
import PropTypes from 'prop-types';
import HeaderView from './HeaderView';

const CommentHeaderView = ( {
	testID, pilotName, dateToDisplay, optionsOnPress, pilotOnPress, imageSource
} ) => (
	<HeaderView
		testID={testID}
		pilotName={pilotName}
		titleExtraInfo={dateToDisplay}
		optionsOnPress={optionsOnPress}
		pilotOnPress={pilotOnPress}
		imageSource={imageSource}
		variant="small"
	/>
);

CommentHeaderView.propTypes = {
	testID: PropTypes.string,
	pilotName: PropTypes.string.isRequired,
	dateToDisplay: PropTypes.string.isRequired,
	optionsOnPress: PropTypes.oneOfType( [ PropTypes.func, PropTypes.oneOf( [ false ] ) ] ),
	pilotOnPress: PropTypes.func,
	imageSource: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] )
};

CommentHeaderView.defaultProps = {
	testID: 'commentHeaderView-component',
	optionsOnPress: null,
	pilotOnPress: () => {},
	imageSource: null
};

export default CommentHeaderView;
