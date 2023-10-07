import SignUpUser from '../../interactors/SignUpUser';

describe( 'SignUpUser', () => {
	const firebaseIdToken = 'firebaseIdToken';
	const signUpService = {
		signUpWithFirebase: jest.fn( () => firebaseIdToken ),
		signUp: jest.fn()
	};
	const logInService = {
		logIn: jest.fn()
	};
	let signUpUser;

	beforeEach( () => {
		jest.clearAllMocks();
		signUpUser = new SignUpUser( { signUpService, logInService } );
	} );

	describe( '#execute()', () => {
		const params = {
			email: 'test@wilco.co',
			password: 'password',
			firstName: 'Wilco',
			lastName: 'Test',
			rolesIDs: [ 1, 2 ],
			customRoles: [ 'role 1', 'role 2' ]
		};

		it( 'signs up the user with Firebase and WS', async () => {
			await signUpUser.execute( params );
			expect( signUpService.signUpWithFirebase ).toHaveBeenCalledWith( {
				email: params.email,
				password: params.password
			} );
			expect( signUpService.signUp ).toHaveBeenCalledWith( {
				firebaseIdToken,
				firstName: params.firstName,
				lastName: params.lastName,
				rolesIDs: params.rolesIDs,
				customRoles: params.customRoles
			} );
		} );

		it( 'logs in the user with the received Firebase ID token', async () => {
			await signUpUser.execute( params );
			expect( logInService.logIn ).toHaveBeenCalledWith( firebaseIdToken );
		} );
	} );
} );
