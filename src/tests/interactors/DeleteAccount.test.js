import DeleteAccount from '../../interactors/DeleteAccount';

describe( 'DeleteAccount', () => {
	const deleteAccountService = {
		deleteAccount: jest.fn(),
		deleteCurrentPilotId: jest.fn()
	};

	const logOutService = {
		logOutWithStore: jest.fn()
	};

	let deleteUser;

	beforeEach( () => {
		jest.clearAllMocks();
		deleteUser = new DeleteAccount( { deleteAccountService, logOutService } );
	} );

	describe( '#execute()', () => {
		it( 'deletes user account', async () => {
			await deleteUser.execute( { password: 'password' } );
			expect( deleteAccountService.deleteAccount ).toHaveBeenCalled();
			expect( logOutService.logOutWithStore ).toHaveBeenCalled();
		} );
	} );
} );
