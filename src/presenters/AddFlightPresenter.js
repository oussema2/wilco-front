import Form from '../forms/Form';
import fields from '../forms/postFields';
import {
	FLIGHT
} from '../constants/formFields/postForm';
import spliceIntoChunks from '../helpers/spliceIntoChunks';
import AircraftSelectionPresenter from './AircraftSelectionPresenter';
import SelectableListPresenter from './SelectableListPresenter';
import FlightFormPresenter from './FlightFormPresenter';
import FlightToDisplay from '../entitiesToDisplay/FlightsToDisplay';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import { DISCARD_CHANGES_CONFIRMATION_MODAL } from '../constants/modals';

export default class AddFlightPresenter {
	constructor( {
		getCurrentPilotFromStore,
		fetchAircraftFlights,
		getFlightTrack,
		deleteAircraft,
		navigation,
		modalService,
		actionSheetService,
		snackbarService,
		analyticsService,
		previousScreen,
		makeAutoObservable
	} = {} ) {
		this.scrollToFlightsSection = false;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.fetchAircraftFlights = fetchAircraftFlights;
		this.getFlightTrack = getFlightTrack;
		this.modalService = modalService;
		this.previousScreen = previousScreen;
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;
		this.form = new Form( { fields } );

		this.flightFormPresenter = new FlightFormPresenter( {
			form: this.form.$( FLIGHT ),
			modalService,
			makeAutoObservable
		} );

		this.aircraftSelectionPresenter = new AircraftSelectionPresenter( {
			pilot: this._pilot,
			previousScreen: AUTHENTICATED_ROUTES.addFlight.name,
			deleteAircraft,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			onAircraftSelected: ( aircraft ) => this._aircraftWasSelected( aircraft ),
			onAircraftDeselected: () => this._aircraftWasDeselected(),
			makeAutoObservable
		} );

		this.flightListPresenter = new SelectableListPresenter( {
			items: this.aircraftFlights,
			onItemSelected: () => { this._toggleOffShowTrack(); this._toggleOffShowFlightForm(); },
			onItemDeselected: () => { this._toggleOffShowTrack(); this._toggleOffShowFlightForm(); },
			makeAutoObservable
		} );

		this._disableFlightForm();
		this._shouldShowFlightFormManually = false;
		this._shouldShowTrack = false;
		this._isLoadingFlights = false;
		this._isLoadingTrack = false;

		makeAutoObservable( this );
	}

	get buttonTitle() {
		return 'Add flight';
	}

	get isLoadingFlights() {
		return this._isLoadingFlights;
	}

	get isLoadingTrack() {
		return this._isLoadingTrack;
	}

	get isPostButtonDisabled() {
		return this._hasNotFlight || !this.form.isValid;
	}

	addAircraftButtonWasPressed = () => {
		this.aircraftSelectionPresenter.onAddAircraftButtonPressed();
	}

	get selectableAircrafts() {
		return this.aircraftSelectionPresenter.selectableAircrafts;
	}

	get selectedAircraftID() {
		return this.aircraftSelectionPresenter.selectedAircraftID;
	}

	onAircraftSelected( aircraftID ) {
		this._resetScrollToFlightsSection();
		this.aircraftSelectionPresenter.onAircraftPressed( aircraftID );

		this.flightListPresenter.setItems( this.aircraftFlights );
	}

	get selectedFlightID() {
		return this.flightListPresenter.selectedItemKey;
	}

	onFlightSelected( flightID ) {
		this.flightListPresenter.onItemPressed( flightID );
	}

	get shouldShowFlightForm() {
		return this._selectedAircraft
				&& ( !this._selectedAircraft.hasTailNumber || this.shouldShowFlightFormManually );
	}

	get shouldShowAircraftFlights() {
		return this._selectedAircraft && this._selectedAircraft.hasTailNumber;
	}

	get aircraftFlights() {
		return this._selectedAircraft?.flights.map( ( flight ) => new FlightToDisplay( { flight } )
		) || [];
	}

	get aircraftFlightsToPresent() {
		return spliceIntoChunks( this.aircraftFlights, 5 );
	}

	get shouldShowTrackSwitch() {
		return !!this.selectedFlightID && this._selectedAircraft.hasTailNumber;
	}

	get shouldShowFlightFormSwitch() {
		return this._selectedAircraft?.hasTailNumber;
	}

	get shouldShowTrack() {
		return this._shouldShowTrack;
	}

	get shouldShowFlightFormManually() {
		return this._shouldShowFlightFormManually;
	}

	get trackSource() {
		if ( !this._selectedFlight?.track ) return null;
		return this._selectedFlight.track.trackSource;
	}

	toggleShowTrack = () => {
		if ( this._shouldShowTrack ) {
			this._toggleOffShowTrack();
		} else {
			this._toggleOnShowTrack();
		}
	}

	toggleFlightFormManually = () => {
		if ( this._shouldShowFlightFormManually ) {
			this._toggleOffShowFlightForm();
		} else {
			this._toggleOnShowFlightForm();
		}
	}

