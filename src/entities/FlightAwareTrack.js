import { makeAutoObservable } from 'mobx';

export default class FlightAwareTrack {
	constructor( { trackBase64 } ) {
		this.trackBase64 = trackBase64.replace( '\n', '' );

		makeAutoObservable( this );
	}

	get trackSource() {
		return { uri: `data:image/png;base64,${this.trackBase64}` };
	}

	toJSON() {
		return {
			trackBase64: this.trackBase64
		};
	}

	static fromJSON( data ) {
		return new FlightAwareTrack( {
			trackBase64: data.track_base_64
		} );
	}
}
