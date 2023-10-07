import ErrorFactory from '../../factories/ErrorFactory';
import AvailabilityError from '../../errors/AvailabilityError';
import InputError from '../../errors/InputError';
import NetworkError from '../../errors/NetworkError';
import UnknownError from '../../errors/UnknownError';

describe( 'ErrorFactory', () => {
	describe( 'fromFirebaseError', () => {
		const itReturnsError = ( { klass, name, firebaseCode } ) => {
			it( 'returns the correct error', () => {
				const error = ErrorFactory.fromFirebaseError( { code: firebaseCode } );
				expect( error ).toBeInstanceOf( klass );
				expect( error.errorName ).toEqual( name );
			} );
		};

		describe( 'when the error has invalid-email code', () => {
			itReturnsError( {
				klass: InputError,
				name: 'invalid_email',
				firebaseCode: 'auth/invalid-email'
			} );
		} );

		describe( 'when the error has user-disabled code', () => {
			itReturnsError( {
				klass: AvailabilityError,
				name: 'user_disabled',
				firebaseCode: 'auth/user-disabled'
			} );
		} );

		describe( 'when the error has user-not-found code', () => {
			itReturnsError( {
				klass: InputError,
				name: 'user_not_found',
				firebaseCode: 'auth/user-not-found'
			} );
		} );

		describe( 'when the error has wrong-password code', () => {
			itReturnsError( {
				klass: InputError,
				name: 'invalid_password',
				firebaseCode: 'auth/wrong-password'
			} );
		} );

		describe( 'when the error has email-already-in-use code', () => {
			itReturnsError( {
				klass: InputError,
				name: 'email_in_use',
				firebaseCode: 'auth/email-already-in-use'
			} );
		} );

		describe( 'when the error has network-request-failed code', () => {
			itReturnsError( {
				klass: NetworkError,
				name: 'network_error',
				firebaseCode: 'auth/network-request-failed'
			} );
		} );

		describe( 'when the error has an unknown code', () => {
			itReturnsError( {
				klass: UnknownError,
				name: 'unknown_error',
				firebaseCode: 'auth/unknown'
			} );
		} );
	} );
} );
