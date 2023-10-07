import React from 'react';
import PropTypes from 'prop-types';
import HeaderView from './HeaderView';

const PostHeaderView = ( {
	testID, pilotName, dateToDisplay, optionsOnPress, pilotOnPress, imageSource, privacy, edited,
	showStar
} ) => (
	<HeaderView
		testID={testID}
		pilotName={pilotName}
		bodyInfo={dateToDisplay}
		optionsOnPress={optionsOnPress}
		pilotOnPress={pilotOnPress}
		imageSource={imageSource}
		bodySecondaryInfo={privacy}
		bodyTertiaryInfo={edited && 'Edited'}
		showStar={showStar}
	/>
);

PostHeaderView.propTypes = {
	testID: PropTypes.string,
	pilotName: PropTypes.string.isRequired,
	dateToDisplay: PropTypes.string.isRequired,
	optionsOnPress: PropTypes.oneOfType( [ PropTypes.func, PropTypes.oneOf( [ false ] ) ] ),
	pilotOnPress: PropTypes.func,
	imageSource: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ),
	privacy: PropTypes.any,
	edited: PropTypes.bool,
	showStar: PropTypes.bool
};

PostHeaderView.defaultProps = {
	testID: 'postHeaderView-component',
	optionsOnPress: null,
	pilotOnPress: () => {},
	imageSource: null,
	privacy: null,
	edited: false,
	showStar: false
};

export default PostHeaderView;
