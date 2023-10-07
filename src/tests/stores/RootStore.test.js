import RootStore from '../../stores/RootStore';
import AuthenticationStore from '../../stores/AuthenticationStore';
import EntityStore from '../../stores/EntityStore';
import PilotStore from '../../stores/PilotStore';
import NotificationStore from '../../stores/NotificationStore';

describe( 'RootStore', () => {
	let store;

	beforeEach( () => {
		store = new RootStore();
	} );

	describe( 'constructor()', () => {
		it( 'initializes authenticationStore', () => {
			expect( store.authenticationStore ).toBeInstanceOf( AuthenticationStore );
			expect( store.commentStore ).toBeInstanceOf( EntityStore );
			expect( store.postStore ).toBeInstanceOf( EntityStore );
			expect( store.pilotStore ).toBeInstanceOf( PilotStore );
			expect( store.notificationStore ).toBeInstanceOf( NotificationStore );
			expect( store.communityTagStore ).toBeInstanceOf( EntityStore );
			expect( store.roleStore ).toBeInstanceOf( EntityStore );
		} );
	} );
} );
