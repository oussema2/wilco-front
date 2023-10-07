import FlightBuilder from '../../builders/FlightBuilder';
import FlightFactory from '../factories/FlightFactory';
import AircraftFactory from '../factories/AircraftFactory';
import Flight from '../../entities/Flight';
import EntityStore from '../../stores/EntityStore';

describe( 'FlightBuilder', () => {
	let builder;
	let flight;
	let aircraft;
	let flightJSON;
	let aircraftStore;
	let flightStore;
	let buildFlight;

	beforeEach( () => {
		jest.clearAllMocks();
		flight = FlightFactory.build();
		aircraft = AircraftFactory.build();
		flight.aircraftId = aircraft.id;
		flightJSON = flight.toJSON();
		aircraftStore = new EntityStore();
		aircraftStore.entities = [ aircraft ];
		flightStore = new EntityStore();
		builder = new FlightBuilder( { aircraftStore, flightStore } );

		buildFlight = () => builder.build( flightJSON );
	} );

	describe( '@build', () => {
		it( 'makes the flight\'s aircraft reference their store', () => {
			const result = buildFlight();

			expect( flightStore.find( flight.id ) ).toEqual( flight );
			expect( result ).toBeInstanceOf( Flight );
		} );
	} );

	describe( 'when the aircraft already has the flight', () => {
		it( 'doesn\'t duplicate the flight', () => {
			buildFlight();

			expect( aircraft.flights.length ).toEqual( 1 );
		} );
	} );
} );
