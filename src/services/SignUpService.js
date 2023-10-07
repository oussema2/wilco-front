import firebaseAuth from '@react-native-firebase/auth';
import ErrorFactory from '../factories/ErrorFactory';
import Api from './Api';

export default class SignUpService {
	constructor( {
		auth = firebaseAuth,
		api = new Api()
	} = { } ) {
		this.auth = auth;
		this.api = api;
	}

	async signUpWithFirebase( { email, password } ) {
		try {
			await this.auth().createUserWithEmailAndPassword( email, password );
			return this.auth().currentUser.getIdToken( true );
		} catch ( error ) {
			throw ErrorFactory.fromFirebaseError( error );
		}
	}

	async signUp( {
		firebaseIdToken, firstName, lastName, rolesIDs, customRoles
	} ) {
		await this.api.post( '1/pilots', this._signUpBody( {
			firebaseIdToken, firstName, lastName, rolesIDs, customRoles
		} ) );
	}

	_signUpBody( {
		firebaseIdToken, firstName, lastName, rolesIDs, customRoles
	} ) {
		return {
			id_token: firebaseIdToken,
			pilot: {
				first_name: firstName,
				last_name: lastName,
				roles: rolesIDs,
				custom_roles: customRoles
			}
		};
	}
}
