import _ from 'lodash';
import { compareArrays } from '../helpers/arrays';
import { reduceSpaces } from '../helpers/strings';

export default class PreferredAirportsPresenter {
	constructor( {
		pilot,
		snackbarService,
		makeAutoObservable
	} = {} ) {
		this._initialPreferredAirports = pilot.airports;
		this._homeAirport = pilot.homeAirport;
		this._snackbarService = snackbarService;
		this._preferredAirports = [];
		this._maxPreferredAirports = 10;
		this._hasError = false;

		makeAutoObservable( this );

		this._autofillForm();
	}

	get preferredAirports() {
		return this._preferredAirports;
	}

	get hasAnyPreferredAirport() {
		return this.preferredAirports.length > 0;
	}

	get maxPreferredAirports() {
		return this._maxPreferredAirports;
	}

	addNewPreferredAirport = ( _airport ) => {
		if ( this._validateMaxAirports() ) return;

		const airport = reduceSpaces( _airport.trim( ) );
		const airportIsValid = this._airportIsValid( airport );

		if ( airportIsValid ) {
			this._preferredAirports.push( airport.toUpperCase() );
			this._setHasError( false );
			// eslint-disable-next-line consistent-return
			return true;
		}
	}

	removePreferredAirport = ( _airport ) => {
		this._setPreferredAirports( this._preferredAirports.filter( ( e ) => e !== _airport ) );
	}

	get preferredAirportsHaveChanged() {
		return !compareArrays( this.preferredAirports.slice(),
			this._initialPreferredAirports?.slice() || [] );
	}

	get hasError() {
		return this._hasError;
	}

	onInputChange = ( value, setValue ) => {
		this._setHasError( false );
		return setValue( value );
	}

	_airportIsValid( airport ) {
		const isAirportOnArray = this._isAirportOnArray( this.preferredAirports, airport );
		const isAirportEmpty = airport === '';
		const isAirportHomeAirport = this._homeAirport?.toUpperCase() === airport.toUpperCase();
		const isAirportValid = _.size( airport ) >= 3 && _.size( airport ) <= 4 && airport.match( /^([0-9]|[a-z])+([0-9a-z]+)$/i );

		this._showErrorWhenAddNewAirport( {
			isAirportOnArray, isAirportEmpty, isAirportHomeAirport, isAirportValid
		} );
		return !isAirportOnArray && !isAirportEmpty && !isAirportHomeAirport && isAirportValid;
	}

	_validateMaxAirports() {
		if ( this.preferredAirports.length >= this._maxPreferredAirports ) {
			this._snackbarService.showInfo( { message: 'You reached the limit of 10 preferences.' } );
			return true;
		}
		return false;
	}

	_isAirportOnArray( array, airport ) {
		return array?.some( ( _airport ) => _airport.toUpperCase() === airport.toUpperCase() );
	}

	_showErrorWhenAddNewAirport( {
		isAirportOnArray, isAirportEmpty, isAirportHomeAirport, isAirportValid
	} ) {
		if ( isAirportOnArray || isAirportHomeAirport ) this._snackbarService.showError( { message: 'The entered airport is already being used.' } );
		if ( isAirportEmpty ) this._snackbarService.showInfo( { message: 'The airport shouldn\'t be empty.' } );
		if ( !isAirportValid ) this._setHasError( true );
	}

	_setPreferredAirports( airports ) {
		this._preferredAirports = airports;
	}

	_autofillForm() {
		this._removeHomeAirportFromPreferredAirports();
		this._setPreferredAirports( this._initialPreferredAirports?.slice() || [] );
	}

	_removeHomeAirportFromPreferredAirports() {
		_.remove( this._initialPreferredAirports, ( n ) => n === this._homeAirport );
	}

	_setHasError( hasError ) {
		this._hasError = hasError;
	}

	get hasNewPreferredAirports( ) {
		return this.preferredAirports?.length > this._initialPreferredAirports?.length;
	}
}
