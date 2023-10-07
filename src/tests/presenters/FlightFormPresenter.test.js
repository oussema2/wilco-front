import Form from '../../forms/Form';
import {
	FLIGHT, FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME
} from '../../constants/formFields/postForm';
import postFields from '../../forms/postFields';
import FlightFormPresenter from '../../presenters/FlightFormPresenter';
import { DATE_PICKER_MODAL } from '../../constants/modals';

/* eslint-disable jest/expect-expect */

describe( 'FlightFormPresenter', () => {
	const form = new Form( { fields: postFields, hooks: {} } ).$( FLIGHT );
	const modalService = {
		open: jest.fn(),
		close: jest.fn()
	};
	const makeAutoObservable = jest.fn();
	const today = expect.any( Date );
	let presenter;

	const expectModalToHaveBeenOpenedCorrectly = ( {
		title = expect.any( String ),
		minimumDate,
		maximumDate,
		initialDate = expect.any( Date )
	} ) => {
		expect( modalService.open ).toHaveBeenCalledWith( DATE_PICKER_MODAL, {
			title,
			minimumDate,
			maximumDate,
			initialDate,
			onDatePicked: expect.any( Function )
		} );
	};

	const itOpensModalWithInitialDate = ( { title, dateField, onDateFieldPressed } ) => {
		describe( `when ${dateField} was not picked before`, () => {
			it( 'opens the date picker modal with today as inital date', () => {
				onDateFieldPressed();
				expectModalToHaveBeenOpenedCorrectly( {
					title, initialDate: today, minimumDate: undefined, maximumDate: today
				} );
			} );
		} );

		describe( `when ${dateField} was picked before`, () => {
			it( `opens the date picker modal with picked ${dateField} as inital date`, () => {
				const pickedDate = new Date( 2020, 3, 18, 13, 25 );
				form.$( dateField ).set( pickedDate );
				onDateFieldPressed();
				expectModalToHaveBeenOpenedCorrectly( {
					title, initialDate: pickedDate, minimumDate: undefined, maximumDate: today
				} );
			} );
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		form.clear();
		presenter = new FlightFormPresenter( { form, modalService, makeAutoObservable } );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.form ).toEqual( form );
			expect( presenter.modalService ).toEqual( modalService );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			[ FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME ].forEach( ( field ) => (
				expect( presenter.form.$( field ).disabled ).toBe( true )
			) );
		} );
	} );

	describe( 'isDisabled()', () => {
		describe( 'when the form was not enabled before', () => {
			it( 'returns true', () => {
				expect( presenter.isDisabled ).toBe( true );
			} );
		} );

		describe( 'when the form was enabled before', () => {
			it( 'returns false', () => {
				presenter.enable();
				expect( presenter.isDisabled ).toBe( false );
			} );

			describe( 'but it was disabled again', () => {
				it( 'returns true', () => {
					presenter.enable();
					presenter.disable();
					expect( presenter.isDisabled ).toBe( true );
				} );
			} );
		} );
	} );

	describe( '@departureTime()', () => {
		describe( 'when no departure time is set', () => {
			it( 'returns an empty string', () => {
				expect( presenter.departureTime ).toEqual( '' );
			} );
		} );

		describe( 'when a departure time is set', () => {
			it( 'returns the departure time formatted correctly', () => {
				form.$( DEPARTURE_TIME ).set( new Date( 2020, 6, 14, 8, 34 ) );
				expect( presenter.departureTime ).toEqual( 'Tuesday 14 Jul, 08:34' );
			} );
		} );
	} );

	describe( '@arrivalTime()', () => {
		describe( 'when no arrival time is set', () => {
			it( 'returns an empty string', () => {
				expect( presenter.arrivalTime ).toEqual( '' );
			} );
		} );

		describe( 'when an arrival time is set', () => {
			it( 'returns the arrival time formatted correctly', () => {
				form.$( ARRIVAL_TIME ).set( new Date( 2020, 7, 19, 17, 22 ) );
				expect( presenter.arrivalTime ).toEqual( 'Wednesday 19 Aug, 17:22' );
			} );
		} );
	} );

	describe( '@enable()', () => {
		it( 'sets all form fields as enabled', () => {
			presenter.enable();
			[ FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME ].forEach( ( field ) => (
				expect( presenter.form.$( field ).disabled ).toBe( false )
			) );
		} );
	} );

	describe( '@disable()', () => {
		it( 'sets all form fields as disabled', () => {
			presenter.enable();
			presenter.disable();
			[ FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME ].forEach( ( field ) => (
				expect( presenter.form.$( field ).disabled ).toBe( true )
			) );
		} );
	} );

	describe( '@onDepartureTimePressed()', () => {
		const sampleArrivalTime = new Date( 2020, 6, 15, 5, 27 );

		itOpensModalWithInitialDate( {
			title: 'Departure',
			dateField: DEPARTURE_TIME,
			onDateFieldPressed: () => presenter.onDepartureTimePressed()
		} );

		describe( 'when no arrival time was picked before', () => {
			it( 'opens the date picker modal with no minimum date and today as maximum date', () => {
				presenter.onDepartureTimePressed();
				expectModalToHaveBeenOpenedCorrectly( {
					minimumDate: undefined, maximumDate: today
				} );
			} );
		} );

		describe( 'when an arrival time was picked before', () => {
			it( 'opens the date picker modal with picked arrival time as maximum date', () => {
				form.$( ARRIVAL_TIME ).set( sampleArrivalTime );
				presenter.onDepartureTimePressed();
				expectModalToHaveBeenOpenedCorrectly( {
					minimumDate: undefined, maximumDate: sampleArrivalTime
				} );
			} );
		} );

		describe( 'onDatePicked callback', () => {
			const pickedDate = new Date();

			beforeEach( () => {
				// eslint-disable-next-line no-unused-vars
				modalService.open.mockImplementationOnce( ( modal, { initialDate, onDatePicked } ) => {
					onDatePicked( pickedDate );
				} );
				presenter.onDepartureTimePressed();
			} );

			it( 'sets the picked date as the selected one', () => {
				expect( form.$( DEPARTURE_TIME ).value ).toEqual( pickedDate );
			} );

			it( 'closes the date picker modal', () => {
				expect( modalService.close ).toHaveBeenCalledWith( DATE_PICKER_MODAL );
			} );
		} );
	} );

	describe( '@onArrivalTimePressed()', () => {
		const sampleDepartureTime = new Date( 2020, 6, 14, 8, 34 );

		itOpensModalWithInitialDate( {
			title: 'Arrival',
			dateField: ARRIVAL_TIME,
			onDateFieldPressed: () => presenter.onArrivalTimePressed()
		} );

		describe( 'when no departure time was picked before', () => {
			it( 'opens the date picker modal with no minimum date and today as maximum date', () => {
				presenter.onArrivalTimePressed();
				expectModalToHaveBeenOpenedCorrectly( {
					minimumDate: undefined, maximumDate: today
				} );
			} );
		} );

		describe( 'when a departure time was picked before', () => {
			it( 'opens the date picker modal with picked departure time as minimum date', () => {
				form.$( DEPARTURE_TIME ).set( sampleDepartureTime );
				presenter.onArrivalTimePressed();
				expectModalToHaveBeenOpenedCorrectly( {
					minimumDate: sampleDepartureTime, maximumDate: today
				} );
			} );
		} );

		describe( 'onDatePicked callback', () => {
			const pickedDate = new Date();

			beforeEach( () => {
				// eslint-disable-next-line no-unused-vars
				modalService.open.mockImplementationOnce( ( modal, { initialDate, onDatePicked } ) => {
					onDatePicked( pickedDate );
				} );
				presenter.onArrivalTimePressed();
			} );

			it( 'sets the picked date as the selected one', () => {
				expect( form.$( ARRIVAL_TIME ).value ).toEqual( pickedDate );
			} );

			it( 'closes the date picker modal', () => {
				expect( modalService.close ).toHaveBeenCalledWith( DATE_PICKER_MODAL );
			} );
		} );
	} );
} );
