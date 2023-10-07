import PilotFactory from '../factories/PilotFactory';
import PostStore from '../../stores/PostStore';
import PostFactory from '../factories/PostFactory';

describe( 'PostStore', () => {
	let store;

	beforeEach( () => {
		const rootStoreMock = {
			myFeedPostStore: {
				updateIfExists: jest.fn(),
				delete: jest.fn()
			}
		};
		store = new PostStore( rootStoreMock );
	} );

	describe( '@deletePostsByPilotId', () => {
		it( 'deletes posts from a pilot', () => {
			const currentPilot = PilotFactory.build();
			const otherPilot = PilotFactory.build();
			const postFromPilot = PostFactory.build( { pilot: currentPilot } );
			const postFromOtherPilot = PostFactory.build( { pilot: otherPilot } );

			store.update( postFromOtherPilot );
			store.update( postFromPilot );

			expect( store.entities.length ).toBe( 2 );

			store.deletePostsByPilotId( otherPilot.id );

			expect( store.entities.length ).toBe( 1 );
			expect( store.entities[ 0 ] ).toBe( postFromPilot );
		} );
	} );

	describe( '@updateNumberOfComments', () => {
		describe( 'when number of comments is more than zero', () => {
			it( 'decrements the number of comments of post', () => {
				const pilot = PilotFactory.build();

				const postFromPilot = PostFactory.build( { pilot, numberOfComments: 2 } );

				store.update( postFromPilot );

				store.updateNumberOfComments( postFromPilot.id );

				expect( postFromPilot.numberOfComments ).toBe( 1 );
			} );
		} );

		describe( 'when number of comments is zero', () => {
			it( 'doesn\'t decrement past 0', () => {
				const pilot = PilotFactory.build();

				const postFromPilot = PostFactory.build( { pilot, numberOfComments: 0 } );

				store.update( postFromPilot );

				store.updateNumberOfComments( postFromPilot.id );

				expect( postFromPilot.numberOfComments ).toBe( 0 );
			} );
		} );
	} );
} );
