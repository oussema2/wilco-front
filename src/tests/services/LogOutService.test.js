import LogOutService from '../../services/LogOutService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'LogOutService', () => {
	let service;
	const pilotStore = {
		setCurrentPilotId: jest.fn(),
		deleteAll: jest.fn()
	};

	const postStore = {
		deleteAll: jest.fn()
	};

	const commentStore = {
		deleteAll: jest.fn()
	};

	const notificationStore = {
		deleteAll: jest.fn()
	};

	const api = {
		logOut: jest.fn()
	};

	const authMock = {
		signOut: jest.fn()
	};

	const auth = () => authMock;
	const dependencies = {
		auth, api, pilotStore, postStore, commentStore, notificationStore
	};

	beforeEach( () => {
		jest.clearAllMocks();
		service = new LogOutService( dependencies );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the provided values', () => {
			expect( service.auth ).toBe( dependencies.auth );
			expect( service.api ).toBe( dependencies.api );
			expect( service.pilotStore ).toBe( dependencies.pilotStore );
			expect( service.postStore ).toBe( dependencies.postStore );
			expect( service.commentStore ).toBe( dependencies.commentStore );
			expect( service.notificationStore ).toBe( dependencies.notificationStore );
		} );
	} );

	describe( 'logOutWithFirebase()', () => {
		it( 'logs out the user on firebase', async () => {
			await service.logOutWithFirebase( );
			expect( authMock.signOut ).toHaveBeenCalled( );
		} );
	} );

	describe( 'logOutWithApi()', () => {
		it( 'logs out the user', async () => {
			await service.logOutWithApi( );
			expect( api.logOut ).toHaveBeenCalled( );
		} );
	} );

	describe( 'logOutWithStore()', () => {
		it( 'removes user data from store', async () => {
			await service.logOutWithStore( );
			expect( pilotStore.setCurrentPilotId ).toHaveBeenCalled( );
			expect( postStore.deleteAll ).toHaveBeenCalled( );
			expect( commentStore.deleteAll ).toHaveBeenCalled( );
			expect( notificationStore.deleteAll ).toHaveBeenCalled( );
			expect( pilotStore.deleteAll ).toHaveBeenCalled( );
		} );
	} );
} );
