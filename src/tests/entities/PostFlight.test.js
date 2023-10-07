import PostFlightFactory from '../factories/PostFlightFactory';
import PostFlight from '../../entities/PostFlight';

describe( 'PostFlight entity', () => {
	describe( 'fromJSON', () => {
		const postFlightJSON = {
			id: 63,
			from: 'ABC',
			to: 'DEF',
			departure_time: '2021-06-02T20:05:22.230Z',
			arrival_time: '2021-06-02T20:17:53.480Z',
			duration: 258,
			max_speed: 23245,
			max_altitude: 11234,
			distance: 946294,
			aircraft: {
				id: 4,
				make_and_model: 'Piper 111',
				tail_number: 'TN1234',
				picture_url: 'https://fake.pic/ture'
			},
			track_url: 'track/url'
		};

		const postFlight = PostFlight.fromJSON( postFlightJSON );

		it( 'creates the post flight with the correct properties', () => {
			expect( postFlight.id ).toEqual( 63 );
			expect( postFlight.from ).toEqual( 'ABC' );
			expect( postFlight.to ).toEqual( 'DEF' );
			expect( postFlight.departureTime ).toEqual( new Date( '2021-06-02T20:05:22.230Z' ) );
			expect( postFlight.arrivalTime ).toEqual( new Date( '2021-06-02T20:17:53.480Z' ) );
			expect( postFlight.duration ).toEqual( 258 );
			expect( postFlight.maxSpeed ).toEqual( 23245 );
			expect( postFlight.maxAltitude ).toEqual( 11234 );
			expect( postFlight.distance ).toEqual( 946294 );
			expect( postFlight.aircraft.id ).toEqual( 4 );
			expect( postFlight.aircraft.makeAndModel ).toEqual( 'Piper 111' );
			expect( postFlight.aircraft.tailNumber ).toEqual( 'TN1234' );
			expect( postFlight.aircraft.pictureUrl ).toEqual( 'https://fake.pic/ture' );
			expect( postFlight.trackUrl ).toEqual( 'track/url' );
		} );
	} );

	describe( 'toJSON', () => {
		const postFlight = PostFlightFactory.build();
		const json = postFlight.toJSON();

		it( 'returns the post flight\'s json', () => {
			expect( json ).toEqual( {
				id: postFlight.id,
				from: postFlight.from,
				to: postFlight.to,
				departure_time: postFlight.departureTime,
				arrival_time: postFlight.arrivalTime,
				duration: postFlight.duration,
				max_speed: postFlight.maxSpeed,
				max_altitude: postFlight.maxAltitude,
				distance: postFlight.distance,
				aircraft: postFlight.aircraft.toJSON(),
				track_url: postFlight.trackUrl
			} );
		} );
	} );
} );
