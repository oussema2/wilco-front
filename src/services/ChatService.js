import Config from 'react-native-config';
import { CometChat } from '@cometchat-pro/react-native-chat';

let sharedInstance;

export default class ChatService {
	constructor( {
		backend = CometChat,
		settingsBuilder = new CometChat.AppSettingsBuilder(),
		appID = Config.CHAT_APP_ID,
		region = Config.CHAT_REGION
	} = {} ) {
		this.backend = backend;
		this.settingsBuilder = settingsBuilder;
		this.appID = appID;
		this.region = region;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new ChatService();
		return sharedInstance;
	}

	init = () => {
		const settings = this
			.settingsBuilder
			.subscribePresenceForAllUsers()
			.setRegion( this.region )
			.build();

		return this.backend.init( this.appID, settings );
	}

	login = ( pilot ) => this.backend.login( pilot?.cometchatAuthToken )

	logout = () => this.backend.logout()

	getUser = ( uid ) => this.backend.getUser( uid )
}
