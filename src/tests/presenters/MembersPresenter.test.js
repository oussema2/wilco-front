import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import MockRootStore from '../mocks/MockRootStore';
import MembersPresenter from '../../presenters/MembersPresenter';
import PilotInfoPresenter from '../../presenters/PilotInfoPresenter';
import PilotFactory from '../factories/PilotFactory';
import PilotStore from '../../stores/PilotStore';
import Pilot from '../../entities/Pilot';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import flushPromises from '../support/flushPromises';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';

describe( 'MembersPresenter', () => {
	const fetchPilotsFromRemote = {
		execute: jest.fn().mockReturnValue( [ 1, 2 ] ),
		resetPagination: jest.fn(),
		setPagination: jest.fn()
	};
	const	store = new PilotStore();
	const getPilotsFromStore = new GetEntitiesFromStore( { store } );
	const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store } );
	const navigation = { push: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	const makeAutoObservable = jest.fn();
	const rootStore = new MockRootStore();
	const members = PilotFactory.buildList( 3 );
	let presenter;

	const buildPresenter = () => {
		presenter = new MembersPresenter( {
			fetchPilotsFromRemote,
			getPilotsFromStore,
			navigation,
			snackbarService,
			rootStore,
			getCurrentPilotFromStore,
			makeAutoObservable
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		buildPresenter();

		const newPilot = new Pilot( {
			id: 100,
			firstName: 'Andy',
			lastName: 'Gomez',
			description: 'Pilot description',
			profilePictureUrl: 'http://profile/picture/url',
			homeAirport: 'SAEZ',
			primaryAircraftId: null,
			aircrafts: [ ]
		} );

		store.updateAll( members );
		members.push( newPilot );
		store.add( newPilot );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.fetchPilotsFromRemote ).toEqual( fetchPilotsFromRemote );
			expect( presenter.getPilotsFromStore ).toEqual( getPilotsFromStore );
			expect( presenter.fetchPilotsFromRemote.execute ).toHaveBeenCalled( );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.rootStore ).toEqual( rootStore );
			expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );

		describe( 'when an error occurs while fetching pilots from remote', () => {
			itShowsRequestErrorInSnackbar( {
				request: flushPromises,
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					fetchPilotsFromRemote.execute.mockRejectedValueOnce( new NetworkError() );
					buildPresenter();
				}
			} );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when it did not finish fetching the pilots from remote', () => {
			it( 'returns true', () => {
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when it finished fetching the pilots from remote', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isLoading ).toBe( false );
			} );
		} );
	} );

	describe( '@pilotsPresenters()', () => {
		it( 'returns the pilotsPresenters sorted by pilot name', () => {
			const sortedMembers = members.sort( ( a, b ) => a.name.localeCompare( b.name ) );

			presenter.pilotsPresenters.forEach( ( pilotInfoPresenter, index ) => {
				expect( pilotInfoPresenter.pilot ).toEqual( sortedMembers[ index ] );
				expect( pilotInfoPresenter.getCurrentPilotFromStore )
					.toBeInstanceOf( GetCurrentPilotFromStore );
				expect( pilotInfoPresenter ).toBeInstanceOf( PilotInfoPresenter );
			} );
		} );
	} );

	describe( '@_pilots()', () => {
		it( 'returns the pilots sorted by pilot name', () => {
			const sortedMembers = members.sort( ( a, b ) => a.name.localeCompare( b.name ) );

			presenter._pilots.forEach( ( pilot, index ) => {
				expect( pilot ).toEqual( sortedMembers[ index ] );
				expect( pilot ).toBeInstanceOf( Pilot );
			} );
		} );
	} );

	describe( '@onRefresh()', () => {
		it( 'calls the fetchPilotsFromRemote interactor', () => {
			presenter.onRefresh();
			expect( presenter.fetchPilotsFromRemote.resetPagination ).toHaveBeenCalledTimes( 1 );
			expect( presenter.fetchPilotsFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( '@isRefreshing()', () => {
		describe( 'when the app is refreshing', () => {
			it( 'returns true', () => {
				presenter.onRefresh();
				expect( presenter.isRefreshing ).toBeTruthy();
			} );
		} );

		describe( 'when the app finished to refreshing', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isRefreshing ).toBeFalsy();
			} );
		} );
	} );

	describe( '@showMembers', () => {
		describe( 'the first time', () => {
			it( 'returns false', () => {
				expect( presenter.showMembers ).toBe( false );
			} );
		} );

		describe( 'after fetch members', () => {
			it( 'returns true', async () => {
				presenter.handleLoadMore();
				await flushPromises();
				expect( presenter.showMembers ).toBe( true );
			} );
		} );
	} );

	describe( '@setTabIndex()', () => {
		it( 'set current members screen active tab', () => {
			const expectedMembersTabIndex = 0;
			presenter.setTabIndex( expectedMembersTabIndex );
			expect( presenter.tabIndex ).toBe( expectedMembersTabIndex );
		} );
	} );
} );
