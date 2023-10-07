import BlockUser from '../../interactors/BlockUser';

describe( 'BlockUser', () => {
	const pilotService = {
		blockUser: jest.fn()
	};

	const postStore = {
		deletePostsByPilotId: jest.fn()
	};

	const pilotStore = {
		delete: jest.fn()
	};

	const commentStore = {
		deleteCommentsByPilotId: jest.fn(),
		getCommentsByPilotId: jest.fn()
	};

	const notificationStore = {
		deleteNotificationsByPilotId: jest.fn()
	};

	let blockUser;

	beforeEach( () => {
		jest.clearAllMocks();

		blockUser = new BlockUser( {
			pilotService, pilotStore, postStore, commentStore, notificationStore
		} );
	} );

	describe( '@execute()', () => {
		const pilotId = 1;

		it( 'blocks pilot', async () => {
			await blockUser.execute( pilotId );
			expect( pilotService.blockUser ).toHaveBeenCalledWith( pilotId );
			expect( pilotStore.delete ).toHaveBeenCalledWith( pilotId );
			expect( postStore.deletePostsByPilotId ).toHaveBeenCalledWith( pilotId );
			expect( commentStore.deleteCommentsByPilotId ).toHaveBeenCalledWith( pilotId );
			expect( notificationStore.deleteNotificationsByPilotId ).toHaveBeenCalledWith( pilotId );
		} );
	} );
} );
