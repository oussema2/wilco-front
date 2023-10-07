import ChatConversationPresenter from '../../presenters/ChatConversationPresenter';
import NetworkError from '../../errors/NetworkError';
import flushPromises from '../support/flushPromises';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import PilotFactory from '../factories/PilotFactory';

describe( 'ChatConversationPresenter', () => {
	const makeAutoObservable = jest.fn();
	const userChatMock = { user: { uid: '2' } };
	const chatService = {
		init: jest.fn(),
		getUser: jest.fn( () => Promise.resolve( userChatMock ) )
	};
	const snackbarService = { showError: jest.fn() };
	const navigation = { goBack: jest.fn(), navigate: jest.fn() };

	const recipientChatUid = '1';
	const pilot = PilotFactory.build();
	const pilotID = pilot.id;
	let presenter;

	const createPresenter = ( recipientChatUser = null ) => {
		presenter = new ChatConversationPresenter( {
			chatService,
			snackbarService,
			navigation,
			recipientChatUser,
			recipientChatUid,
			pilotID,
			makeAutoObservable
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		createPresenter();
	} );

	const itInitializesChatConversationPresenter = () => {
		it( 'initializes ChatConversationPresenter with the correct data', () => {
			expect( presenter.chatService ).toEqual( chatService );
			expect( presenter.snackbarService ).toEqual( snackbarService );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.pilotID ).toEqual( pilotID );
			expect( presenter.makeAutoObservable ).toEqual( makeAutoObservable );
			expect( presenter.recipientChatUid ).toEqual( recipientChatUid );
		} );
	};

	describe( 'constructor()', () => {
		describe( 'when the recipient user is received by parameter', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				createPresenter( userChatMock );
			} );

			itInitializesChatConversationPresenter();

			it( 'does not call to chat service', () => {
				expect( chatService.getUser ).not.toHaveBeenCalledWith( recipientChatUid );
			} );
		} );

		describe( 'when the recipient user is not received by parameter', () => {
			itInitializesChatConversationPresenter();

			it( 'calls to getUser from chat service', () => {
				expect( chatService.getUser ).toHaveBeenCalledWith( recipientChatUid );
			} );
		} );
	} );

	describe( 'getUserFromChat()', () => {
		beforeEach( async () => {
			await presenter.getUserFromChat();
		} );

		it( 'calls to getUser from chat service', async () => {
			expect( chatService.getUser ).toHaveBeenCalledWith( recipientChatUid );
		} );

		describe( 'when the request does not fails', () => {
			it( 'saves chat user response on presenter', async () => {
				expect( presenter.recipientChatUser ).toBe( userChatMock );
			} );
		} );

		describe( 'when the request fails', () => {
			beforeEach( async () => {
				chatService.getUser.mockRejectedValueOnce( new NetworkError() );
				await presenter.getUserFromChat();
			} );

			it( 'goes back', async () => {
				expect( navigation.goBack ).toHaveBeenCalled();
			} );

			it( 'shows an snackbar', async () => {
				expect( snackbarService.showError ).toHaveBeenCalled();
			} );
		} );
	} );

	describe( 'isLoading()', () => {
		describe( 'when the recipient user is not received by parameter', () => {
			beforeEach( () => {
				createPresenter();
			} );

			describe( 'when it did not finish the request to web service', () => {
				it( 'returns true', async () => {
					presenter.getUserFromChat();
					expect( presenter.isLoading ).toBeTruthy();
				} );
			} );

			describe( 'when it finished the request to web service', () => {
				it( 'returns false', async () => {
					await flushPromises();
					expect( presenter.isLoading ).toBeFalsy();
				} );
			} );
		} );

		describe( 'when the recipient user is received by parameter', () => {
			beforeEach( () => {
				createPresenter( userChatMock );
			} );

			it( 'returns false', async () => {
				expect( presenter.isLoading ).toBeFalsy();
			} );
		} );
	} );

	describe( 'onChatProfilePressed', () => {
		describe( 'when the chat profile is pressed', () => {
			it( 'navigates to the pilot profile screen', () => {
				presenter.onChatProfilePressed();
				expect( navigation.navigate ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true, pilotId: pilotID }
				);
			} );
		} );
	} );
} );
