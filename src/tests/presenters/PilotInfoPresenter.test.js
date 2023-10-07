import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import PilotFactory from '../factories/PilotFactory';
import AircraftFactory from '../factories/AircraftFactory';
import PilotInfoPresenter from '../../presenters/PilotInfoPresenter';
import noop from '../../helpers/noop';
import Form from '../../forms/Form';
import fields from '../../forms/editProfileFields';
import { AIRCRAFT_PICKER_MODAL } from '../../constants/modals';
import { PRIMARY_AIRCRAFT_ID } from '../../constants/formFields/editProfileForm';
import { aircraftOptionsExamples } from '../sharedExamples/aircraftOptions';

describe( 'PilotInfoPresenter', () => {
	const form = new Form( { fields, hooks: {} } );
	let presenter;
	const pilot = PilotFactory.build();
	const deleteAircraft = { execute: jest.fn() };
	const onAircraftDeleted = jest.fn();
	const navigation = { navigate: jest.fn(), push: jest.fn() };
	const modalService = { open: jest.fn(), close: jest.fn() };
	const actionSheetService = { open: jest.fn() };
	const snackbarService = { showInfo: jest.fn(), showError: jest.fn() };
	const analyticsService = { logDeleteAircraft: jest.fn() };
	let getCurrentPilotFromStore = { execute: jest.fn( ( ) => pilot ) };

	const createPresenter = ( currentPilotFromStore ) => new PilotInfoPresenter( {
		pilot,
		deleteAircraft,
		onAircraftDeleted,
		navigation,
		modalService,
		actionSheetService,
		snackbarService,
		analyticsService,
		getCurrentPilotFromStore: currentPilotFromStore,
		form,
		makeAutoObservable: noop
	} );

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = createPresenter( getCurrentPilotFromStore );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.form ).toEqual( form );
			expect( presenter.pilot ).toEqual( pilot );
		} );
	} );

	describe( '@aircrafts', () => {
		it( 'returns the pilot\'s aircrafts', () => {
			expect( presenter.aircrafts ).toBe( pilot.aircrafts );
		} );
	} );

	describe( '@selectedPrimaryAircraftMakeAndModel', () => {
		it( 'returns the make and model', () => {
			const newPrimaryAircraft = pilot.aircrafts[ 1 ];
			presenter.form.set( { primaryAircraftId: newPrimaryAircraft.id } );

			const expectedMakeAndModel = newPrimaryAircraft.makeAndModel;

			expect( presenter.selectedPrimaryAircraftMakeAndModel ).toBe( expectedMakeAndModel );
		} );
	} );

	describe( '@addAircraftButtonWasPressed', () => {
		it( 'navigates to the add aircraft screen', () => {
			presenter.addAircraftButtonWasPressed();

			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.addAircraft.name, {
				previousScreen: AUTHENTICATED_ROUTES.editPilotProfile.name
			} );
		} );
	} );

	describe( '@pilotWasPressed', () => {
		describe( 'when the pilot is the current pilot', () => {
			it( 'navigates to my profile screen', () => {
				presenter.pilotWasPressed();

				expect( navigation.push ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true }
				);
			} );
		} );

		describe( 'when the pilot is not the current pilot', () => {
			beforeEach( () => {
				const otherPilot = PilotFactory.build();
				const otherCurrentPilot = { id: otherPilot.id };
				presenter.getCurrentPilotFromStore = { execute: jest.fn( ( ) => otherCurrentPilot ) };
			} );

			it( 'navigates to the pilot profile screen', () => {
				presenter.pilotWasPressed();

				expect( navigation.push ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true, pilotId: pilot.id }
				);
			} );
		} );
	} );

	aircraftOptionsExamples( {
		onAircraftOptionsPressed: ( aircraftId ) => presenter.aircraftOptionsWerePressed( aircraftId ),
		aircraftId: pilot.aircrafts[ 1 ].id,
		deleteAircraft,
		onAircraftDeleted,
		modalService,
		actionSheetService,
		snackbarService,
		analyticsService
	} );

	describe( '@primaryAircraftInputWasPressed', () => {
		it( 'opens the aircraft picker modal', () => {
			presenter.primaryAircraftInputWasPressed();
			expect( modalService.open ).toHaveBeenCalledWith(
				AIRCRAFT_PICKER_MODAL,
				expect.any( Object )
			);
		} );

		describe( 'when an aircraft is selected', () => {
			it( 'fills the form with the selected aircraft and closes the modal', () => {
				const newPrimaryAircraft = AircraftFactory.build();

				presenter.primaryAircraftInputWasPressed();
				const { onAircraftSelected } = modalService.open.mock.calls[ 0 ][ 1 ];

				onAircraftSelected( newPrimaryAircraft );

				expect( presenter.form.$( PRIMARY_AIRCRAFT_ID ).value ).toBe( newPrimaryAircraft.id );
				expect( modalService.close ).toHaveBeenCalledWith( AIRCRAFT_PICKER_MODAL );
			} );
		} );
	} );

	describe( '@pilotName', () => {
		it( 'returns the pilot name', () => {
			expect( presenter.pilotName ).toBe( pilot.name );
		} );
	} );

	describe( '@pilotProfilePictureSource', () => {
		it( 'returns the pilot profile picture source', () => {
			expect( presenter.pilotProfilePictureSource ).toStrictEqual( pilot.profilePictureSource );
		} );
	} );

	describe( '@pilotProfilePictureThumbnailSource', () => {
		it( 'returns the pilot profile picture thumbnail source', () => {
			expect( presenter.pilotProfilePictureThumbnailSource )
				.toStrictEqual( pilot.profilePictureThumbnailSource );
		} );
	} );

	describe( '@homeAirport', () => {
		it( 'returns the pilot home airport', () => {
			expect( presenter.homeAirport ).toBe( pilot.homeAirport || '' );
		} );
	} );

	describe( '@makeAndModel', () => {
		it( 'returns the pilot primary aircraft make and model', () => {
			expect( presenter.makeAndModel ).toBe( pilot.primaryAircraft.makeAndModel );
		} );
	} );

	describe( '@currentPilot', () => {
		it( 'call to getCurrenPilot interactor', () => {
			expect( presenter.currentPilot ).toBe( pilot );
		} );
	} );

	describe( '@isCurrentPilot', () => {
		describe( 'when current user is the logged user', () => {
			it( 'returns true', () => {
				expect( presenter.isCurrentPilot ).toBeTruthy();
			} );
		} );

		describe( 'when the current user is not the logged user', () => {
			beforeEach( () => {
				const otherPilot = PilotFactory.build();
				presenter.getCurrentPilotFromStore = { execute: jest.fn( ( ) => otherPilot ) };
			} );

			it( 'returns false', () => {
				expect( presenter.isCurrentPilot ).toBeFalsy();
			} );
		} );
	} );

	describe( '@onSendMessagePress', () => {
		it( 'navigates to chat conversation screen', () => {
			presenter.onSendMessagePress();
			expect( navigation.navigate )
				.toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.cometChatMessages.name,
					expect.any( Object )
				);
		} );
	} );
} );
