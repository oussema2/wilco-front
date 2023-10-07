import DeleteAccountService from '../../services/DeleteAccountService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} ),
	firebase: {
		auth: {
			EmailAuthProvider: {
				credential: jest.fn()
			}
		}
	}
}
) );

describe( 'DeleteAccountService', () => {
	let service;
	const api = {
		deleteAccount: jest.fn()
	};

	const authMock = {
		currentUser: {
			email: 'test@wilco.com',
			reauthenticateWithCredential: jest.fn( () => Promise.resolve( true ) ),
			delete: jest.fn()
		}
	};

	const auth = () => authMock;
	const dependencies = { api, auth };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new DeleteAccountService( dependencies );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the provided values', () => {
			expect( service.auth ).toBe( dependencies.auth );
			expect( service.api ).toBe( dependencies.api );
		} );
	} );

	describe( 'deleteAccount()', () => {
		it( 'deletes user account', async () => {
			await service.deleteAccount( 'password' );
			expect( authMock.currentUser.reauthenticateWithCredential ).toHaveBeenCalled();
			expect( authMock.currentUser.delete ).toHaveBeenCalled();
			expect( api.deleteAccount ).toHaveBeenCalled();
		} );
	} );
} );
