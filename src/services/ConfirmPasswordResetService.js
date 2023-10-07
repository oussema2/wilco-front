import firebaseAuth from '@react-native-firebase/auth';
import ErrorFactory from '../factories/ErrorFactory';

export default class ConfirmPasswordResetService {
	constructor( {
		auth = firebaseAuth
	} = { } ) {
		this.auth = auth;
	}

	async confirmPasswordReset( { password, oobCode } ) {
		try {
			await this.auth().confirmPasswordReset( oobCode, password );
		} catch ( error ) {
			throw ErrorFactory.fromFirebaseError( error );
		}
	}
}
