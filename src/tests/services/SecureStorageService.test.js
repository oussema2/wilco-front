import MMKVStorage from 'react-native-mmkv-storage';
import SecureStorageService from '../../services/SecureStorageService';

describe( 'SecureStorageService', () => {
	let secureStorageService;
	const storage = {
		setString: jest.fn(),
		getString: jest.fn(),
		setInt: jest.fn(),
		getInt: jest.fn()
	};

	beforeEach( () => {
		secureStorageService = new SecureStorageService( { storage } );
	} );

	describe( 'constructor', () => {
		describe( 'with default props', () => {
			it( 'initializes with an MMKV storage', () => {
				const initialize = jest.fn( () => 'mmkv storage' );
				jest.spyOn( MMKVStorage, 'Loader' ).mockImplementation( () => ( {
					withEncryption: () => ( { initialize } )
				} ) );

				secureStorageService = new SecureStorageService();

				expect( secureStorageService.storage ).toBe( 'mmkv storage' );
			} );
		} );
	} );

	describe( 'string storage', () => {
		describe( '@setString', () => {
			it( 'sets a string for a given key', () => {
				const value = 'some string';
				const key = 'test';

				secureStorageService.setString( { key, value } );

				expect( storage.setString ).toHaveBeenCalledWith( key, value );
			} );
		} );

		describe( '@getString', () => {
			it( 'gets a key\'s string value', () => {
				const key = 'test';

				secureStorageService.getString( { key } );

				expect( storage.getString ).toHaveBeenCalledWith( key );
			} );
		} );
	} );

	describe( 'number storage', () => {
		describe( '@setInt', () => {
			it( 'sets a number for a given key', () => {
				const value = 2;
				const key = 'test';

				secureStorageService.setInt( { key, value } );

				expect( storage.setInt ).toHaveBeenCalledWith( key, value );
			} );
		} );

		describe( '@getInt', () => {
			it( 'gets a key\'s string value', () => {
				const key = 'test';

				secureStorageService.getInt( { key } );

				expect( storage.getInt ).toHaveBeenCalledWith( key );
			} );
		} );
	} );
} );
