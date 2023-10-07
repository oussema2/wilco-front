import FlightToDisplay from '../../entitiesToDisplay/FlightsToDisplay';
import DateToDisplay from '../../presenters/ToDisplay/DateToDisplay';
import FlightFactory from '../factories/FlightFactory';

describe( 'FlightToDisplay', () => {
	const flight = FlightFactory.build();
	const flightToDisplay = new FlightToDisplay( { flight } );

	describe( '@id', () => {
		it( 'returns the flight id', () => {
			expect( flightToDisplay.id ).toEqual( flight.id );
		} );
	} );

	describe( '@from', () => {
		it( 'returns the flight from airport', () => {
			expect( flightToDisplay.from ).toEqual( flight.from );
		} );
	} );

	describe( '@to', () => {
		it( 'returns the flight to airport', () => {
			expect( flightToDisplay.to ).toEqual( flight.to );
		} );
	} );

	describe( '@departureTime', () => {
		it( 'returns the flight departure hour and minutes', () => {
			const expectedDepartureTime = new DateToDisplay( { date: flight.departureTime }
			).hourAndMinutes;
			expect( flightToDisplay.departureTime ).toEqual( expectedDepartureTime );
		} );
	} );

	describe( '@arrivalTime', () => {
		it( 'returns the flight departure hour and minutes', () => {
			const expectedArrivalTime = new DateToDisplay( { date: flight.arrivalTime } ).hourAndMinutes;
			expect( flightToDisplay.arrivalTime ).toEqual( expectedArrivalTime );
		} );
	} );

	describe( '@date', () => {
		it( 'returns the flight date month and number', () => {
			const expectedDate = new DateToDisplay( { date: flight.departureTime } ).monthAndDate;
			expect( flightToDisplay.date ).toEqual( expectedDate );
		} );
	} );
} );
