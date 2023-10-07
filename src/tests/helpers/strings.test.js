const {
	truncate,
	reduceSpaces,
	hasWordsThatStartWithValue,
	hasOnlyOneWord,
	simplifyNameToSearch,
	trimAndRemoveSubString
} = require( '../../helpers/strings' );

describe( '@truncate', () => {
	describe( 'when string has les characters than passed size', () => {
		it( 'returns the same string', () => {
			const string = 'example test';
			const truncatedString = truncate( 'example test', 15 );
			expect( truncatedString ).toEqual( string );
		} );
	} );

	describe( 'when string has more characters than passed size', () => {
		it( 'returns the truncated string', () => {
			const string = 'example test';
			const truncatedString = truncate( string, 3 );
			const expectedString = 'ex...';
			expect( truncatedString ).toEqual( expectedString );
		} );
	} );
} );

describe( '@reduceSpaces', () => {
	describe( 'when string has more than one spaces consecutive', () => {
		it( 'returns the string with only one space', () => {
			const string = 'example  test';
			const reduceSpacesString = reduceSpaces( string );
			const expectedString = 'example test';
			expect( reduceSpacesString ).toEqual( expectedString );
		} );
	} );

	describe( 'when string doesn\'t has more than one spaces consecutive', () => {
		it( 'returns the same string', () => {
			const string = 'example test';
			const reduceSpacesString = reduceSpaces( string );
			expect( reduceSpacesString ).toEqual( string );
		} );
	} );
} );

describe( '@hasWordsThatStartWithValue', () => {
	describe( 'when string has words that start with provided value', () => {
		it( 'returns true', () => {
			const string = 'example test';
			const searchValue = 'te';
			expect( hasWordsThatStartWithValue( string, searchValue ) ).toEqual( true );
		} );
	} );

	describe( 'when string does not have words that start with provided value', () => {
		it( 'returns false', () => {
			const string = 'example test';
			const searchValue = 'est';
			expect( hasWordsThatStartWithValue( string, searchValue ) ).toEqual( false );
		} );
	} );
} );

describe( '@hasOnlyOneWord', () => {
	describe( 'when string has only one word', () => {
		it( 'returns true', () => {
			const string = 'example';
			expect( hasOnlyOneWord( string ) ).toEqual( true );
		} );
	} );

	describe( 'when string has more than one word', () => {
		it( 'returns false', () => {
			const string = 'example test';
			expect( hasOnlyOneWord( string ) ).toEqual( false );
		} );
	} );
} );

describe( '@simplifyNameToSearch', () => {
	describe( 'when string has spaces', () => {
		it( 'returns the correct string', () => {
			const string = ' example  example ';
			expect( simplifyNameToSearch( string ) ).toEqual( 'EXAMPLE EXAMPLE' );
		} );
	} );
} );

describe( '@trimAndRemoveSubString', () => {
	const itCallsTrimAndRemoveSubStringAndExpectItToEqual = (
		{ string, subString, expectedString }
	) => {
		it( `returns '${expectedString}' when called with '${string}' and '${subString}'`, () => {
			expect( trimAndRemoveSubString( string, subString ) ).toEqual( expectedString );
		} );
	};

	describe( 'when string does not contain substring', () => {
		itCallsTrimAndRemoveSubStringAndExpectItToEqual( {
			string: 'example',
			subString: '#',
			expectedString: 'example'
		} );

		itCallsTrimAndRemoveSubStringAndExpectItToEqual( {
			string: '  example  ',
			subString: '#',
			expectedString: 'example'
		} );
	} );

	describe( 'when string contains the substring', () => {
		itCallsTrimAndRemoveSubStringAndExpectItToEqual( {
			string: '#example',
			subString: '#',
			expectedString: 'example'
		} );

		itCallsTrimAndRemoveSubStringAndExpectItToEqual( {
			string: '  #example  ',
			subString: '#',
			expectedString: 'example'
		} );
	} );
} );
