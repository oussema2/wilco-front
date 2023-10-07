import React from 'react';
import PropTypes from 'prop-types';
import { Autolink as NativeAutoLink } from 'react-native-autolink';
import { palette } from '../../Theme';

const AutoLink = ( {
	text, testID, showAlert, style
} ) => (
	<NativeAutoLink
		testID={testID}
		text={text}
		linkStyle={{ color: palette.primary.default, fontWeight: 'bold' }}
		truncate={20}
		truncateLocation="end"
		showAlert={showAlert}
		style={style}
		url
	/>
);

AutoLink.propTypes = {
	testID: PropTypes.string,
	text: PropTypes.string,
	showAlert: PropTypes.bool,
	style: PropTypes.instanceOf( Object )
};

AutoLink.defaultProps = {
	testID: 'autolink-testID',
	text: '',
	showAlert: true,
	style: {}
};

export default AutoLink;
