import AxiosClient from './AxiosClient';
import UnknownError from '../errors/UnknownError';
import AvailabilityError from '../errors/AvailabilityError';
import NetworkError from '../errors/NetworkError';
import InputError from '../errors/InputError';
import ApiResponseDeserializer from './ApiResponseDeserializer';

export default class Api {
	constructor( {
		client,
		responseDeserializerKlass,
		authenticationStore
	} = {
		client: new AxiosClient(),
		responseDeserializerKlass: ApiResponseDeserializer
	} ) {
		this.client = client ?? new AxiosClient();
		this.ResponseDeserializerKlass = responseDeserializerKlass ?? ApiResponseDeserializer;
		this.authenticationStore = authenticationStore;
	}

	get = ( url, config ) => {
		if ( config?.cancellable ) {
			return this.makeCancellableRequest( url, config );
		}

		return this.makeRequest(
			() => this.client.get( url, this._headers( config ) )
		);
	};

	delete = ( url, config ) => this.makeRequest(
		() => this.client.delete( url, this._headers( config ) )
	);

	post = ( url, data, config ) => this.makeRequest(
		() => this.client.post( url, data, this._headers( config ) )
	);

	patch = ( url, data, config ) => this.makeRequest(
		() => this.client.patch( url, data, this._headers( config ) )
	);

	put = ( url, data, config ) => this.makeRequest(
		() => this.client.put( url, data, this._headers( config ) )
	);

	delete = ( url, config ) => this.makeRequest(
		() => this.client.delete( url, this._headers( config ) )
	);

	logIn = async ( assertion, config ) => {
		const oauthToken = await this.makeRequest(
			() => this.client.post(
				'/oauth/token', {
					assertion, grant_type: 'assertion'
				},
				config
			)
		);
		this.authenticationStore.setUserToken( oauthToken.access_token );
		return oauthToken;
	};

	logOut = async () => {
		await this._revokeToken();
		await this._deleteUserToken();
	};

	deleteAccount = async () => {
		await this._deleteAccount();
		await this._deleteUserToken();
	};

	_deleteAccount = async () => {
		await this.delete( '/1/pilots/me' );
	}

	_revokeToken = async () => {
		try {
			await this.post( '/oauth/revoke', { token: this._userToken } );
		} catch ( e ) {
		}
	}

	_deleteUserToken = async () => {
		this.authenticationStore.deleteUserToken();
	};

	makeRequest = async (
		request
	) => {
		try {
			const response = await request();
			const responseDeserializer = new this.ResponseDeserializerKlass( { response } );
			return responseDeserializer.deserializeResponse();
		} catch ( error ) {
			return this.processErrorResponse( error );
		}
	};

	_headers( config ) {
		return {
			headers: {
				...this._authenticationHeader,
				...config
			}
		};
	}

	get _authenticationHeader() {
		return { Authorization: `Bearer ${this._userToken}` };
	}

	get _userToken() {
		return this.authenticationStore.userToken;
	}

	makeCancellableRequest = async ( url, config ) => {
		if ( this.cancel !== undefined ) this.cancel();
		config.cancelToken = this.client.createCancelToken( ( newToken ) => {
			this.cancel = newToken;
		} );

		return this.makeRequest(
			() => this.client.get( url, config )
		);
	};

	processErrorResponse = ( error ) => {
		if ( this.client.isCancel( error ) ) return;
		if ( error.message === 'Network Error' ) throw new NetworkError( { name: error.name, description: error.message } );

		const responseDeserializer = new this.ResponseDeserializerKlass( { response: error.response } );
		const response = responseDeserializer.deserializeResponse();

		switch ( response.statusCode ) {
		case 401:
			this.authenticationStore.deleteUserToken();
			return;
		case 404:
			throw new AvailabilityError( { name: response.name, description: response.description } );
		case 422:
			throw new InputError( { name: response.name, description: response.description } );
		default:
			throw new UnknownError( { name: response.name, description: response.description } );
		}
	};
}
