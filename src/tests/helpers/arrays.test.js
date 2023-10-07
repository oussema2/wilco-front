const {
	serializeArray,
	compareArrays
} = require( '../../helpers/arrays' );

describe( '@compareArrays', () => {
	describe( 'when arrays are equals', () => {
		it( 'returns true', () => {
			const array1 = [ 'test 1', 'test 2' ];
			const array2 = [ 'test 1', 'test 2' ];

			expect( compareArrays( array1, array2 ) ).toBeTruthy();
		} );
	} );

	describe( 'when arrays are equals and not sorted', () => {
		it( 'returns true', () => {
			const array1 = [ 'test 1', 'test 2' ];
			const array2 = [ 'test 2', 'test 1' ];

			expect( compareArrays( array1, array2 ) ).toBeTruthy();
		} );
	} );

	describe( 'when arrays aren\'t equals', () => {
		it( 'returns false', () => {
			const array1 = [ 'test 1', 'test 2' ];
			const array2 = [ 'test 1', 'test 22' ];

			expect( compareArrays( array1, array2 ) ).toBeFalsy();
		} );
	} );
} );

describe( '@serializeArray', () => {
	it( 'encodes array as a valid URI', () => {
		const name = 'tags';
		const array = [ 'tag 1', 'tag2' ];
		const serialized = serializeArray( name, array );
		const expected = 'tags[]=tag%201&tags[]=tag2';
		expect( serialized ).toEqual( expected );
	} );
} );
