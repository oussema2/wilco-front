import DateToDisplay from './ToDisplay/DateToDisplay';

export default class PostFlightPresenter {
	constructor( { postFlight } ) {
		this.postFlight = postFlight;
	}

	get from() {
		return this.postFlight.from;
	}

	get to() {
		return this.postFlight.to;
	}

	get departureTime() {
		return this._getHour( this.postFlight.departureTime );
	}

	get arrivalTime() {
		return this._getHour( this.postFlight.arrivalTime );
	}

	get pictureThumbnailSource() {
		return this.postFlight.aircraft.pictureThumbnailSource;
	}

	get makeAndModel() {
		return this.postFlight.aircraft.makeAndModel;
	}

	get duration() {
		return `${this.postFlight.duration} m`;
	}

	get maxSpeed() {
		return this._formatOptional( this.postFlight.maxSpeed, 'kts' );
	}

	get maxAltitude() {
		const altitudeInFt = +( `${this.postFlight.maxAltitude}00` );
		return this._formatOptional( altitudeInFt, 'ft' );
	}

	get distance() {
		return this._formatOptional( this.postFlight.distance, 'mi' );
	}

	get date() {
		return this._getMontAndDate( this.postFlight?.departureTime );
	}

	get id() {
		return this.postFlight.id;
	}

	_getHour( date ) {
		return new DateToDisplay( { date } ).hourAndMinutes;
	}

	_getMontAndDate( date ) {
		return new DateToDisplay( { date } ).monthAndDate;
	}

	_formatOptional( value, unit ) {
		return value ? `${value} ${unit}` : null;
	}
}
