import MockRootStore from '../mocks/MockRootStore';
import PreferencesPresenter from '../../presenters/PreferencesPresenter';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import PilotFactory from '../factories/PilotFactory';
import PilotStore from '../../stores/PilotStore';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import { DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL } from '../../constants/modals';
import NetworkError from '../../errors/NetworkError';
import noop from '../../helpers/noop';

describe( 'PreferencesPresenter', () => {
	let store;
	let getCurrentPilotFromStore;
	const currentPilot = PilotFactory.build();
	const navigation = { goBack: jest.fn() };
	const makeAutoObservable = jest.fn();
	const rootStore = new MockRootStore();
	const modalService = { open: jest.fn(), close: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	const updatePilotAirports = { execute: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		store = new PilotStore();
		store.add( currentPilot );
		store.setCurrentPilotId( currentPilot.id );

		getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store } );

		presenter = new PreferencesPresenter( {
			makeAutoObservable,
			rootStore,
			navigation,
			modalService,
			snackbarService,
			getCurrentPilotFromStore,
			updatePilotAirports
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.rootStore ).toEqual( rootStore );
			expect( presenter.snackbarService ).toEqual( snackbarService );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			expect( presenter.isLoading ).toBe( false );
		} );
	} );

	describe( '@onBackArrowPressed()', () => {
		const itOpensConfirmationModalForDiscardingChanges = () => {
			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => presenter.onBackArrowPressed(),
				modal: DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL,
				actionExpect: () => {
					expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
				},
				modalService
			} );
		};

		describe( 'when no changes were made', () => {
			it( 'navigates back', () => {
				presenter.onBackArrowPressed();
				expect( navigation.goBack ).toHaveBeenCalled();
			} );
		} );

		describe( 'when the preferred airports were changed', () => {
			beforeEach( () => {
				presenter.preferredAirportsPresenter.addNewPreferredAirport( 'JFK' );
			} );
			itOpensConfirmationModalForDiscardingChanges();
		} );
	} );

	describe( '@placeholderText()', () => {
		it( 'returns placeholder text', () => {
			expect( presenter.placeholderText ).toBe( 'Enter each airport\'s ICAO code one at a time' );
		} );
	} );

	describe( '@rightActionHeaderText()', () => {
		it( 'returns placeholder text', () => {
			expect( presenter.rightActionHeaderText ).toBe( 'Save' );
		} );
	} );

	describe( '@headerTitleText()', () => {
		it( 'returns title text', () => {
			expect( presenter.headerTitleText ).toBe( 'My preferences' );
		} );
	} );

	describe( '@subHeaderText()', () => {
		it( 'returns sub header text', () => {
			expect( presenter.subHeaderText ).toBe( 'To curate your feed, please enter up to 10 airports of interest.' );
		} );
	} );

	describe( '@pilot', () => {
		it( 'returns the current pilot', () => {
			expect( presenter.pilot ).toBe( currentPilot );
		} );
	} );

	describe( '@pilotHomeAirport', () => {
		it( 'returns the Home Airport of current pilot', () => {
			expect( presenter.pilotHomeAirport ).toBe( currentPilot.homeAirport );
		} );
	} );

	describe( '@pilotHasHomeAirport', () => {
		describe( 'when current pilot has home airport', () => {
			it( 'returns true', () => {
				expect( presenter.pilotHasHomeAirport ).toBe( true );
			} );
		} );

		describe( 'when current pilot has not home airport', () => {
			beforeEach( () => {
				const otherPilot = PilotFactory.build( { homeAirport: '' } );
				store.add( otherPilot );
				store.setCurrentPilotId( otherPilot.id );
			} );

			it( 'returns false', () => {
				expect( presenter.pilotHasHomeAirport ).toBe( false );
			} );
		} );
	} );

	describe( '@onSaveButtonPressed()', () => {
		describe( 'when preferred airports have changed', () => {
			beforeEach( () => {
				presenter.preferredAirportsPresenter.addNewPreferredAirport( 'EZE' );
			} );

			it( 'starts loading', () => {
				presenter.onSaveButtonPressed();
				expect( presenter.isLoading ).toBe( true );
			} );

			it( 'calls the updatePilotAirports interactor', async () => {
				await presenter.onSaveButtonPressed();
				expect( updatePilotAirports.execute ).toHaveBeenCalled();
			} );

			it( 'finishes loading upon completion', async () => {
				await presenter.onSaveButtonPressed();
				expect( presenter.isLoading ).toBe( false );
			} );

			describe( 'when the request fails', () => {
				itShowsRequestErrorInSnackbar( {
					request: () => presenter.onSaveButtonPressed(),
					snackbarServiceMock: snackbarService,
					expectedMessage: 'Connection error. Please try again.',
					beforeRequest: () => {
						updatePilotAirports.execute.mockRejectedValueOnce( new NetworkError() );
					}
				} );
			} );
		} );

		describe( 'when preferred airports have no changed', () => {
			it( 'returns noop', async () => {
				expect( presenter.onSaveButtonPressed ).toBe( noop );
			} );
		} );
	} );
} );
