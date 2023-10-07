import HelpCenterService from '../../services/HelpCenterService';

jest.mock( '@intercom/intercom-react-native', () => {} );

const backendMock = {
	registerIdentifiedUser: jest.fn( () => Promise.resolve() ),
	setUserHash: jest.fn( () => Promise.resolve() ),
	displayMessageComposer: jest.fn(),
	logout: jest.fn()
};

describe( 'HelpCenterService', () => {
	const createService = ( { userIdPrefix = null, platform = 'ios' } = {} ) => new HelpCenterService( {
		backend: backendMock,
		userIdPrefix,
		platform
	} );

	describe( 'registerIdentifiedUser', () => {
		test( 'registers an identified user with the backend service adding a prefix when the prefix is present', async () => {
			const helpCenterService = createService( { userIdPrefix: 'prefix' } );

			await helpCenterService.registerIdentifiedUser( { id: 22, email: 'test@roger-wilco.aero' } );
			expect( backendMock.registerIdentifiedUser ).toHaveBeenCalledWith( {
				userId: 'prefix-22',
				email: 'test@roger-wilco.aero'
			} );
		} );

		test( 'registers an identified user with the backend service without adding a prefix when the prefix is not present', async () => {
			const helpCenterService = createService();

			await helpCenterService.registerIdentifiedUser( { id: 22, email: 'test@roger-wilco.aero' } );
			expect( backendMock.registerIdentifiedUser ).toHaveBeenCalledWith( {
				userId: 22,
				email: 'test@roger-wilco.aero'
			} );
		} );

		test( 'sets the identity verification hash correctly for ios', async () => {
			const helpCenterService = createService( { platform: 'ios' } );
			const intercomIOSHash = 'intercom-ios-hash';

			await helpCenterService.registerIdentifiedUser( { id: 22, email: 'test@roger-wilco.aero', intercomIOSHash } );
			expect( backendMock.setUserHash ).toHaveBeenCalledWith( intercomIOSHash );
		} );

		test( 'sets the identity verification hash correctly for android', async () => {
			const helpCenterService = createService( { platform: 'android' } );
			const intercomAndroidHash = 'intercom-android-hash';

			await helpCenterService.registerIdentifiedUser( { id: 22, email: 'test@roger-wilco.aero', intercomAndroidHash } );
			expect( backendMock.setUserHash ).toHaveBeenCalledWith( intercomAndroidHash );
		} );
	} );

	describe( 'showMessageComposer', () => {
		test( 'calls the backend service to show the message composer', () => {
			const helpCenterService = createService();

			helpCenterService.showMessageComposer();
			expect( backendMock.displayMessageComposer ).toHaveBeenCalled();
		} );
	} );

	describe( 'logout', () => {
		test( 'calls the backend service to logout', () => {
			const helpCenterService = createService();

			helpCenterService.logout();
			expect( backendMock.logout ).toHaveBeenCalled();
		} );
	} );

	describe( 'shared', () => {
		test( 'returns the same instance of HelpCenterService', async () => {
			const helpCenterService = HelpCenterService.shared();
			const expectedHelpCenterService = HelpCenterService.shared();
			expect( helpCenterService ).toMatchObject( expectedHelpCenterService );
		} );
	} );
} );
