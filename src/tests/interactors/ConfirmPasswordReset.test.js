import ConfirmPasswordReset from '../../interactors/ConfirmPasswordReset';

describe( 'ConfirmPasswordReset', () => {
	const confirmPasswordResetService = {
		confirmPasswordReset: jest.fn()
	};
	let confirmPasswordReset;

	beforeEach( () => {
		jest.clearAllMocks();
		confirmPasswordReset = new ConfirmPasswordReset( { confirmPasswordResetService } );
	} );

	describe( '#execute()', () => {
		const params = { password: '12345678', oobCode: 'testCode' };

		it( 'sends password to user', async () => {
			await confirmPasswordReset.execute( params );

			expect( confirmPasswordResetService.confirmPasswordReset ).toHaveBeenCalledWith( params );
		} );
	} );
} );
