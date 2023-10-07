import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { styles } from '../Members.styles';
import MemberHeaderView from '../../../components/HeaderView/MemberHeaderView';
import { chatNewMessage } from '../../../assets/icons';

const MemberItem = ( { pilotInfoPresenter } ) => (
	<View style={styles.separatorItems}>
		<MemberHeaderView
			testID="member-component"
			pilotName={pilotInfoPresenter.pilotName}
			primaryAircraftMakeAndModel={pilotInfoPresenter.makeAndModel}
			homeAirport={pilotInfoPresenter.homeAirport}
			imageSource={pilotInfoPresenter.pilotProfilePictureThumbnailSource}
			pilotOnPress={pilotInfoPresenter.pilotWasPressed}
			rightAction={{
				imageSource: !pilotInfoPresenter.isCurrentPilot && chatNewMessage,
				onPress: pilotInfoPresenter.onSendMessagePress
			}}
		/>
	</View>
);

MemberItem.propTypes = {
	pilotInfoPresenter: PropTypes.shape( {
		pilotName: PropTypes.string.isRequired,
		makeAndModel: PropTypes.string.isRequired,
		homeAirport: PropTypes.string.isRequired,
		pilotProfilePictureThumbnailSource: PropTypes
			.oneOfType( [ PropTypes.string, PropTypes.object ] ),
		pilotWasPressed: PropTypes.func.isRequired,
		onSendMessagePress: PropTypes.func.isRequired,
		isCurrentPilot: PropTypes.bool.isRequired
	} ).isRequired
};

export default observer( MemberItem );
