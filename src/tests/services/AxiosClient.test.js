import axios from 'axios';
import Config from 'react-native-config';
import AxiosClient from '../../services/AxiosClient';

describe( 'AxiosClient', () => {
	let client;

	beforeEach( () => {
		client = new AxiosClient();
	} );

	it( 'returns an axios instance', () => {
		const expected = axios.create( {
			baseURL: Config.REACT_APP_API_BASE_URL
		} );

		expect( JSON.stringify( client ) ).toEqual( JSON.stringify( expected ) );
	} );

	describe( 'isCancel()', () => {
		it( 'calls the axios isCancel function', () => {
			expect( client.isCancel ).toEqual( axios.isCancel );
		} );
	} );

	describe( 'createCancelToken()', () => {
		const onNewToken = jest.fn();
		let cancelToken;

		beforeEach( () => {
			cancelToken = client.createCancelToken( onNewToken );
		} );

		it( 'returns a new axios cancel token', () => {
			expect( cancelToken ).toBeInstanceOf( axios.CancelToken );
		} );

		it( 'calls the provided callback with the canceller', () => {
			expect( onNewToken ).toHaveBeenCalledWith( expect.any( Function ) );
		} );
	} );
} );
