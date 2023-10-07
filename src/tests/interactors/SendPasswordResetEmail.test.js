import SendPasswordResetEmail from '../../interactors/SendPasswordResetEmail';

describe( 'SendPasswordResetEmail', () => {
	const sendPasswordResetEmailService = {
		sendPasswordResetEmail: jest.fn()
	};
	let sendPasswordResetEmail;

	beforeEach( () => {
		jest.clearAllMocks();
		sendPasswordResetEmail = new SendPasswordResetEmail( { sendPasswordResetEmailService } );
	} );

	describe( '#execute()', () => {
		const params = { email: 'test@wilco.co' };

		it( 'sends password to user', async () => {
			await sendPasswordResetEmail.execute( params );

			expect( sendPasswordResetEmailService.sendPasswordResetEmail ).toHaveBeenCalledWith( params );
		} );
	} );
} );
