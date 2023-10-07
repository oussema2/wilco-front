import {
	makeObservable, action, observable, computed
} from 'mobx';
import EntityStore from './EntityStore';

export default class PilotStore extends EntityStore {
	constructor() {
		super();
		this.currentPilotId = null;

		makeObservable( this, {
			setCurrentPilotId: action,
			currentPilotId: observable,
			currentPilot: computed
		} );
	}

	setCurrentPilotId( pilotId ) {
		this.currentPilotId = pilotId;
	}

	get currentPilot() {
		return this.find( this.currentPilotId );
	}
}
