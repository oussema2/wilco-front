import SendPasswordResetEmailService from '../../services/SendPasswordResetEmailService';
import InputError from '../../errors/InputError';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'SendPasswordResetEmailService', () => {
	const authMock = {
		sendPasswordResetEmail: jest.fn()
	};
	const auth = () => authMock;
	let service;

	beforeEach( () => {
		jest.clearAllMocks();
		service = new SendPasswordResetEmailService( { auth } );
	} );

	describe( 'sendPasswordResetEmail()', () => {
		const email = 'test@wilco.com';

		it( 'sends email to user with a link to recover password', async () => {
			await service.sendPasswordResetEmail( { email } );
			expect( authMock.sendPasswordResetEmail ).toHaveBeenLastCalledWith( email );
		} );

		describe( 'when the Firebase request fails', () => {
			beforeEach( () => {
				authMock.sendPasswordResetEmail.mockRejectedValueOnce( {
					code: 'auth/invalid-action-code'
				} );
			} );

			it( 'throws the correct error', async () => {
				await expect(
					service.sendPasswordResetEmail( { email } )
				).rejects.toThrow( InputError );
			} );

			it( 'assigns the correct name to the error', () => {
				try {
					service.sendPasswordResetEmail( { email } );
				} catch ( error ) {
					// eslint-disable-next-line jest/no-conditional-expect,jest/no-try-expect
					expect( error.errorName ).toEqual( 'invalid_action_code' );
				}
			} );
		} );
	} );
} );
