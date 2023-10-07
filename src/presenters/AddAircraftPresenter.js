import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import AircraftFormPresenter from './AircraftFormPresenter';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import { CANCEL_AIRCRAFT_CONFIRMATION_MODAL } from '../constants/modals';
import { MAKE_AND_MODEL, TAIL_NUMBER } from '../constants/formFields/aircraftForm';

export default class AddAircraftPresenter {
	loading = false;

	constructor( {
		navigation,
		snackbarService,
		createAircraft,
		previousScreen,
		analyticsService,
		modalService,
		makeAutoObservable
	} = {} ) {
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;
		this.createAircraft = createAircraft;
		this.previousScreen = previousScreen;
		this.modalService = modalService;

		this._formPresenter = new AircraftFormPresenter( {
			onSubmitSuccess: this.onSubmitSuccess,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	get title() {
		return 'Add an aircraft';
	}

	get submitButtonTitle() {
		return 'Add aircraft';
	}

	get isSubmitButtonDisabled() {
		return this._formPresenter.isSubmitButtonDisabled;
	}

	get form() {
		return this._formPresenter.form;
	}

	onSubmitSuccess = async ( form ) => {
		if ( !this.isLoading ) {
			this._setIsLoading( true );
			const { makeAndModel, tailNumber } = form.values();
			const base64Picture = this._formPresenter.avatarBase64;
			try {
				const aircraft = await this._createAircraft( { makeAndModel, tailNumber, base64Picture } );
				this.analyticsService.logNewAircraft( { previousScreen: this.previousScreen } );
				this._navigateBack( aircraft.id );
			} catch ( error ) {
				displayErrorInSnackbar( error, this.snackbarService );
			} finally {
				this._setIsLoading( false );
			}
		}
	}

	onAvatarChange = ( asset ) => {
		this._formPresenter.onAvatarChange( asset );
	}

	get avatarSource() {
		return this._formPresenter.avatarSource;
	}

	backButtonWasPressed = () => {
		if ( this._hasNeitherMakeAndModelTailNumberNorPhoto ) this._navigateBack();
		else { this._openDiscardChangesModal(); }
	}

	get isLoading() {
		return this.loading;
	}

	_navigateBack( newAircraftId ) {
		this.navigation.navigate( this.previousScreen, { newAircraftId } );
	}

	_createAircraft( params ) {
		return this.createAircraft.execute( params );
	}

	_setIsLoading( isLoading ) {
		this.loading = isLoading;
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._navigateBack(),
			confirmationModal: CANCEL_AIRCRAFT_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}

	get _hasNeitherMakeAndModelTailNumberNorPhoto() {
		return !this.form.$( MAKE_AND_MODEL ).value
				&& !this.form.$( TAIL_NUMBER ).value
				&& this._formPresenter.newAircraftPhoto === null;
	}
}
