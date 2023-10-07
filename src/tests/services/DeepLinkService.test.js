import DeepLinkService from '../../services/DeepLinkService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'PushNotificationsService', () => {
	const mockLinking = {
		addEventListener: jest.fn(),
		getInitialURL: jest.fn().mockImplementation( () => Promise.resolve() )
	};

	const linking = mockLinking;

	const navigation = {
		navigate: jest.fn(),
		dispatch: jest.fn()
	};

	let service;

	beforeEach( () => {
		jest.clearAllMocks();
		service = new DeepLinkService( {
			linking, navigation
		} );
	} );

	describe( '@initialize()', () => {
		it( 'subscribes to the link listener event', async () => {
			await service.initialize();
			expect( mockLinking.addEventListener ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'subscribes to the app opened from link event', async () => {
			await service.initialize();
			expect( mockLinking.getInitialURL ).toHaveBeenCalledTimes( 1 );
		} );

		describe( 'when the app wasn\'t opened from a link', () => {
			it( 'doesn\'t trigger any navigation', async () => {
				await service.initialize();
				expect( navigation.navigate ).not.toHaveBeenCalled();
			} );
		} );
	} );
} );
