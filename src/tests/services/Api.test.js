import axios from 'axios';
import Config from 'react-native-config';
import Api from '../../services/Api';
import MockHTTPClient from '../mocks/MockHTTPClient';
import NetworkError from '../../errors/NetworkError';
import AvailabilityError from '../../errors/AvailabilityError';
import InputError from '../../errors/InputError';
import UnknownError from '../../errors/UnknownError';
import ApiResponseDeserializer from '../../services/ApiResponseDeserializer';

describe( 'Api', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'constructor()', () => {
		it( 'uses the provided params', () => {
			const client = 'client';
			const responseDeserializerKlass = 'responseDeserializerKlass';
			const authenticationStore = 'authenticationStore';
			const api = new Api( { client, responseDeserializerKlass, authenticationStore } );
			expect( api.client ).toBe( client );
			expect( api.ResponseDeserializerKlass ).toBe( responseDeserializerKlass );
			expect( api.authenticationStore ).toBe( authenticationStore );
		} );

		it( 'initializes with default params', () => {
			const expected = {};
			jest.spyOn( axios, 'create' ).mockImplementationOnce( () => expected );

			const api = new Api();
			expect( axios.create ).toHaveBeenCalledWith( {
				baseURL: Config.REACT_APP_API_BASE_URL
			} );
			expect( api.ResponseDeserializerKlass ).toBe( ApiResponseDeserializer );
			expect( api.authenticationStore ).toBe( undefined );
		} );
	} );

	describe( 'requests', () => {
		const authenticationStore = {
			userToken: 'userToken',
			setUserToken: jest.fn(),
			deleteUserToken: jest.fn()
		};
		const expectedConfig = {
			headers: {
				Authorization: `Bearer ${authenticationStore.userToken}`
			}
		};
		let api;

		const itProcessesErrors = ( action, getMockedFn ) => {
			describe( 'when the request fails', () => {
				let error;
				let errorName = 'test name';
				let errorMessage = 'test message';
				const generateErrorWithStatusCode = ( statusCode ) => ( {
					response: {
						status: statusCode,
						data: {
							response: {
								error_name: 'test name',
								error_message: 'test message'
							}
						}
					}
				} );

				afterEach( () => {
					error = null;
				} );

				describe( 'with a request cancellation error', () => {
					beforeEach( () => {
						error = new Error( 'Cancellation Error' );
						getMockedFn().mockRejectedValueOnce( error );
						api.client.isCancel.mockReturnValueOnce( true );
					} );

					it( 'doesn\'t throw an error', async () => {
						await expect( action() ).resolves.toBeUndefined();
					} );
				} );

				describe( 'with a network error', () => {
					beforeEach( () => {
						error = new Error( 'Network Error' );
						getMockedFn().mockRejectedValueOnce( error );
					} );

					it( 'throws a network error', async () => {
						await expect( action() ).rejects.toEqual( new NetworkError( {
							name: error.name,
							description: error.message
						} ) );
					} );
				} );

				describe( 'with a status code 401', () => {
					beforeEach( () => {
						error = generateErrorWithStatusCode( 401 );
						getMockedFn().mockRejectedValueOnce( error );
					} );

					it( 'deletes the current user token', async () => {
						await action();
						expect( authenticationStore.deleteUserToken ).toHaveBeenCalled();
					} );
				} );

				describe( 'with a status code 404', () => {
					beforeEach( () => {
						error = generateErrorWithStatusCode( 404 );
						getMockedFn().mockRejectedValueOnce( error );
					} );

					it( 'throws an availability error', async () => {
						await expect( action() ).rejects.toEqual( new AvailabilityError( {
							name: errorName,
							description: errorMessage
						} ) );
					} );
				} );

				describe( 'with a status code 422', () => {
					beforeEach( () => {
						error = generateErrorWithStatusCode( 422 );
						getMockedFn().mockRejectedValueOnce( error );
					} );

					it( 'throws an input error', async () => {
						await expect( action() ).rejects.toEqual( new InputError( {
							name: errorName,
							description: errorMessage
						} ) );
					} );
				} );

				describe( 'with another status code', () => {
					beforeEach( () => {
						error = generateErrorWithStatusCode( 999 );
						getMockedFn().mockRejectedValueOnce( error );
					} );

					it( 'throws an unknown error', async () => {
						await expect( action() ).rejects.toEqual( new UnknownError( {
							name: errorName,
							description: errorMessage
						} ) );
					} );
				} );
			} );
		};

		beforeEach( () => {
			api = new Api( { client: new MockHTTPClient(), authenticationStore } );
		} );

		describe( '@get()', () => {
			const url = 'test/url';
			let config = {
				anotherHeader: 'anotherHeader'
			};
			let expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

			it( 'makes a get request to the client', async () => {
				await api.get( url, config );
				expect( api.client.get ).toHaveBeenCalledWith( url, expectedHeaders );
			} );

			describe( 'when authorization header is overwritten', () => {
				config = {
					Authorization: 'overwrittenToken'
				};
				expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

				it( 'makes a get request to the client', async () => {
					await api.get( url, config );
					expect( api.client.get ).toHaveBeenCalledWith( url, expectedHeaders );
				} );
			} );

			describe( 'when the request is successful', () => {
				it( 'returns the response', async () => {
					const response = 'test response';
					api.client.get.mockResolvedValueOnce( { data: { response }, status: 200 } );

					const result = await api.get( url, config );

					expect( result ).toBe( response );
				} );
			} );

			describe( 'when the request is cancellable', () => {
				const cancel = jest.fn();
				const cancellableConfig = {
					cancellable: true
				};

				beforeEach( () => {
					api.client.createCancelToken.mockImplementation( ( setToken ) => {
						setToken( cancel );
					} );
				} );

				it( 'makes a get request to the client', async () => {
					await api.get( url, cancellableConfig );
					expect( api.client.get ).toHaveBeenCalledWith( url, cancellableConfig );
				} );

				it( 'store\'s the request cancel callback', async () => {
					await api.get( url, cancellableConfig );

					expect( api.cancel ).toBe( cancel );
				} );

				it( 'cancels previous requests', async () => {
					api.get( url, cancellableConfig );
					await api.get( url, cancellableConfig );

					expect( cancel ).toHaveBeenCalledTimes( 1 );
				} );

				itProcessesErrors( () => api.get( url, cancellableConfig ), () => api.client.get );
			} );

			itProcessesErrors( () => api.get( url, config ), () => api.client.get );
		} );

		describe( '@post()', () => {
			const url = 'test/url';
			const data = {};
			let config = {
				anotherHeader: 'anotherHeader'
			};
			let expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

			it( 'makes a post request to the client', async () => {
				await api.post( url, data, config );
				expect( api.client.post ).toHaveBeenCalledWith( url, data, expectedHeaders );
			} );

			describe( 'when authorization header is overwritten', () => {
				config = {
					Authorization: 'overwrittenToken'
				};
				expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

				it( 'makes a post request to the client', async () => {
					await api.post( url, data, config );
					expect( api.client.post ).toHaveBeenCalledWith( url, data, expectedHeaders );
				} );
			} );

			describe( 'when the request is successful', () => {
				it( 'returns the response', async () => {
					const response = 'test response';
					api.client.post.mockResolvedValueOnce( { data: { response }, status: 200 } );

					const result = await api.post( url, data, config );

					expect( result ).toBe( response );
				} );
			} );

			itProcessesErrors( () => api.post( url, data, config ), () => api.client.post );
		} );

		describe( '@patch()', () => {
			const url = 'test/url';
			const data = {};
			let config = {
				anotherHeader: 'anotherHeader'
			};
			let expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

			it( 'makes a patch request to the client', async () => {
				await api.patch( url, data, config );
				expect( api.client.patch ).toHaveBeenCalledWith( url, data, expectedHeaders );
			} );

			describe( 'when authorization header is overwritten', () => {
				config = {
					Authorization: 'overwrittenToken'
				};
				expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

				it( 'makes a patch request to the client', async () => {
					await api.patch( url, data, config );
					expect( api.client.patch ).toHaveBeenCalledWith( url, data, expectedHeaders );
				} );
			} );

			describe( 'when the request is successful', () => {
				it( 'returns the response', async () => {
					const response = 'test response';
					api.client.patch.mockResolvedValueOnce( { data: { response }, status: 200 } );

					const result = await api.patch( url, data, config );

					expect( result ).toBe( response );
				} );
			} );

			itProcessesErrors( () => api.patch( url, data, config ), () => api.client.patch );
		} );

		describe( '@put()', () => {
			const url = 'test/url';
			const data = {};
			let config = {
				anotherHeader: 'anotherHeader'
			};
			let expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

			it( 'makes a put request to the client', async () => {
				await api.put( url, data, config );
				expect( api.client.put ).toHaveBeenCalledWith( url, data, expectedHeaders );
			} );

			describe( 'when authorization header is overwritten', () => {
				config = {
					Authorization: 'overwrittenToken'
				};
				expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

				it( 'makes a put request to the client', async () => {
					await api.put( url, data, config );
					expect( api.client.put ).toHaveBeenCalledWith( url, data, expectedHeaders );
				} );
			} );

			describe( 'when the request is successful', () => {
				it( 'returns the response', async () => {
					const response = 'test response';
					api.client.put.mockResolvedValueOnce( { data: { response }, status: 200 } );

					const result = await api.put( url, data, config );

					expect( result ).toBe( response );
				} );
			} );

			itProcessesErrors( () => api.put( url, data, config ), () => api.client.put );
		} );

		describe( '@delete()', () => {
			const url = 'test/url';
			let config = {
				anotherHeader: 'anotherHeader'
			};
			let expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

			it( 'makes a delete request to the client', async () => {
				await api.delete( url, config );
				expect( api.client.delete ).toHaveBeenCalledWith( url, expectedHeaders );
			} );

			describe( 'when authorization header is overwritten', () => {
				config = {
					Authorization: 'overwrittenToken'
				};
				expectedHeaders = { headers: { ...expectedConfig.headers, ...config } };

				it( 'makes a delete request to the client', async () => {
					await api.delete( url, config );
					expect( api.client.delete ).toHaveBeenCalledWith( url, expectedHeaders );
				} );
			} );

			describe( 'when the request is successful', () => {
				it( 'returns the response', async () => {
					const response = 'test response';
					api.client.delete.mockResolvedValueOnce( { data: { response }, status: 200 } );

					const result = await api.delete( url, config );

					expect( result ).toBe( response );
				} );
			} );

			itProcessesErrors( () => api.delete( url, config ), () => api.client.delete );
		} );

		describe( '@logIn()', () => {
			const assertion = 'assertion';
			const expectedUrl = '/oauth/token';
			const expectedData = {
				assertion, grant_type: 'assertion'
			};
			const config = {};

			it( 'makes a logIn request to the client', async () => {
				await api.logIn( assertion, config );
				expect( api.client.post ).toHaveBeenCalledWith( expectedUrl, expectedData, config );
			} );

			describe( 'when the request is successful', () => {
				it( 'returns the response', async () => {
					const dataResponse = {
						access_token: 'access_token',
						created_at: 1234,
						expires_in: 7200,
						token_type: 'Bearer'
					};
					api.client.post.mockResolvedValueOnce( {
						data: { response: dataResponse },
						status: 200
					} );

					const result = await api.logIn( assertion, config );

					expect( result ).toBe( dataResponse );
				} );
			} );

			itProcessesErrors( () => api.post( assertion, config ), () => api.client.post );
		} );

		describe( '@LogOut()', () => {
			const expectedUrl = '/oauth/revoke';
			const expectedData = {
				token: authenticationStore.userToken
			};
			// eslint-disable-next-line no-shadow
			const expectedConfig = {
				headers: {
					Authorization: `Bearer ${authenticationStore.userToken}`
				}
			};

			it( 'makes a logOut request to the client', async () => {
				await api.logOut();
				expect( api.client.post ).toHaveBeenCalledWith( expectedUrl, expectedData, expectedConfig );
			} );

			it( 'deletes the current user token', async () => {
				await api.logOut();
				expect( authenticationStore.deleteUserToken ).toHaveBeenCalled();
			} );
		} );
	} );
} );
