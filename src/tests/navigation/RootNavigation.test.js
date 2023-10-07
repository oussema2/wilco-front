import navigation from '../../navigation/RootNavigation';

describe( 'RefNavigation', () => {
	const mockNavigation = {
		getRootState: jest.fn(),
		navigate: jest.fn()
	};

	beforeAll( () => {
		navigation.ref.current = mockNavigation;
	} );

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	describe( '@navigate', () => {
		const params = [ 'route name', { id: 4 } ];

		describe( 'when the navigation is initialized', () => {
			it( 'navigates', async () => {
				mockNavigation.getRootState.mockReturnValueOnce( true );
				await navigation.navigate( ...params );
				expect( mockNavigation.navigate ).toHaveBeenCalledWith( ...params );
			} );
		} );

		describe( 'when the navigation hasn\'t been initialized', () => {
			it( 'waits for navigation to initialize before navigating', async () => {
				setTimeout( () => {
					mockNavigation.getRootState.mockReturnValueOnce( true );
				}, 10 );

				await navigation.navigate( ...params );
				expect( mockNavigation.navigate ).toHaveBeenCalledWith( ...params );
			} );
		} );
	} );
} );
