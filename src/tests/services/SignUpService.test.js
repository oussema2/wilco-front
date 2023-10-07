import SignUpService from '../../services/SignUpService';
import InputError from '../../errors/InputError';

/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'SignUpService', () => {
	const api = {
		post: jest.fn()
	};
	const fakeIdToken = 'fake ID token';
	const authMock = {
		createUserWithEmailAndPassword: jest.fn(),
		currentUser: { getIdToken: () => fakeIdToken }
	};
	const auth = () => authMock;
	let service;

	beforeEach( () => {
		jest.clearAllMocks();
		service = new SignUpService( { auth, api } );
	} );

	describe( 'signUpWithFirebase()', () => {
		const email = 'test@test.com';
		const password = 'secret';

		it( 'signs up to Firebase with the given credentials', async () => {
			await service.signUpWithFirebase( { email, password } );
			expect( authMock.createUserWithEmailAndPassword ).toHaveBeenLastCalledWith( email, password );
		} );

		describe( 'when the Firebase request does not fail', () => {
			it( 'returns the Firebase\'s ID token', async () => {
				const idToken = await service.signUpWithFirebase( { email, password } );
				expect( idToken ).toEqual( fakeIdToken );
			} );
		} );

		describe( 'when the Firebase request fails', () => {
			beforeEach( () => {
				authMock.createUserWithEmailAndPassword.mockRejectedValueOnce( {
					code: 'auth/email-already-in-use'
				} );
			} );

			it( 'throws the correct error', async () => {
				await expect(
					service.signUpWithFirebase( { email, password } )
				).rejects.toThrow( InputError );
			} );

			it( 'assigns the correct name to the error', () => {
				try {
					service.signUpWithFirebase( { email, password } );
				} catch ( error ) {
					expect( error.errorName ).toEqual( 'email_in_use' );
				}
			} );
		} );
	} );

	describe( 'signUp()', () => {
		const firebaseIdToken = 'firebaseIdToken';
		const firstName = 'Wilco';
		const lastName = 'Test';
		const rolesIDs = [ 1, 2 ];
		const customRoles = [ 'role 1', 'role 2' ];
		const expectedBody = {
			id_token: firebaseIdToken,
			pilot: {
				first_name: firstName,
				last_name: lastName,
				roles: rolesIDs,
				custom_roles: customRoles
			}
		};

		it( 'requests WS to create a pilot with the given parameters', async () => {
			await service.signUp( {
				firebaseIdToken, firstName, lastName, rolesIDs, customRoles
			} );
			expect( api.post ).toHaveBeenCalledWith( '1/pilots', expectedBody );
		} );
	} );
} );
