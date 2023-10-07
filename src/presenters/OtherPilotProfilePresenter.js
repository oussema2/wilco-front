import { meatballsMenu } from '../assets/icons';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import {
	BLOCK_USER_CONFIRMATION_MODAL
} from '../constants/modals';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import navigateToChatConversation from './Helpers/navigateToChatConversation';

export default class OtherPilotProfilePresenter {
	constructor( {
		pilotId,
		navigation,
		getPilotFromStore,
		fetchPilotFromRemote,
		actionSheetService,
		modalService,
		snackbarService,
		blockUser,
		getCurrentPilotFromStore,
		makeAutoObservable
	} ) {
		this._isBlockingUser = false;
		this._isFetchingUser = false;
		this._pilotId = pilotId;
		this.navigation = navigation;
		this.getPilotFromStore = getPilotFromStore;
		this.fetchPilotFromRemote = fetchPilotFromRemote;
		this.actionSheetService = actionSheetService;
		this.modalService = modalService;
		this.snackbarService = snackbarService;
		this.blockUser = blockUser;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;

		this._fetchPilot();

		makeAutoObservable( this );
	}

	get navigationBarTitle() {
		return `${this.pilot.firstName}'s profile`;
	}

	get pilot() {
		// eslint-disable-next-line radix
		return !this.isLoading && this.getPilotFromStore.execute( parseInt( this._pilotId ) );
	}

	get noBasicInfoText() {
		return 'Can’t see much.\nThis user lacks some info here.';
	}

	get emptyLatestFlightsText() {
		return 'This user has not shared any flights yet.';
	}

	get emptyCredentialsText() {
		return 'This user has not entered any credentials yet.';
	}

	get emptyCommunitiesText() {
		return 'This user has not identified any communities yet.';
	}

	get emptyRolesText() {
		return 'This user has not selected any GA role yet.';
	}

	get emptyPostsText() {
		return 'This user has not posted yet.';
	}

	get emptyTotalHoursText() {
		return 'This user has not added flight hours yet.';
	}

	get headerRightImageSource() {
		return meatballsMenu;
	}

	get headerRightButtonWasPressed() {
		return () => {
			this.actionSheetService.open( {
				actions: this._actionSheetOptions
			} );
		};
	}

	get _actionSheetOptions() {
		return [
			{
				title: 'Report User',
				onPress: this._reportUserButtonWasPressed
			},
			{
				title: 'Block User',
				type: 'destructive',
				onPress: this._blockUserButtonWasPressed
			}
		];
	}

	_blockUserButtonWasPressed = () => {
		new ConfirmableActionPresenter( {
			action: () => {
				this._onBlockUser();
			},
			confirmationModal: BLOCK_USER_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}

	_reportUserButtonWasPressed = () => {
		this.navigation.navigate(
			AUTHENTICATED_ROUTES.reportUser.name,
			{ pilotId: this._pilotId }
		);
	}

	async _onBlockUser() {
		try {
			this._setIsBlockingUser( true );
			await this.blockUser.execute( this._pilotId );
			this.navigation.goBack();
			this._displayBlockUserSuccessMessage();
		} catch ( e ) {
			displayErrorInSnackbar( e, this.snackbarService );
		} finally {
			this._setIsBlockingUser( false );
		}
	}

	_displayBlockUserSuccessMessage() {
		this.snackbarService.showInfo( { message: 'The user was blocked.' } );
	}

	get isLoading() {
		return this._isBlockingUser || this._isFetchingUser;
	}

	_setIsBlockingUser( value ) {
		this._isBlockingUser = value;
	}

	_setIsFetchingUser( value ) {
		this._isFetchingUser = value;
	}

	async _fetchPilot() {
		try {
			if ( !this.pilot ) this._setIsFetchingUser( true );
			await this.fetchPilotFromRemote.execute( this._pilotId );
		} catch ( e ) {
			displayErrorInSnackbar( e, this.snackbarService );
			this.navigation.goBack();
		} finally {
			this._setIsFetchingUser( false );
		}
	}

	get _currentPilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	get onSendMessageButtonPressed() {
		return () => {
			navigateToChatConversation( {
				navigation: this.navigation,
				currentChatUid: this._currentPilot.cometchatUid,
				recipientChatUid: this.pilot.cometchatUid
			} );
		};
	}
}
