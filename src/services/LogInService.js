import firebaseAuth from '@react-native-firebase/auth';
import ErrorFactory from '../factories/ErrorFactory';
import Api from './Api';
import OAuthResponseDeserializer from './OAuthResponseDeserializer';

export default class LogInService {
	constructor( {
		api = new Api( { responseDeserializerKlass: OAuthResponseDeserializer } ),
		auth = firebaseAuth
	} = { } ) {
		this.auth = auth;
		this.api = api;
	}

	logInWithFirebase = async ( { email, password } ) => {
		try {
			await this.auth().signInWithEmailAndPassword( email, password );
			return this.auth().currentUser.getIdToken( true );
		} catch ( error ) {
			throw ErrorFactory.fromFirebaseError( error );
		}
	}

	logIn = async ( firebaseIdToken ) => {
		await this.api.logIn( firebaseIdToken );
	}
}
