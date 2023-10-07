import Config from 'react-native-config';
import ChatService from '../../services/ChatService';
import { itSingletonSharedMethod } from '../sharedExamples/singletonSharedMethod';

describe( 'ChatService', () => {
	const backendMock = {
		init: jest.fn( () => Promise.resolve() ),
		login: jest.fn( () => Promise.resolve() ),
		logout: jest.fn( () => Promise.resolve() ),
		getUser: jest.fn( () => Promise.resolve() )
	};

	const settingsBuilderMock = {
		subscribePresenceForAllUsers: jest.fn( () => settingsBuilderMock ),
		setRegion: jest.fn( () => settingsBuilderMock ),
		build: jest.fn( () => 'settings' )
	};

	const createService = () => {
		const service = new ChatService( {
			backend: backendMock,
			settingsBuilder: settingsBuilderMock
		} );

		return { service };
	};

	beforeEach( () => {
		backendMock.init.mockClear();
		backendMock.login.mockClear();

		settingsBuilderMock.subscribePresenceForAllUsers.mockClear();
		settingsBuilderMock.setRegion.mockClear();
		settingsBuilderMock.build.mockClear();
	} );

	describe( 'constructor()', () => {
		it( 'sets app id and region from config', () => {
			const { service } = createService();

			expect( service.appID ).toEqual( Config.CHAT_APP_ID );
			expect( service.region ).toEqual( Config.CHAT_REGION );
			expect( service.authKey ).toEqual( Config.CHAT_AUTH_KEY );
		} );
	} );

	describe( 'shared()', () => {
		itSingletonSharedMethod( ChatService );
	} );

	describe( 'init()', () => {
		it( 'calls the backend with the app id and the settings', () => {
			const { service } = createService();

			service.init();

			expect( backendMock.init ).toHaveBeenCalledWith(
				service.appID, 'settings'
			);
		} );
	} );

	describe( 'login()', () => {
		it( 'calls the backend with the passed cometchat user token', async () => {
			const cometchatAuthToken = 'cometchat-user-token';

			const { service } = createService();

			await service.login( { cometchatAuthToken } );

			expect( backendMock.login ).toHaveBeenCalledWith( cometchatAuthToken );
		} );
	} );

	describe( 'logout()', () => {
		it( 'calls the backend', async () => {
			const { service } = createService();

			await service.logout();

			expect( backendMock.logout ).toHaveBeenCalled();
		} );
	} );

	describe( 'getUser()', () => {
		it( 'calls the backend with the passed uid', async () => {
			const recipientCometchatUid = 'cometchat-user-token';

			const { service } = createService();

			await service.getUser( recipientCometchatUid );

			expect( backendMock.getUser ).toHaveBeenCalledWith( recipientCometchatUid );
		} );
	} );
} );
