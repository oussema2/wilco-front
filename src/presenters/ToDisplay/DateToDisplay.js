import {
	differenceInHours, differenceInMinutes, isYesterday, isToday
} from 'date-fns';

export default class DateToDisplay {
	constructor( { date } ) {
		this.date = date;
	}

	get displayShort() {
		if ( this._dateIsInTheLastMinute ) { return this._displayJustNow; }

		if ( this._dateIsInTheLastHour ) { return this._displayDistanceInMinutes; }

		if ( this._dateIsInTheLast24Hours ) { return this._displayDistanceInHours; }

		if ( this._dateIsFromYesterday ) { return this._displayShortYesterday; }

		return this._displayShortOld;
	}

	get displayFull() {
		if ( this._dateIsInTheLast24Hours ) { return this._displayFullToday; }

		if ( this._dateIsFromYesterday ) { return this._displayFullYesterday; }

		return this._displayFullOld;
	}

	get hourAndMinutes() {
		return this._dateHour;
	}

	get monthAndDate() {
		return `${this._shortMonth}. ${this._dateOfMonth}`;
	}

	get monthAndDateShort() {
		return `${this._padTwoDigits( this._monthOfYear )}/${this._padTwoDigits( this._dateOfMonth )}`;
	}

	_padTwoDigits( number ) {
		return number.toString().padStart( 2, '0' );
	}

	get _dateIsInTheLastMinute() {
		return differenceInMinutes( this._today, this.date ) === 0;
	}

	get _displayJustNow() {
		return 'Just now';
	}

	get _dateIsInTheLastHour() {
		return differenceInHours( this._today, this.date ) === 0;
	}

	get _displayDistanceInMinutes() {
		return `${differenceInMinutes( this._today, this.date )}m`;
	}

	get _dateIsInTheLast24Hours() {
		return isToday( this.date );
	}

	get _displayDistanceInHours() {
		return `${differenceInHours( this._today, this.date )}h`;
	}

	get _dateIsFromYesterday() {
		return isYesterday( this.date );
	}

	get _displayShortYesterday() {
		return `Yesterday at ${this.hourAndMinutes}`;
	}

	get _displayShortOld() {
		return `${this._longMonth} ${this._dateOfMonth} at ${this.hourAndMinutes}`;
	}

	get _displayFullToday() {
		return `Today, ${this.hourAndMinutes}`;
	}

	get _displayFullYesterday() {
		return `Yesterday, ${this.hourAndMinutes}`;
	}

	get _displayFullOld() {
		return `${this._weekday} ${this._dateOfMonth} ${this._shortMonth}, ${this.hourAndMinutes}`;
	}

	get _weekday() {
		return this.date.toLocaleString( 'en-US', { weekday: 'long' } );
	}

	get _shortMonth() {
		return this._month( 'short' );
	}

	get _longMonth() {
		return this._month( 'long' );
	}

	get _dateOfMonth() {
		return this.date.getDate();
	}

	get _monthOfYear() {
		return this.date.getMonth() + 1;
	}

	get _dateHour() {
		const hours = this.date.getHours().toLocaleString( 'en-US', {
			minimumIntegerDigits: 2, useGrouping: false
		} );
		const minutes = this.date.getMinutes().toLocaleString( 'en-US', {
			minimumIntegerDigits: 2, useGrouping: false
		} );
		return `${hours}:${minutes}`;
	}

	get _today() {
		return new Date();
	}

	_month( variant ) {
		return this.date.toLocaleString( 'en-US', { month: variant } );
	}
}
