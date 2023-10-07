import { makeAutoObservable } from 'mobx';
import Aircraft from './Aircraft';

export default class PostFlight {
	constructor( {
		id, from, to, departureTime, arrivalTime, duration, maxSpeed, maxAltitude, distance,
		aircraft, trackUrl
	} ) {
		this.id = id;
		this.from = from;
		this.to = to;
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
		this.duration = duration;
		this.maxSpeed = maxSpeed;
		this.maxAltitude = maxAltitude;
		this.distance = distance;
		this.aircraft = aircraft;
		this.trackUrl = trackUrl;

		makeAutoObservable( this );
	}

	toJSON() {
		return {
			id: this.id,
			from: this.from,
			to: this.to,
			departure_time: this.departureTime,
			arrival_time: this.arrivalTime,
			duration: this.duration,
			max_speed: this.maxSpeed,
			max_altitude: this.maxAltitude,
			distance: this.distance,
			aircraft: this.aircraft.toJSON(),
			track_url: this.trackUrl
		};
	}

	static fromJSON( data ) {
		return new PostFlight( {
			id: data.id,
			from: data.from,
			to: data.to,
			departureTime: new Date( data.departure_time ),
			arrivalTime: new Date( data.arrival_time ),
			duration: data.duration,
			maxSpeed: data.max_speed,
			maxAltitude: data.max_altitude,
			distance: data.distance,
			aircraft: Aircraft.fromJSON( data.aircraft ),
			trackUrl: data.track_url
		} );
	}
}
