export default class GetCurrentPilotFromStore {
	constructor( { store } ) {
		this.store = store;
	}

	execute() {
		return this.store.currentPilot;
	}
}
