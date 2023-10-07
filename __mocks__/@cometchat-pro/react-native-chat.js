class AppSettingsBuilder {
	constructor() {
		this.subscribePresenceForAllUsers = jest.fn( () => this );
		this.setRegion = jest.fn( () => this );
		this.build = jest.fn( () => 'settings' );
	}
}

export const CometChat = {
	init: jest.fn( () => Promise.resolve() ),
	login: jest.fn( () => Promise.resolve() ),
	logout: jest.fn( () => Promise.resolve() ),
	getUser: jest.fn( () => Promise.resolve() ),
	AppSettingsBuilder
};
