import RemoteConfigService, { REMOTE_CONFIG_DEFAULTS } from '../../services/RemoteConfigService';

jest.mock( '@react-native-firebase/remote-config', () => ( {
	setConfigSettings: jest.fn( () => {} )
} ) );

describe( 'RemoteConfigService', () => {
	const mockBackend = {
		setConfigSettings: jest.fn()
	};

	const createService = () => {
		const backend = () => ( mockBackend );
		const remoteConfigService = new RemoteConfigService( { backend } );
		return { remoteConfigService };
	};

	describe( 'shared', () => {
		const remoteConfigServiceServiceFirst = RemoteConfigService.shared();
		const remoteConfigServiceServiceSecond = RemoteConfigService.shared();
		test( 'calls to the method first time', () => {
			expect( remoteConfigServiceServiceFirst ).toBeInstanceOf( RemoteConfigService );
		} );

		test( 'calls to the method second time', () => {
			expect( remoteConfigServiceServiceSecond ).toBeInstanceOf( RemoteConfigService );
			expect( remoteConfigServiceServiceFirst ).toEqual( remoteConfigServiceServiceSecond );
		} );
	} );

	describe( 'setUp', () => {
		it( 'with no parameters set up remote config with default parameters', () => {
			const { remoteConfigService } = createService();
			remoteConfigService.setUp();

			expect( remoteConfigService.backend().setConfigSettings )
				.toHaveBeenCalledWith( {
					minimumFetchIntervalMillis: REMOTE_CONFIG_DEFAULTS.expirationDurationSeconds
				} );
		} );
	} );
} );
