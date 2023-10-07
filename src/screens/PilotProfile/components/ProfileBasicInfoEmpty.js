import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Avatar } from '../../../components/Avatar';
import { styles } from '../PilotProfile.styles';
import Pilot from '../../../entities/Pilot';
import { EmptyState } from '../../../components/EmptyState';
import { cloud } from '../../../assets/icons';

const ProfileBasicInfoEmpty = ( { presenter } ) => (
	<View style={styles.basicInfo}>
		<Avatar size="big" source={presenter.pilot.profilePictureSource} />
		<Text style={styles.userNameDisplay}>{presenter.pilot.name}</Text>
		<EmptyState source={cloud} text={presenter.noBasicInfoText} />
	</View>
);

ProfileBasicInfoEmpty.propTypes = {
	presenter: PropTypes.shape( {
		pilot: PropTypes.instanceOf( Pilot ).isRequired,
		noBasicInfoText: PropTypes.string.isRequired
	} ).isRequired
};

export default observer( ProfileBasicInfoEmpty );
