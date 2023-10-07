import { makeAutoObservable } from 'mobx';

export default class Flight {
	constructor( {
		externalId, from, to, departureTime, arrivalTime, maxSpeed, maxAltitude,
		aircraftId
	} ) {
		this.externalId = externalId;
		this.track = null;
		this.from = from;
		this.to = to;
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
		this.maxSpeed = maxSpeed;
		this.maxAltitude = maxAltitude;
		this.aircraftId = aircraftId;

		makeAutoObservable( this );
	}

	get id() {
		return this.externalId;
	}

	get hasTrack() {
		return !!this.track;
	}

	addTrack( track ) {
		this.track = track;
	}

	toJSON() {
		return {
			external_id: this.externalId,
			from: this.from,
			to: this.to,
			departure_time: this.departureTime,
			arrival_time: this.arrivalTime,
			max_speed: this.maxSpeed,
			max_altitude: this.maxAltitude,
			aircraft_id: this.aircraftId
		};
	}

	static fromJSON( data ) {
		return new Flight( {
			externalId: data.external_id,
			from: data.from,
			to: data.to,
			departureTime: new Date( data.departure_time ),
			arrivalTime: new Date( data.arrival_time ),
			maxSpeed: data.max_speed,
			maxAltitude: data.max_altitude,
			aircraftId: data.aircraft_id
		} );
	}
}
