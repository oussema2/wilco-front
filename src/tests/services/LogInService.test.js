import LogInService from '../../services/LogInService';
import AvailabilityError from '../../errors/AvailabilityError';
import InputError from '../../errors/InputError';
import NetworkError from '../../errors/NetworkError';

/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'LogInService', () => {
	let service;
	const api = {
		logIn: jest.fn()
	};
	const fakeIdToken = 'fake ID token';
	const authMock = {
		signInWithEmailAndPassword: jest.fn(),
		currentUser: { getIdToken: () => fakeIdToken }
	};
	const auth = () => authMock;
	const dependencies = { auth, api };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new LogInService( dependencies );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the provided values', () => {
			expect( service.auth ).toBe( dependencies.auth );
			expect( service.api ).toBe( dependencies.api );
		} );
	} );

	describe( 'logInWithFirebase()', () => {
		const email = 'test@test.com';
		const password = 'secret';

		it( 'signs in to Firebase with the given credentials', async () => {
			await service.logInWithFirebase( { email, password } );
			expect( authMock.signInWithEmailAndPassword ).toHaveBeenLastCalledWith( email, password );
		} );

		describe( 'when the Firebase request does not fail', () => {
			it( 'returns the Firebase\'s ID token', async () => {
				expect( await service.logInWithFirebase( { email, password } ) ).toEqual( fakeIdToken );
			} );
		} );

		describe( 'when the Firebase request fails', () => {
			const itThrowsError = ( { klass, name, firebaseCode } ) => {
				it( 'throws the correct error', async () => {
					authMock.signInWithEmailAndPassword.mockRejectedValueOnce( { code: firebaseCode } );
					await expect(
						service.logInWithFirebase( { email, password } )
					).rejects.toThrow( klass );
				} );

				it( 'assigns the correct name to the thrown error', async () => {
					authMock.signInWithEmailAndPassword.mockRejectedValueOnce( { code: firebaseCode } );
					try {
						service.logInWithFirebase( { email, password } );
					} catch ( error ) {
						expect( error.errorName ).toEqual( name );
					}
				} );
			};

			describe( 'when the Firebase error code is auth/invalid-email', () => {
				itThrowsError( {
					klass: InputError,
					name: 'invalid_email',
					firebaseCode: 'auth/invalid-email'
				} );
			} );

			describe( 'when the Firebase error code is auth/user-disabled', () => {
				itThrowsError( {
					klass: AvailabilityError,
					name: 'user_disabled',
					firebaseCode: 'auth/user-disabled'
				} );
			} );

			describe( 'when the Firebase error code is auth/user-not-found', () => {
				itThrowsError( {
					klass: InputError,
					name: 'user_not_found',
					firebaseCode: 'auth/user-not-found'
				} );
			} );

			describe( 'when the Firebase error code is auth/wrong-password', () => {
				itThrowsError( {
					klass: InputError,
					name: 'invalid_password',
					firebaseCode: 'auth/wrong-password'
				} );
			} );

			describe( 'when the Firebase error code is auth/network-request-failed', () => {
				itThrowsError( {
					klass: NetworkError,
					name: 'invalid_password',
					firebaseCode: 'auth/network-request-failed'
				} );
			} );
		} );
	} );

	describe( 'logIn()', () => {
		const firebaseIdToken = 'firebaseIdToken';

		it( 'logs in the user', async () => {
			await service.logIn( firebaseIdToken );
			expect( api.logIn ).toHaveBeenCalledWith( firebaseIdToken );
		} );
	} );
} );
