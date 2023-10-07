import EntityStore from '../../../stores/EntityStore';
import GetEntitiesFromStore from '../../../interactors/GetEntitiesFromStore';
import PilotFactory from '../../factories/PilotFactory';
import MentionInputPresenter from '../../../presenters/MentionInput/MentionInputPresenter';
import MentionInputState from '../../../presenters/MentionInput/State/MentionInputState';
import NullMentionInputState from '../../../presenters/MentionInput/State/NullMentionInputState';

describe( 'MentionInputPresenter', () => {
	const fetchPilotsFromRemote = {
		execute: jest.fn(),
		resetPagination: jest.fn(),
		setPagination: jest.fn()
	};
	const fetchHashtagsFromRemote = {
		execute: jest.fn(),
		resetPagination: jest.fn(),
		setPagination: jest.fn()
	};
	const store = new EntityStore();
	const getPilotsFromStore = new GetEntitiesFromStore( { store } );
	const getHashtagsFromStore = new GetEntitiesFromStore( { store } );
	const pilots = PilotFactory.buildList( 4 );
	let presenter;

	const buildPresenter = () => {
		presenter = new MentionInputPresenter( {
			fetchHashtagsFromRemote,
			fetchPilotsFromRemote,
			getHashtagsFromStore,
			getPilotsFromStore
		} );
	};

	beforeEach( () => {
		buildPresenter();
		store.updateAll( pilots );
	} );

	describe( 'constructor()', () => {
		it( 'initializes the state objects correctly', () => {
			expect( presenter.nullState ).toBeInstanceOf( NullMentionInputState );
			expect( presenter.pilotMentionInputState ).toBeInstanceOf( MentionInputState );
			expect( presenter.hashtagMentionInputState ).toBeInstanceOf( MentionInputState );
		} );
	} );
} );
