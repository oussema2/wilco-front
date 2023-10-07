import AvailabilityError from '../errors/AvailabilityError';
import InputError from '../errors/InputError';
import NetworkError from '../errors/NetworkError';
import UnknownError from '../errors/UnknownError';

export default class ErrorFactory {
	static fromFirebaseError( error ) {
		const errors = {
			'auth/invalid-email': { Class: InputError, name: 'invalid_email' },
			'auth/user-disabled': { Class: AvailabilityError, name: 'user_disabled' },
			'auth/user-not-found': { Class: InputError, name: 'user_not_found' },
			'auth/wrong-password': { Class: InputError, name: 'invalid_password' },
			'auth/email-already-in-use': { Class: InputError, name: 'email_in_use' },
			'auth/network-request-failed': { Class: NetworkError, name: 'network_error' },
			'auth/missing-android-pkg-name': { Class: InputError, name: 'missing_android_pkg_name' },
			'auth/missing-continue-uri': { Class: InputError, name: 'missing_continue_uri' },
			'auth/missing-ios-bundle-id': { Class: InputError, name: 'missing_ios_bundle_id' },
			'auth/invalid-continue-uri': { Class: InputError, name: 'invalid_continue_uri' },
			'auth/unauthorized-continue-uri': { Class: InputError, name: 'unauthorized_continue_uri' },
			'auth/expired-action-code': { Class: InputError, name: 'expired_action_code' },
			'auth/invalid-action-code': { Class: InputError, name: 'invalid_action_code' },
			'auth/weak-password': { Class: InputError, name: 'weak_password' },
			'auth/too-many-requests': { Class: InputError, name: 'too_many_request' },
			'other': { Class: UnknownError, name: 'unknown_error' }
		};
		const mappedError = errors[ error.code ] || errors.other;
		return new mappedError.Class( { name: mappedError.name } );
	}
}
