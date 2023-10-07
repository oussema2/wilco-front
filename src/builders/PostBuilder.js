import { runInAction } from 'mobx';
import Post from '../entities/Post';

export default class PostBuilder {
	constructor( { pilotStore, aircraftStore, commentStore } ) {
		this.pilotStore = pilotStore;
		this.aircraftStore = aircraftStore;
		this.commentStore = commentStore;
	}

	getStoredPilot( pilot ) {
		return this.pilotStore.update( pilot );
	}

	getStoredAircraft( aircraft ) {
		return this.aircraftStore.update( aircraft );
	}

	_setPreviewComments( post ) {
		runInAction( () => {
			this.commentStore
				.updateSorted( post.previewComments, ( comment ) => comment.createdAt.getTime() );
		} );
	}

	build = ( postJson ) => {
		const post = Post.fromJSON( postJson );
		post.pilot = this.getStoredPilot( post.pilot );
		this._setPreviewComments( post );
		this._setStoredAircraftToFlight( post );
		return post;
	}

	_setStoredAircraftToFlight( post ) {
		if ( this._hasFlightAndAircraft( post ) ) {
			post.flight.aircraft = this.getStoredAircraft( post.flight.aircraft ) || post.flight.aircraft;
		}
	}

	_hasFlightAndAircraft( post ) {
		return post.flight?.aircraft;
	}
}
