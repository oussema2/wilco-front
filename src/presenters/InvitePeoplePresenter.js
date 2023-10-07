export default class InvitePeoplePresenter {
	constructor( {
		makeAutoObservable,
		navigation,
		rootStore,
		shareMessagesService
	} = {} ) {
		this.navigation = navigation;
		this.rootStore = rootStore;
		this.shareMessagesService = shareMessagesService;
		makeAutoObservable( this );
	}

	get backButtonWasPressed() {
		return () => this.navigation.goBack();
	}

	get title() {
		return 'Invite others';
	}

	get subtitle() {
		return 'Invite other pilots to be part of Wilco to share, learn, discover, mentor and much more.';
	}

	get buttonTitle() {
		return 'Send an invite';
	}

	shareButtonWasPressed = () => {
		this.shareMessagesService.shareMessage( {} );
	}
}
