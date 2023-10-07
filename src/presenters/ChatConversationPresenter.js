import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export default class ChatConversationPresenter {
	constructor( {
		chatService,
		navigation,
		snackbarService,
		recipientChatUser,
		recipientChatUid,
		pilotID,
		analyticsService,
		makeAutoObservable
	} ) {
		this.chatService = chatService;
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.recipientChatUid = recipientChatUid;
		this.recipientChatUser = recipientChatUser;
		this.pilotID = pilotID;
		this.analyticsService = analyticsService;
		this.makeAutoObservable = makeAutoObservable;

		makeAutoObservable( this );

		if ( !this.recipientChatUser ) {
			this.getUserFromChat();
		}
	}

	getUserFromChat() {
		this.chatService.getUser( this.recipientChatUid )
			.then( ( user ) => { this.setRecipientChatUser( user ); } )
			.catch( ( error ) => {
				this.navigation.goBack();
				this.snackbarService.showError( { message: error?.message } );
			} );
	}

	setRecipientChatUser( recipientChatUser ) {
		this.recipientChatUser = recipientChatUser;
	}

	get isLoading() {
		return !this.recipientChatUser;
	}

	onChatProfilePressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.pilotProfile.name,
			{ pilotId: this.pilotID, enableBackButton: true }
		);
	}

	onSendMessageButtonPressed = ( { conversationId, receiverId } ) => {
		this.analyticsService.logSendDirectMessage( { conversationId, receiverId } );
	}
}
