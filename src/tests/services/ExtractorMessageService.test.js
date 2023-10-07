import ExtractorMessageService from '../../services/ExtractorMessageService';

describe( 'ExtractorMessageService', () => {
	let service;

	beforeEach( () => {
		service = ExtractorMessageService.shared();
	} );

	describe( '@extractMentionsIDs()', () => {
		it( 'return mention id from message', () => {
			let message = [ '@[Den Bevi](29)' ];
			expect( service.extractMentionsIDs( message ) ).toStrictEqual( [ 29 ] );
		} );
		it( 'without @ the extracted mention id from message is not returned', () => {
			let message = [ '[Den Bevi](29)' ];
			expect( service.extractMentionsIDs( message ) ).not.toStrictEqual( [ 29 ] );
		} );
	} );

	describe( '@extractLocations()', () => {
		it( 'return location from message', () => {
			let message = [ '+TEST' ];
			expect( service.extractLocations( message ) ).toStrictEqual( [ 'TEST' ] );
		} );
		it( 'without + the extracted location from message is not returned', () => {
			let message = [ 'TEST' ];
			expect( service.extractLocations( message ) ).not.toStrictEqual( [ 'TEST' ] );
		} );
	} );

	describe( '@extractHashtags()', () => {
		const callExtractHashtagsWithAndExpectItToEqual = ( testCaseName, message, expectedResult ) => {
			it( `${testCaseName}`, () => {
				expect( service.extractHashtags( message ) ).toEqual( expectedResult );
			} );
		};

		describe( 'when hashtag was typed manually by the user', () => {
			callExtractHashtagsWithAndExpectItToEqual(
				'returns the extracted hashtag from the message when it\'s plain text',
				'Hello #world',
				[ 'world' ]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'returns the extracted hashtags from the message when there are more than one occurrences',
				'Hello #world #bye987 #123 #',
				[ 'world', 'bye987', '123' ]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'returns the extracted hashtags from the message maintaining the case of the word',
				'Hello #wORlD.',
				[ 'wORlD' ]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'does not count empty number sign as a hashtag',
				'Hello # ',
				[]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'does not count hashtag with emoji as a hashtag',
				'Hello #😀',
				[]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'does not count hashtag with symbols as a hashtag',
				'Hello #*@!?.',
				[]
			);
		} );

		describe( 'when hashtag was typed automatically when selecting it', () => {
			callExtractHashtagsWithAndExpectItToEqual(
				'returns the extracted hashtag from the message when it\'s plain text',
				'Hello #[wOrld](1)',
				[ 'wOrld' ]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'returns the extracted hashtags from the message when there are more than one occurrences',
				'Hello #[world](1) #[bye987](2) #[123](3) #',
				[ 'world', 'bye987', '123' ]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'does not count hashtag with emoji as a hashtag',
				'Hello #[😀](1)',
				[]
			);

			callExtractHashtagsWithAndExpectItToEqual(
				'does not count hashtag with symbols as a hashtag',
				'#[*@!?.](1)',
				[]
			);
		} );

		describe( 'when message has automatically and manually typed hashtags', () => {
			callExtractHashtagsWithAndExpectItToEqual(
				'returns the extracted hashtags from the message when there are more than one occurrences',
				'Hello #[world](1) #bye987 #[123](3) #',
				[ 'bye987', 'world', '123' ]
			);
		} );
	} );
} );
