import React from 'react';
import PropTypes from 'prop-types';

import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';

const CreatePostHeader = ( { rightButton } ) => (
	<ScreenHeader
		testID="title-header"
		title="Create post"
		rightButton={rightButton}
	/>
);

CreatePostHeader.propTypes = {
	rightButton: PropTypes.shape( {
		title: PropTypes.string,
		onPress: PropTypes.func
	} ).isRequired
};

export default CreatePostHeader;
