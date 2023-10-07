import { makeAutoObservable } from 'mobx';

export default class Aircraft {
	constructor( {
		id,
		makeAndModel,
		tailNumber,
		pictureUrl,
		pictureThumbnailUrl
	} ) {
		this.id = id;
		this.makeAndModel = makeAndModel;
		this.tailNumber = tailNumber;
		this.pictureUrl = pictureUrl;
		this.pictureThumbnailUrl = pictureThumbnailUrl;
		this.flights = [];

		makeAutoObservable( this );
	}

	get hasTailNumber() {
		return this.tailNumber !== null;
	}

	get hasFlights() {
		return this.flights.length > 0;
	}

	get pictureSource() {
		return this._buildPictureSource( this.pictureUrl );
	}

	get pictureThumbnailSource() {
		return this._buildPictureSource( this.pictureThumbnailUrl );
	}

	addFlight( flight ) {
		const oldFlightIndex = this.flights.findIndex( ( oldFlight ) => (
			oldFlight.id === flight.id
		) );

		if ( oldFlightIndex >= 0 ) this.flights.splice( oldFlightIndex, 1 );

		this.flights.push( flight );
	}

	toJSON() {
		return {
			id: this.id,
			make_and_model: this.makeAndModel,
			tail_number: this.tailNumber,
			picture_url: this.pictureUrl,
			picture_thumbnail_url: this.pictureThumbnailUrl,
			flights: this.flights && this.flights.map( ( flight ) => flight.toJSON() )
		};
	}

	static fromJSON( data ) {
		return new Aircraft( {
			id: data.id,
			makeAndModel: data.make_and_model,
			tailNumber: data.tail_number,
			pictureUrl: data.picture_url,
			pictureThumbnailUrl: data.picture_thumbnail_url
		} );
	}

	_buildPictureSource( uri ) {
		return uri ? { uri } : null;
	}
}
