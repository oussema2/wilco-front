import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import ConfirmableActionPresenterBuilder from './Builders/ConfirmableActionPresenterBuilder';
import SelectableListPresenter from './SelectableListPresenter';

export default class AircraftSelectionPresenter {
	constructor( {
		pilot,
		previousScreen,
		deleteAircraft,
		navigation,
		modalService,
		actionSheetService,
		snackbarService,
		analyticsService,
		onAircraftSelected = () => {},
		onAircraftDeselected = () => {},
		onAircraftDeleted = () => {},
		makeAutoObservable
	} ) {
		this._pilot = pilot;
		this._previousScreen = previousScreen;
		this._deleteAircraft = deleteAircraft;
		this._navigation = navigation;
		this._modalService = modalService;
		this._actionSheetService = actionSheetService;
		this._snackbarService = snackbarService;
		this._analyticsService = analyticsService;
		this._onAircraftDeleted = onAircraftDeleted;

		this._aircraftList = new SelectableListPresenter( {
			items: this.selectableAircrafts,
			onItemSelected: onAircraftSelected,
			onItemDeselected: onAircraftDeselected,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	get selectableAircrafts() {
		return this._pilot.aircrafts;
	}

	get selectedAircraftID() {
		return this._aircraftList.selectedItemKey;
	}

	get selectedAircraft() {
		return this._aircraftList.selectedItem;
	}

	onAircraftPressed( aircraftID ) {
		this._aircraftList.onItemPressed( aircraftID );
	}

	onAddAircraftButtonPressed() {
		this._navigation.navigate( AUTHENTICATED_ROUTES.addAircraft.name, {
			previousScreen: this._previousScreen
		} );
	}

	onAircraftOptionsPressed( aircraftID ) {
		this._actionSheetService.open( {
			actions: [
				{
					title: 'Delete aircraft',
					type: 'destructive',
					onPress: () => this._deleteAircraftButtonWasPressed( aircraftID )
				},
				{
					title: 'Edit aircraft',
					type: 'default',
					onPress: () => this._editAircraftButtonWasPressed( aircraftID )
				}
			]
		} );
	}

	_deleteAircraftButtonWasPressed( aircraftId ) {
		ConfirmableActionPresenterBuilder.forDeleteAircraft( {
			aircraftId,
			deleteAircraft: this._deleteAircraft,
			onSuccess: () => this._onAircraftDeletedSuccessfully( aircraftId ),
			modalService: this._modalService,
			snackbarService: this._snackbarService
		} ).trigger();
	}

	_onAircraftDeletedSuccessfully( aircraftId ) {
		if ( this.selectedAircraftID === aircraftId ) {
			this._aircraftList.clearSelection();
		}
		this._analyticsService.logDeleteAircraft();
		this._onAircraftDeleted( aircraftId );
	}

	_editAircraftButtonWasPressed( aircraftId ) {
		this._navigation.navigate(
			AUTHENTICATED_ROUTES.editAircraft.name,
			{
				aircraftId,
				previousScreen: this._previousScreen
			}
		);
	}
}
