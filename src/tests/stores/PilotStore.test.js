import PilotStore from '../../stores/PilotStore';
import PilotFactory from '../factories/PilotFactory';

describe( 'PilotStore', () => {
	let store;
	const entities = PilotFactory.buildList( 2 );
	const currentPilot = entities[ 0 ];

	beforeEach( () => {
		store = new PilotStore();
	} );

	describe( 'constructor', () => {
		it( 'initializes with correct attributes', () => {
			expect( store.entities ).toEqual( [] );
			expect( store.currentPilotId ).toEqual( null );
		} );
	} );

	describe( '@setCurrentPilotId', () => {
		it( 'sets current pilot id', () => {
			store.setCurrentPilotId( currentPilot.id );

			expect( store.currentPilotId ).toEqual( currentPilot.id );
		} );
	} );

	describe( '@currentPilot', () => {
		beforeEach( () => {
			store.currentPilotId = currentPilot.id;
		} );

		describe( 'when the pilot is in the store', () => {
			beforeEach( () => {
				store.entities = entities;
			} );

			it( 'returns the current pilot', () => {
				expect( store.currentPilot ).toEqual( currentPilot );
			} );
		} );

		describe( 'when the pilot is not in the store', () => {
			it( 'returns null', () => {
				expect( store.currentPilot ).toEqual( null );
			} );
		} );
	} );
} );
