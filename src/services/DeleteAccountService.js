import firebaseAuth, { firebase } from '@react-native-firebase/auth';
import Api from './Api';
import ErrorFactory from '../factories/ErrorFactory';

export default class DeleteAccountService {
	constructor( {
		api = new Api(),
		auth = firebaseAuth,
		provider = firebase.auth.EmailAuthProvider
	} = { } ) {
		this.api = api;
		this.auth = auth;
		this.provider = provider;
	}

	reauthenticateWithFirebase = async ( { password } ) => {
		try {
			const { email } = this.auth().currentUser;
			const authCredential = this.provider.credential( email, password );
			await this.auth().currentUser.reauthenticateWithCredential( authCredential );
		} catch ( error ) {
			throw ErrorFactory.fromFirebaseError( error );
		}
	}

	deleteAccountWithFirebase = async () => {
		try {
			await this.auth().currentUser.delete();
		} catch ( error ) {
			throw ErrorFactory.fromFirebaseError( error );
		}
	}

	deleteAccount = async ( { password } ) => {
		await this.reauthenticateWithFirebase( { password } );
		await this.deleteAccountWithFirebase();
		await this.api.deleteAccount();
	}
}
