import ConfirmPasswordResetService from '../../services/ConfirmPasswordResetService';
import InputError from '../../errors/InputError';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'ConfirmPasswordResetService', () => {
	const authMock = {
		confirmPasswordReset: jest.fn()
	};
	const auth = () => authMock;
	let service;

	beforeEach( () => {
		jest.clearAllMocks();
		service = new ConfirmPasswordResetService( { auth } );
	} );

	describe( 'confirmPasswordReset()', () => {
		const password = '12345678';
		const oobCode = 'testCode';

		it( 'changes user password', async () => {
			await service.confirmPasswordReset( { password, oobCode } );
			expect( authMock.confirmPasswordReset ).toHaveBeenLastCalledWith( oobCode, password );
		} );

		describe( 'when the Firebase request fails', () => {
			beforeEach( () => {
				authMock.confirmPasswordReset.mockRejectedValueOnce( {
					code: 'auth/invalid-email'
				} );
			} );

			it( 'throws the correct error', async () => {
				await expect(
					service.confirmPasswordReset( { password, oobCode } )
				).rejects.toThrow( InputError );
			} );

			it( 'assigns the correct name to the error', () => {
				try {
					service.confirmPasswordReset( { password, oobCode } );
				} catch ( error ) {
					// eslint-disable-next-line jest/no-conditional-expect,jest/no-try-expect
					expect( error.errorName ).toEqual( 'invalid_email' );
				}
			} );
		} );
	} );
} );
