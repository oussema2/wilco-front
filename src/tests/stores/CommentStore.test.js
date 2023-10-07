import PilotFactory from '../factories/PilotFactory';
import CommentStore from '../../stores/CommentStore';
import CommentFactory from '../factories/CommentFactory';

describe( 'PostStore', () => {
	let store;

	beforeEach( () => {
		store = new CommentStore( );
	} );

	describe( '@deleteCommentsByPilotId', () => {
		it( 'deletes comments from a pilot', () => {
			const currentPilot = PilotFactory.build();
			const otherPilot = PilotFactory.build();
			const commentFromPilot = CommentFactory.build( { pilot: currentPilot } );
			const commentFromOtherPilot = CommentFactory.build( { pilot: otherPilot } );
			const otherCommentFromOtherPilot = CommentFactory.build( { pilot: otherPilot } );

			store.update( commentFromOtherPilot );
			store.update( commentFromPilot );
			store.update( otherCommentFromOtherPilot );

			expect( store.entities.length ).toBe( 3 );

			store.deleteCommentsByPilotId( otherPilot.id );

			expect( store.entities.length ).toBe( 1 );
			expect( store.entities[ 0 ] ).toBe( commentFromPilot );
			expect( store.find( commentFromOtherPilot.id ) ).toBeNull();
			expect( store.find( otherCommentFromOtherPilot.id ) ).toBeNull();
			expect( store.find( commentFromPilot.id ) ).toEqual( commentFromPilot );
		} );
	} );

	describe( '@getCommentsByPilotId', () => {
		it( 'gets comments by pilot id', () => {
			const pilot = PilotFactory.build();
			const otherPilot = PilotFactory.build();
			const commentFromPilot = CommentFactory.build( { pilot } );
			const commentFromOtherPilot = CommentFactory.build( { pilot: otherPilot } );
			const otherCommentFromOtherPilot = CommentFactory.build( { pilot: otherPilot } );

			store.update( commentFromOtherPilot );
			store.update( commentFromPilot );
			store.update( otherCommentFromOtherPilot );

			const allCommentsByOtherPilot = store.getCommentsByPilotId( otherPilot.id );

			expect( allCommentsByOtherPilot )
				.toStrictEqual( [ commentFromOtherPilot, otherCommentFromOtherPilot ] );
		} );
	} );
} );
