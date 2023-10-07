import CommunityTag from '../../entities/CommunityTag';
import CommunityTagFactory from '../factories/CommunityTagFactory';

describe( 'CommunityTag entity', () => {
	describe( 'fromJSON', () => {
		const communityTagJSON = {
			id: 1, name: 'tag 1'
		};

		const communityTag = CommunityTag.fromJSON( communityTagJSON );

		it( 'creates the Community Tag with the correct properties', () => {
			expect( communityTag.id ).toEqual( 1 );
			expect( communityTag.name ).toEqual( 'tag 1' );
		} );
	} );

	describe( 'toJSON', () => {
		const communityTag = CommunityTagFactory.build();
		const json = communityTag.toJSON();

		it( 'returns the CommunityTag\'s json', () => {
			expect( json ).toEqual( {
				id: communityTag.id,
				name: communityTag.name
			} );
		} );
	} );
} );
