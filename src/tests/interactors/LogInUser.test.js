import LogInUser from '../../interactors/LogInUser';

describe( 'LogInUser', () => {
	const firebaseIdToken = 'firebaseIdToken';
	const logInService = {
		logInWithFirebase: jest.fn( () => firebaseIdToken ),
		logIn: jest.fn()
	};
	let logInUser;

	beforeEach( () => {
		jest.clearAllMocks();
		logInUser = new LogInUser( { logInService } );
	} );

	describe( '#execute()', () => {
		const params = { email: 'test@wilco.co', password: 'password' };

		it( 'logs in the user', async () => {
			await logInUser.execute( params );

			expect( logInService.logInWithFirebase ).toHaveBeenCalledWith( params );
			expect( logInService.logIn ).toHaveBeenCalledWith( firebaseIdToken );
		} );
	} );
} );
