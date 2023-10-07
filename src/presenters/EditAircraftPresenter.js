import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import AircraftFormPresenter from './AircraftFormPresenter';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import {
	DISCARD_CHANGES_CONFIRMATION_MODAL
} from '../constants/modals';

export default class EditAircraftPresenter {
	loading = false;

	constructor( {
		aircraftId,
		previousScreen,
		getAircraftFromStore,
		updateAircraft,
		navigation,
		snackbarService,
		analyticsService,
		modalService,
		makeAutoObservable
	} = {} ) {
		this._aircraftId = aircraftId;
		this._previousScreen = previousScreen;
		this._getAircraftFromStore = getAircraftFromStore;
		this._updateAircraft = updateAircraft;
		this._navigation = navigation;
		this._snackbarService = snackbarService;
		this._analyticsService = analyticsService;
		this._modalService = modalService;

		this._formPresenter = new AircraftFormPresenter( {
			initialValues: {
				makeAndModel: this._aircraft.makeAndModel,
				tailNumber: this._aircraft.tailNumber || '',
				photoUri: this._aircraft.pictureUrl
			},
			onSubmitSuccess: this.onSubmitSuccess,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	get title() {
		return 'Edit aircraft';
	}

	get submitButtonTitle() {
		return 'Save changes';
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
				await this._updateAircraft.execute( this._aircraftId,
					{ makeAndModel, tailNumber, base64Picture } );
				this._logEditAircraft();
				this._displaySuccessMessage();
				this._navigateBack();
			} catch ( error ) {
				displayErrorInSnackbar( error, this._snackbarService );
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
		if ( !this._formPresenter._formIsDirty ) this._navigateBack();
		else { this._openDiscardChangesModal(); }
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._navigateBack(),
			confirmationModal: DISCARD_CHANGES_CONFIRMATION_MODAL,
			modalService: this._modalService
		} ).trigger();
	}

	get isLoading() {
		return this.loading;
	}

	get _aircraft() {
		return this._getAircraftFromStore.execute( this._aircraftId );
	}

	_logEditAircraft() {
		this._analyticsService.logEditAircraft( { previousScreen: this._previousScreen } );
	}

	_displaySuccessMessage() {
		this._snackbarService.showInfo( { message: 'Aircraft changes saved.' } );
	}

	_navigateBack() {
		this._navigation.navigate( this._previousScreen );
	}

	_setIsLoading( isLoading ) {
		this.loading = isLoading;
	}
}
