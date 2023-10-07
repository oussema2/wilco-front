import PostBuilder from '../../builders/PostBuilder';
import PostFactory from '../factories/PostFactory';
import Post from '../../entities/Post';
import PilotFactory from '../factories/PilotFactory';

describe( 'PostBuilder', () => {
	let builder;
	const post = PostFactory.build();
	const postJSON = post.toJSON();
	const pilotStore = { update: jest.fn() };
	const aircraftStore = { update: jest.fn() };
	const commentStore = { updateSorted: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		builder = new PostBuilder( { pilotStore, aircraftStore, commentStore } );
	} );

	describe( 'build', () => {
		const buildPost = () => builder.build( postJSON );

		it( 'returns a post instance', () => {
			expect( buildPost() ).toBeInstanceOf( Post );
		} );

		it( 'makes the post\'s pilot reference their store', () => {
			const storedPilot = PilotFactory.build();
			pilotStore.update.mockReturnValueOnce( storedPilot );

			const result = buildPost();

			expect( result.pilot ).toEqual( storedPilot );
			expect( pilotStore.update ).toHaveBeenCalledWith( post.pilot );
		} );

		it( 'makes the post\'s aircraft reference their store', () => {
			const storedAircraft = PilotFactory.build();
			aircraftStore.update.mockReturnValueOnce( storedAircraft );

			const result = buildPost();

			expect( result.flight.aircraft ).toEqual( storedAircraft );
			expect( aircraftStore.update ).toHaveBeenCalledWith( post.flight.aircraft );
		} );

		it( 'makes the post\'s preview comments reference their store', () => {
			buildPost();
			expect( commentStore.updateSorted )
				.toHaveBeenCalledWith( post.previewComments, expect.any( Function ) );
		} );
	} );
} );
