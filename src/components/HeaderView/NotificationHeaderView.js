import React from 'react';
import PropTypes from 'prop-types';
import HeaderView from './HeaderView';

const NotificationHeaderView = ( {
	testID, notificationPresenter
} ) => (
	<HeaderView
		testID={testID}
		pilotName={notificationPresenter.pilotName}
		titleInfo={notificationPresenter.notificationAction}
		titleExtraInfo={notificationPresenter.dateToDisplay}
		imageSource={notificationPresenter.notificationPictureSource}
		pilotOnPress={notificationPresenter.notificationWasPressed}
	/>
);

NotificationHeaderView.propTypes = {
	testID: PropTypes.string,
	notificationPresenter: PropTypes.shape( {
		pilotName: PropTypes.string.isRequired,
		notificationAction: PropTypes.string.isRequired,
		dateToDisplay: PropTypes.string.isRequired,
		notificationPictureSource: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ),
		notificationWasPressed: PropTypes.func.isRequired
	} ).isRequired
};

NotificationHeaderView.defaultProps = {
	testID: 'postHeaderView-component'
};

export default NotificationHeaderView;
