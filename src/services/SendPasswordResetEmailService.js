import firebaseAuth from '@react-native-firebase/auth';
import ErrorFactory from '../factories/ErrorFactory';

export default class SendPasswordResetEmailService {
	constructor( {
		auth = firebaseAuth
	} = { } ) {
		this.auth = auth;
	}

	async sendPasswordResetEmail( { email } ) {
		try {
			await this.auth().sendPasswordResetEmail( email );
		} catch ( error ) {
			throw ErrorFactory.fromFirebaseError( error );
		}
	}
}
