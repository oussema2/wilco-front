export default class MockRootStore {
	constructor() {
		this.authenticationStore = {
			isAuthenticated: jest.fn( () => true )
		};
		this.aircraftStore = {};
		this.flightStore = {};
		this.postStore = {};
		this.commentStore = {};
		this.pilotStore = {
			update: jest.fn( () => {} )
		};
		this.notificationStore = {};
	}
}
