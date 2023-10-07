import { makeAutoObservable } from 'mobx';
import SecureStorageService from '../services/SecureStorageService';
import { TOKEN_KEY } from '../constants/storageKeys';

const EMPTY_TOKEN = '';

export default class AuthenticationStore {
	constructor( {
		storageService = new SecureStorageService()
	} = {} ) {
		this.storageService = storageService;
		this._userToken = this.storageService.getString( { key: TOKEN_KEY } );

		makeAutoObservable( this );
	}

	deleteUserToken() {
		this._userToken = EMPTY_TOKEN;
		this.storageService.setString( { key: TOKEN_KEY, value: EMPTY_TOKEN } );
	}

	setUserToken( token ) {
		this._userToken = token;
		this.storageService.setString( { key: TOKEN_KEY, value: token } );
	}

	get isAuthenticated() {
		return this._userToken !== undefined && this._userToken !== null
			&& this._userToken !== EMPTY_TOKEN;
	}

	get userToken() {
		return this._userToken;
	}
}
