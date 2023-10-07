import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import {
	LOG_OUT_CONFIRMATION_MODAL
} from '../constants/modals';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export default class SettingsPresenter {
	constructor( {
		makeAutoObservable,
		navigation,
		rootStore,
		modalService,
		logOutUser,
		helpCenterService
	} = {} ) {
		this.navigation = navigation;
		this.rootStore = rootStore;
		this.modalService = modalService;
		this.logOutUser = logOutUser;
		this.helpCenterService = helpCenterService;
		makeAutoObservable( this );
	}

	get backButtonWasPressed() {
		return () => this.navigation.goBack();
	}

	logOutWasPressed = () => {
		new ConfirmableActionPresenter( {
			action: () => this._logOut(),
			confirmationModal: LOG_OUT_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}

	deleteAccountWasPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.deleteAccount.name );
	}

	helpWasPressed = () => this
		.helpCenterService
		.showMessageComposer();

	invitePeopleWasPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.invitePeople.name );
	}

	_logOut() {
		try {
			this.logOutUser.execute();
		} catch ( error ) {
		}
	}
}
