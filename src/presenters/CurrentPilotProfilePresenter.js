import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import { settings } from '../assets/icons';

export default class CurrentPilotProfilePresenter {
	constructor( { navigation, getCurrentPilotFromStore } ) {
		this.isLoading = false;
		this.navigation = navigation;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
	}

	get navigationBarTitle() {
		return 'My profile';
	}

	get pilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	get noBasicInfoText() {
		return 'Can’t see much here.\nComplete your profile!';
	}

	get emptyLatestFlightsText() {
		return 'You have not shared any flights yet.';
	}

	get emptyCredentialsText() {
		return 'You have added no credentials in your profile.';
	}

	get emptyCommunitiesText() {
		return 'You have no communities in your profile.';
	}

	get emptyRolesText() {
		return 'You have not selected any GA roles yet.';
	}

	get emptyPostsText() {
		return 'You have not posted anything yet.';
	}

	get emptyTotalHoursText() {
		return 'You have added no flight hours in your profile.';
	}

	get editProfileButtonWasPressed() {
		return () => {
			this.navigation.navigate( AUTHENTICATED_ROUTES.editPilotProfileStack.name );
		};
	}

	get headerRightButtonWasPressed() {
		return () => {
			this.navigation.navigate( AUTHENTICATED_ROUTES.settings.name );
		};
	}

	get headerRightImageSource() {
		return settings;
	}

	get shareFlightButtonWasPressed() {
		return () => {
			this.navigation.navigate( AUTHENTICATED_ROUTES.postTextStack.name );
		};
	}

	get sharePostsButtonWasPressed() {
		return () => {
			this.navigation.navigate( AUTHENTICATED_ROUTES.postTextStack.name );
		};
	}
}
