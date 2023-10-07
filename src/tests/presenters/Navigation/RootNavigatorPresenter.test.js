import RootNavigatorPresenter from '../../../presenters/Navigation/RootNavigatorPresenter';
import NetworkError from '../../../errors/NetworkError';
import flushPromises from '../../support/flushPromises';
import PilotFactory from '../../factories/PilotFactory';
import PilotStore from '../../../stores/PilotStore';
import GetCurrentPilotFromStore from '../../../interactors/GetCurrentPilotFromStore';

describe( 'RootNavigatorPresenter', () => {
	const authenticationStore = {
		isAuthenticated: false,
		deleteUserToken: jest.fn()
	};
	const fetchPilot = { execute: jest.fn() };
	const pilotStore = new PilotStore();
	const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );
	const makeAutoObservable = jest.fn();
	const pushNotificationsService = { initialize: jest.fn() };
	const deepLinkService = { initialize: jest.fn() };
	let presenter;

	const createPresenter = () => {
		presenter = new RootNavigatorPresenter( {
			authenticationStore,
			fetchPilot,
			getCurrentPilotFromStore,
			pushNotificationsService,
			deepLinkService,
			makeAutoObservable
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		authenticationStore.isAuthenticated = false;
	} );

	describe( 'constructor()', () => {
		it( 'creates the presenter with the correct data', () => {
			createPresenter();
			expect( presenter.authenticationStore ).toBe( authenticationStore );
			expect( presenter.fetchPilot ).toBe( fetchPilot );
			expect( presenter.getCurrentPilotFromStore ).toBe( getCurrentPilotFromStore );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );

		it( 'fetches the current pilot', () => {
			createPresenter();
			expect( fetchPilot.execute ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'initializes the notification service', () => {
			createPresenter();
			expect( pushNotificationsService.initialize ).toHaveBeenCalledTimes( 1 );
		} );

		describe( 'when the request to fetch the pilot fails', () => {
			it( 'resets the session', async () => {
				fetchPilot.execute.mockRejectedValueOnce( new NetworkError() );
				createPresenter();
				await flushPromises();
				expect( authenticationStore.deleteUserToken ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( '@isUserAuthenticated()', () => {
		describe( 'when the user is authenticated', () => {
			beforeEach( () => {
				authenticationStore.isAuthenticated = true;
				const pilot = PilotFactory.build();
				pilotStore.add( pilot );
				pilotStore.setCurrentPilotId( pilot.id );
			} );

			it( 'returns true', async () => {
				expect( presenter.isUserAuthenticated ).toBeTruthy();
			} );
		} );

		describe( 'when the user is not authenticated', () => {
			it( 'returns false', async () => {
				expect( presenter.isUserAuthenticated ).toBeFalsy();
			} );
		} );
	} );
} );
