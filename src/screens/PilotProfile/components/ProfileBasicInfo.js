import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import ProfileBasicInfoFilled from './ProfileBasicInfoFilled';
import ProfileBasicInfoEmpty from './ProfileBasicInfoEmpty';

const ProfileBasicInfo = ( { presenter } ) => (
	presenter.hasBasicInfo
		? <ProfileBasicInfoFilled presenter={presenter} />
		: <ProfileBasicInfoEmpty presenter={presenter} />
);

ProfileBasicInfo.propTypes = {
	presenter: PropTypes.shape( {
		hasBasicInfo: PropTypes.bool.isRequired
	} ).isRequired
};

export default observer( ProfileBasicInfo );
