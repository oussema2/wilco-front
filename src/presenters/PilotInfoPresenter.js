import { AIRCRAFT_PICKER_MODAL } from '../constants/modals';
import { PRIMARY_AIRCRAFT_ID } from '../constants/formFields/editProfileForm';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import AircraftSelectionPresenter from './AircraftSelectionPresenter';
import navigateToPilotProfile from './Helpers/navigateToPilotProfile';
import navigateToChatConversation from './Helpers/navigateToChatConversation';

export default class PilotInfoPresenter {
	constructor( {
		pilot,
		deleteAircraft,
		onAircraftDeleted = () => {},
		navigation,
		modalService,
		actionSheetService,
		snackbarService,
		analyticsService,
		getCurrentPilotFromStore,
		form,
		makeAutoObservable
	} = {} ) {
		this.pilot = pilot;
		this.navigation = navigation;
		this.modalService = modalService;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.form = form;

		this.aircraftSelectionPresenter = new AircraftSelectionPresenter( {
			pilot,
			previousScreen: AUTHENTICATED_ROUTES.editPilotProfile.name,
			deleteAircraft,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			onAircraftDeleted,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	get aircrafts() {
		return this.aircraftSelectionPresenter.selectableAircrafts;
	}

	get homeAirport() {
		return this.pilot.homeAirport || '';
	}

	get makeAndModel() {
		return this.pilot.primaryAircraft?.makeAndModel || '';
	}

	get selectedPrimaryAircraftMakeAndModel() {
		return this._selectedPrimaryAircraft?.makeAndModel || '';
	}

	get pilotName() {
		return this.pilot.name;
	}

	get pilotProfilePictureSource() {
		return this.pilot.profilePictureSource;
	}

	get pilotProfilePictureThumbnailSource() {
		return this.pilot.profilePictureThumbnailSource;
	}

	pilotWasPressed = () => {
		navigateToPilotProfile( {
			navigation: this.navigation,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			pilotId: this.pilot.id
		} );
	}

	addAircraftButtonWasPressed = () => {
		this.aircraftSelectionPresenter.onAddAircraftButtonPressed();
	}

	primaryAircraftInputWasPressed = () => {
		this.modalService.open(
			AIRCRAFT_PICKER_MODAL, {
				aircrafts: this.aircrafts,
				initialAircraft: this._selectedPrimaryAircraft,
				onAircraftSelected: this._selectPrimaryAircraftAndCloseModal
			}
		);
	}

	aircraftOptionsWerePressed = ( aircraftID ) => {
		this.aircraftSelectionPresenter.onAircraftOptionsPressed( aircraftID );
	}

	get _selectedPrimaryAircraft() {
		return this.aircrafts.find( ( aircraft ) => aircraft.id === this._selectedPrimaryAircraftId );
	}

	get _selectedPrimaryAircraftId() {
		return this.form.$( PRIMARY_AIRCRAFT_ID ).value;
	}

	_selectPrimaryAircraftAndCloseModal = ( aircraft ) => {
		if ( aircraft ) this.form.set( { primaryAircraftId: aircraft.id } );
		this.modalService.close( AIRCRAFT_PICKER_MODAL );
	}

	get currentPilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	get isCurrentPilot() {
		return this.currentPilot.id === this.pilot.id;
	}

	onSendMessagePress = () => {
		navigateToChatConversation( {
			navigation: this.navigation,
			currentChatUid: this.currentPilot.cometchatUid,
			recipientChatUid: this.pilot.cometchatUid
		} );
	}
}
