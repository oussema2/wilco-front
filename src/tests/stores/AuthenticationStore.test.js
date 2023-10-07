import AuthenticationStore from '../../stores/AuthenticationStore';
import SecureStorageService from '../../services/SecureStorageService';

describe( 'AuthenticationStore', () => {
	let store;
	const tokenStorageKey = 'token';
	const storageService = {
		getString: jest.fn(),
		setString: jest.fn()
	};

	beforeEach( () => {
		jest.clearAllMocks();
		store = new AuthenticationStore( { storageService } );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with default parameters', () => {
			store = new AuthenticationStore();

			expect( store._userToken ).toBeFalsy();
			expect( store.storageService ).toBeInstanceOf( SecureStorageService );
		} );

		describe( 'when there is a token in storage', () => {
			beforeEach( () => {
				storageService.getString.mockImplementationOnce( () => 'userToken' );
				store = new AuthenticationStore( { storageService } );
			} );

			it( 'saves the token in the store', () => {
				expect( storageService.getString ).toHaveBeenCalledWith( { key: tokenStorageKey } );
				expect( store._userToken ).toBe( 'userToken' );
			} );
		} );

		describe( 'when there is not a token in storage', () => {
			beforeEach( () => {
				storageService.getString.mockImplementationOnce( () => null );
				store = new AuthenticationStore( { storageService } );
			} );

			it( 'doesn\'t save the token in the store', () => {
				expect( storageService.getString ).toHaveBeenCalledWith( { key: tokenStorageKey } );
				expect( store._userToken ).toBeFalsy();
			} );
		} );
	} );

	describe( '@isAuthenticated()', () => {
		describe( 'when the token is undefined', () => {
			it( 'returns false', () => {
				store.setUserToken( undefined );

				expect( store.isAuthenticated ).toBeFalsy();
			} );
		} );

		describe( 'when the token is null', () => {
			it( 'returns false', () => {
				store.setUserToken( undefined );

				expect( store.isAuthenticated ).toBeFalsy();
			} );
		} );

		describe( 'when the token is an empty string', () => {
			it( 'returns false', () => {
				store.setUserToken( '' );

				expect( store.isAuthenticated ).toBeFalsy();
			} );
		} );

		describe( 'when the user is authenticated', () => {
			it( 'returns true', () => {
				store.setUserToken( 'AToken' );

				expect( store.isAuthenticated ).toBeTruthy();
			} );
		} );
	} );

	describe( '@deleteUserToken()', () => {
		beforeEach( () => {
			store.setUserToken( 'a_token' );
		} );

		it( 'sets the empty string', () => {
			store.deleteUserToken();

			expect( store._userToken ).toBe( '' );
		} );

		it( 'persists the token to the storage service', () => {
			store.deleteUserToken();

			expect( storageService.setString ).toHaveBeenCalledWith( {
				key: tokenStorageKey,
				value: ''
			} );
		} );
	} );

	describe( '@setUserToken()', () => {
		const testToken = 'token';

		it( 'sets the stored token', () => {
			store.setUserToken( testToken );

			expect( store._userToken ).toBe( testToken );
		} );

		it( 'persists the token to the storage service', () => {
			store.setUserToken( testToken );

			expect( storageService.setString ).toHaveBeenCalledWith( {
				key: tokenStorageKey,
				value: testToken
			} );
		} );
	} );
} );
