import LogOutUser from '../../interactors/LogOutUser';

describe( 'LogOutUser', () => {
	const notificationService = {
		deleteFirebaseToken: jest.fn()
	};
	const logOutService = {
		logOut: jest.fn()
	};
	const helpCenterService = {
		logout: jest.fn()
	};
	let logOutUser;

	beforeEach( () => {
		jest.clearAllMocks();
		logOutUser = new LogOutUser( { logOutService, notificationService, helpCenterService } );
	} );

	describe( '#execute()', () => {
		it( 'deletes firebase token', async () => {
			await logOutUser.execute();
			expect( notificationService.deleteFirebaseToken ).toHaveBeenCalled();
		} );

		it( 'logs out the user', async () => {
			await logOutUser.execute();
			expect( logOutService.logOut ).toHaveBeenCalled();
			expect( helpCenterService.logout ).toHaveBeenCalled();
		} );
	} );
} );
