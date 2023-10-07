import { action } from 'mobx';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';

const pilotProfileRoute = AUTHENTICATED_ROUTES.pilotProfile.name;

const _isCurrentPilot = ( pilotId, getCurrentPilotFromStore ) => pilotId
		=== getCurrentPilotFromStore.execute().id;

const _navigateToProfile = ( navigation, options ) => {
	navigation.push( pilotProfileRoute, { ...options, enableBackButton: true } );
};

const _navigateToOtherPilotProfile = ( navigation, pilotId ) => {
	_navigateToProfile( navigation, { pilotId } );
};

const _navigateToMyProfile = ( navigation ) => {
	_navigateToProfile( navigation );
};

const navigateToPilotProfile = ( { navigation, getCurrentPilotFromStore, pilotId } ) => {
	if ( _isCurrentPilot( pilotId, getCurrentPilotFromStore ) ) {
		_navigateToMyProfile( navigation );
	} else {
		_navigateToOtherPilotProfile( navigation, pilotId );
	}
};

export default action( navigateToPilotProfile );
