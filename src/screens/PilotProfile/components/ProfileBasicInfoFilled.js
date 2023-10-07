import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Avatar } from '../../../components/Avatar';
import { styles } from '../PilotProfile.styles';
import Pilot from '../../../entities/Pilot';
import { TextWithIcon } from '../../../components/TextWithIcon';
import { aircraft, airport } from '../../../assets/icons';

const ProfileBasicInfo = ( { presenter } ) => (
	<View style={styles.basicInfo}>
		<Avatar size="big" source={presenter.pilot.profilePictureSource} />
		<Text style={styles.userNameDisplay}>{presenter.pilot.name}</Text>
		<Text style={presenter.pilot.description ? styles.bannerDisplay : {}}>
			{ presenter.pilot.description }

		</Text>
		<View style={styles.pilotInfo}>
			{presenter.pilot.primaryAircraft && (
				<TextWithIcon icon={aircraft}>
					{
						presenter.pilot.primaryAircraft.makeAndModel
					}
				</TextWithIcon>
			)}
			{presenter.pilot.homeAirport && (
				<TextWithIcon icon={airport}>{presenter.pilot.homeAirport}</TextWithIcon>
			)}
		</View>
	</View>
);

ProfileBasicInfo.propTypes = {
	presenter: PropTypes.shape( {
		pilot: PropTypes.instanceOf( Pilot ).isRequired
	} ).isRequired
};

export default observer( ProfileBasicInfo );
