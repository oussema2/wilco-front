import { DATE_PICKER_MODAL } from '../constants/modals';
import {
	FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME
} from '../constants/formFields/postForm';
import DateToDisplay from './ToDisplay/DateToDisplay';

export default class FlightFormPresenter {
	constructor( {
		form,
		modalService,
		makeAutoObservable
	} = {} ) {
		this.form = form;
		this.modalService = modalService;
		this.disable();
		makeAutoObservable( this );
	}

	get isDisabled() {
		return this.form.$( FROM ).disabled;
	}

	get departureTime() {
		return this._formattedDateField( DEPARTURE_TIME );
	}

	get arrivalTime() {
		return this._formattedDateField( ARRIVAL_TIME );
	}

	enable() {
		this._setFieldsDisabled( false );
		this.form.validate();
	}

	disable() {
		this.form.resetValidation( true );
		this._setFieldsDisabled( true );
	}

	onDepartureTimePressed() {
		this._openDatePicker( {
			title: 'Departure',
			dateField: DEPARTURE_TIME,
			minimumDate: undefined,
			maximumDate: this._arrivalTime || new Date()
		} );
	}

	onArrivalTimePressed() {
		this._openDatePicker( {
			title: 'Arrival',
			dateField: ARRIVAL_TIME,
			minimumDate: this._departureTime || undefined,
			maximumDate: new Date()
		} );
	}

	_formattedDateField( dateField ) {
		const date = this.form.$( dateField ).value;
		return date ? new DateToDisplay( { date } ).displayFull : '';
	}

	_setFieldsDisabled( disabled ) {
		[ FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME ].forEach( ( field ) => {
			this.form.$( field ).set( 'disabled', disabled );
		} );
	}

	_openDatePicker( {
		title, dateField, minimumDate, maximumDate
	} ) {
		this.modalService.open(
			DATE_PICKER_MODAL,
			{
				title,
				minimumDate,
				maximumDate,
				initialDate: this.form.$( dateField ).value || new Date(),
				onDatePicked: ( date ) => this._updateDateAndCloseModal( dateField, date )
			}
		);
	}

	_updateDateAndCloseModal( dateField, newDate ) {
		this.form.$( dateField ).set( newDate );
		this.modalService.close( DATE_PICKER_MODAL );
	}

	get _departureTime() {
		return this.form.$( DEPARTURE_TIME ).value;
	}

	get _arrivalTime() {
		return this.form.$( ARRIVAL_TIME ).value;
	}
}
