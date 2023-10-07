import React from 'react';
import PropTypes from 'prop-types';

import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';

const EditPostHeader = ( { rightButton } ) => (
	<ScreenHeader
		testID="title-header"
		title="Edit post"
		rightButton={rightButton}
	/>
);

EditPostHeader.propTypes = {
	rightButton: PropTypes.shape( {
		title: PropTypes.string,
		onPress: PropTypes.func
	} ).isRequired
};

export default EditPostHeader;