	onAircraftOptionsPressed = ( aircraftID ) => {
		this.aircraftSelectionPresenter.onAircraftOptionsPressed( aircraftID );
	}

	clear = () => {
		this.form.clear();
	};

	get isLoading() {
		return this.isLoadingFlights || this.isLoadingTrack;
	}

	get _pilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	_getSubmissionFlightParams( flight ) {
		if ( !this._isSubmittingFlight ) return null;
		return this._isManuallySubmittingFlight
			? this._getManualSubmissionFlightParams( flight )
			: this._getSelectedFlightParams();
	}

	_getManualSubmissionFlightParams( flight ) {
		return {
			...flight,
			aircraftId: this.selectedAircraftID
		};
	}

	_getSelectedFlightParams() {
		return {
			...this._selectedFlight,
			track: this._getSubmissionTrack()
		};
	}

	_getSubmissionTrack() {
		if ( this.shouldShowTrack && this._selectedFlight?.hasTrack ) {
			return this._selectedFlight.track.trackBase64;
		}
		return undefined;
	}

	_toggleOnShowTrack() {
		this._shouldShowTrack = true;
		this._trackWasToggledOn();
	}

	_toggleOffShowTrack() {
		this._shouldShowTrack = false;
	}

	_toggleOnShowFlightForm() {
		this.flightListPresenter.clearSelection();
		this._shouldShowFlightFormManually = true;
		this.flightFormPresenter.enable();
	}

	_toggleOffShowFlightForm() {
		this._shouldShowFlightFormManually = false;
		this.flightFormPresenter.disable();
	}

	_navigateBack() {
		this.navigation.goBack();
	}

	onSaveButtonPressed = () => {
		const { flight } = this.form.values();
		const flightData = {
			flightParams: this._getSubmissionFlightParams( flight ),
			selectedFlight: this.flightListPresenter.selectedItem,
			aircraft: this.aircraftSelectionPresenter.selectedAircraft,
			hasSelectedFlight: this._isSubmittingSelectedFlight,
			hasManualFlight: this._isManuallySubmittingFlight
		};

		this.navigation.navigate(
			this.previousScreen,
			{ flightData }
		);
	}

	onBackArrowPressed = () => {
		if ( this._wasAnythingFilled ) return this._openDiscardChangesModal();
		return this._navigateBack();
	}

	_setScrollToFlightsSection( value ) {
		this.scrollToFlightsSection = value;
	}

	_resetScrollToFlightsSection( ) {
		this.scrollToFlightsSection = false;
	}

	async _aircraftWasSelected( aircraft ) {
		this.flightListPresenter.clearSelection();
		if ( aircraft.hasTailNumber ) {
			this._disableFlightForm();
			await this._fetchFlights( aircraft );
			this.flightListPresenter.setItems( aircraft.flights.map(
				( flight ) => new FlightToDisplay( { flight } ) )
			);
			this._setScrollToFlightsSection( true );
		} else {
			this.flightFormPresenter.enable();
		}
	}

	async _fetchFlights( aircraft ) {
		if ( aircraft.hasFlights ) return;
		try {
			this._setIsLoadingFlights( true );
			await this.fetchAircraftFlights.execute( aircraft );
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setIsLoadingFlights( false );
		}
	}

	_aircraftWasDeselected() {
		this.flightListPresenter.clearSelection();
		this._disableFlightForm();
	}

	async _trackWasToggledOn() {
		if ( !this._selectedFlight.hasTrack ) {
			try {
				this._setIsLoadingTrack( true );
				await this.getFlightTrack.execute( { flight: this._selectedFlight } );
			} catch ( e ) {
				displayErrorInSnackbar( e, this.snackbarService );
				this.toggleShowTrack();
			} finally {
				this._setIsLoadingTrack( false );
			}
		}
	}

	_disableFlightForm() {
		this.flightFormPresenter.disable();
	}

	get _selectedAircraft() {
		return this.aircraftSelectionPresenter.selectedAircraft;
	}

	get _selectedFlight() {
		return this.flightListPresenter.selectedItem?.flight;
	}

	get _isManuallySubmittingFlight() {
		return this._isSubmittingFlight
				&& ( !this._selectedAircraft.hasTailNumber || this.shouldShowFlightFormManually );
	}

	get _isSubmittingSelectedFlight() {
		return this._isSubmittingFlight && !this._isManuallySubmittingFlight;
	}

	get _isSubmittingFlight() {
		return !!this._selectedAircraft;
	}

	get _hasNotFlight() {
		return this.selectedFlightID === null
			&& this.flightFormPresenter.isDisabled;
	}

	_setIsLoadingFlights( isLoadingFlights ) {
		this._isLoadingFlights = isLoadingFlights;
	}

	_setIsLoadingTrack( isLoadingTrack ) {
		this._isLoadingTrack = isLoadingTrack;
	}

	get _wasAnythingFilled() {
		return this.selectedAircraftID != null;
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._navigateBack(),
			confirmationModal: DISCARD_CHANGES_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}
}
