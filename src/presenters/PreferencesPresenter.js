import { DeviceEventEmitter } from 'react-native';
import PreferredAirportsPresenter from './PreferredAirportsPresenter';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import { DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL } from '../constants/modals';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import noop from '../helpers/noop';

export default class PreferencesPresenter {
	loading = false;

	constructor( {
		makeAutoObservable,
		rootStore,
		navigation,
		modalService,
		snackbarService,
		getCurrentPilotFromStore,
		updatePilotAirports,
		analyticsService
	} = {} ) {
		this.navigation = navigation;
		this.rootStore = rootStore;
		this.modalService = modalService;
		this.snackbarService = snackbarService;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.updatePilotAirports = updatePilotAirports;
		this.analyticsService = analyticsService;

		this.preferredAirportsPresenter = new PreferredAirportsPresenter( {
			pilot: this.pilot,
			snackbarService,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	onBackArrowPressed = () => {
		if ( this._hasChangedPreferredAirports ) {
			return this._openDiscardChangesModal();
		}
		return this._navigateBack();
	}

	get placeholderText() {
		return 'Enter each airport\'s ICAO code one at a time';
	}

	get rightActionHeaderText() {
		return 'Save';
	}

	get headerTitleText() {
		return 'My preferences';
	}

	get subHeaderText() {
		return 'To curate your feed, please enter up to 10 airports of interest.';
	}

	get pilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	get pilotHomeAirport() {
		return this.pilot.homeAirport;
	}

	get pilotHasHomeAirport() {
		return !!this.pilot.homeAirport;
	}

	get isLoading() {
		return this.loading;
	}

	get onSaveButtonPressed() {
		if ( this._hasChangedPreferredAirports ) {
			return this._onSaveChanges;
		}
		return noop;
	}

	get _hasChangedPreferredAirports() {
		return this.preferredAirportsPresenter.preferredAirportsHaveChanged;
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._navigateBack(),
			confirmationModal: DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}

	_navigateBack() {
		return this.navigation.goBack();
	}

	_setIsLoading( isLoading ) {
		this.loading = isLoading;
	}

	_onSaveChanges = async () => {
		try {
			this._setIsLoading( true );
			await this.updatePilotAirports.execute(
				{ preferredAirports: this.preferredAirportsPresenter.preferredAirports }
			);
			DeviceEventEmitter.emit( 'updateMyFeedList' );
			this.analyticsService.logSavePreferredAirports( {
				hasNewPreferredAirports: this.preferredAirportsPresenter.hasNewPreferredAirports
			} );
			this._navigateBack();
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setIsLoading( false );
		}
	}
}
