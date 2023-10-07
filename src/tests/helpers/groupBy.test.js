import groupBy from '../../helpers/groupBy';

describe( 'groupBy', () => {
	describe( 'with an empty array', () => {
		it( 'returns an empty object', () => {
			expect( groupBy( [], 'any_key' ) ).toEqual( {} );
		} );
	} );

	describe( 'with a non empty array', () => {
		const array = [
			{
				id: 2, name: 'George'
			},
			{
				id: 25, name: 'George', extra: 'Some extra data'
			},
			{
				id: 16, name: 'Richard'
			},
			{
				name: 'Arnold'
			}
		];

		it( 'returns an object that groups the elements by the given key', () => {
			expect( groupBy( array, 'name' ) ).toEqual( {
				'George': [
					{
						id: 2, name: 'George'
					},
					{
						id: 25, name: 'George', extra: 'Some extra data'
					}
				],
				'Richard': [
					{
						id: 16, name: 'Richard'
					}
				],
				'Arnold': [
					{
						name: 'Arnold'
					}
				]
			} );
		} );
	} );
} );
