import Flight from '../../entities/Flight';
import FlightFactory from '../factories/FlightFactory';
import FlightAwareTrackFactory from '../factories/FlightAwareTrackFactory';

describe( 'Flight entity', () => {
	describe( '@hasTrack', () => {
		describe( 'when there is no track', () => {
			it( 'returns false', () => {
				const flight = FlightFactory.build();
				expect( flight.hasTrack ).toBe( false );
			} );
		} );

		describe( 'when there is a track', () => {
			it( 'returns true', () => {
				const flight = FlightFactory.build();
				flight.track = FlightAwareTrackFactory.build();
				expect( flight.hasTrack ).toBe( true );
			} );
		} );
	} );

	describe( '@addTrack', () => {
		it( 'sets the given track', () => {
			const flight = FlightFactory.build();
			const track = FlightAwareTrackFactory.build();

			flight.addTrack( track );

			expect( flight.track ).toBe( track );
		} );
	} );

	describe( 'fromJSON', () => {
		const flightJSON = {
			external_id: 'N922DE-1454974819-adhoc-0',
			from: 'KHPN',
			to: 'KHPN',
			departure_time: '2021-06-02T20:05:22.230Z',
			arrival_time: '2021-07-02T20:05:22.230Z',
			max_speed: 100,
			max_altitude: 2000
		};

		const flight = Flight.fromJSON( flightJSON );

		it( 'creates the flight with the correct properties', () => {
			expect( flight.externalId ).toEqual( 'N922DE-1454974819-adhoc-0' );
			expect( flight.from ).toEqual( 'KHPN' );
			expect( flight.to ).toEqual( 'KHPN' );
			expect( flight.departureTime ).toEqual( new Date( '2021-06-02T20:05:22.230Z' ) );
			expect( flight.arrivalTime ).toEqual( new Date( '2021-07-02T20:05:22.230Z' ) );
			expect( flight.maxSpeed ).toEqual( 100 );
			expect( flight.maxAltitude ).toEqual( 2000 );
		} );
	} );

	describe( 'toJSON', () => {
		const flight = FlightFactory.build();
		const json = flight.toJSON();

		it( 'returns the flight\'s json', () => {
			expect( json ).toEqual( {
				external_id: flight.externalId,
				from: flight.from,
				to: flight.to,
				departure_time: flight.departureTime,
				arrival_time: flight.arrivalTime,
				max_speed: flight.maxSpeed,
				max_altitude: flight.maxAltitude,
				aircraft_id: flight.aircraftId
			} );
		} );
	} );
} );
