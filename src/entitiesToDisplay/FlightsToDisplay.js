import DateToDisplay from '../presenters/ToDisplay/DateToDisplay';

export default class FlightToDisplay {
	constructor( { flight } ) {
		this.flight = flight;
	}

	get id() {
		return this.flight.id;
	}

	get from() {
		return this.flight.from;
	}

	get to() {
		return this.flight.to;
	}

	get departureTime() {
		return new DateToDisplay( { date: this.flight.departureTime } ).hourAndMinutes;
	}

	get arrivalTime() {
		return new DateToDisplay( { date: this.flight.arrivalTime } ).hourAndMinutes;
	}

	get date() {
		return new DateToDisplay( { date: this.flight.departureTime } ).monthAndDate;
	}

	get shortDate() {
		return new DateToDisplay( { date: this.flight.departureTime } ).monthAndDateShort;
	}
}
