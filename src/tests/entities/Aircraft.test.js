import Aircraft from '../../entities/Aircraft';
import AircraftFactory from '../factories/AircraftFactory';
import FlightFactory from '../factories/FlightFactory';

describe( 'Aircraft entity', () => {
	describe( '@addFlight', () => {
		describe( 'when the flights wasn`t already added', () => {
			it( 'adds the flight', () => {
				const [ newFlight, ...flights ] = FlightFactory.buildList( 5 );
				const aircraft = AircraftFactory.build( { flights } );

				aircraft.addFlight( newFlight );

				expect( aircraft.flights ).toHaveLength( 5 );
				expect( aircraft.flights[ 4 ] ).toBe( newFlight );
			} );
		} );

		describe( 'when the flights was already added', () => {
			it( 'deletes the previous version and adds it at the last place', () => {
				const flights = FlightFactory.buildList( 5 );
				const newFlight = flights[ 0 ];
				const aircraft = AircraftFactory.build( { flights } );

				aircraft.addFlight( newFlight );

				expect( aircraft.flights ).toHaveLength( 5 );
				expect( aircraft.flights[ 4 ] ).toBe( newFlight );
			} );
		} );
	} );

	describe( '@pictureSource', () => {
		describe( 'when it has a picture URL', () => {
			it( 'returns the picture source built with the URL', () => {
				const aircraft = AircraftFactory.build();
				expect( aircraft.pictureSource ).toEqual( { uri: aircraft.pictureUrl } );
			} );
		} );

		describe( 'when it does not have a picture URL', () => {
			it( 'returns null', () => {
				const aircraft = AircraftFactory.build( { pictureUrl: null } );
				expect( aircraft.pictureSource ).toBeNull();
			} );
		} );
	} );

	describe( '@pictureThumbnailSource', () => {
		describe( 'when it has a picture thumbnail URL', () => {
			it( 'returns the picture thumbnail source built with the URL', () => {
				const aircraft = AircraftFactory.build();
				expect( aircraft.pictureThumbnailSource ).toEqual( { uri: aircraft.pictureThumbnailUrl } );
			} );
		} );

		describe( 'when it does not have a picture thumbnail URL', () => {
			it( 'returns null', () => {
				const aircraft = AircraftFactory.build( { pictureThumbnailUrl: null } );
				expect( aircraft.pictureThumbnailSource ).toBeNull();
			} );
		} );
	} );

	describe( 'fromJSON', () => {
		const aircraftJSON = {
			id: 1,
			make_and_model: 'Piper 111',
			tail_number: 'TN1234',
			picture_url: 'https://fake.pic/ture',
			picture_thumbnail_url: 'https://fake.thumbnail.pic/ture'
		};

		const aircraft = Aircraft.fromJSON( aircraftJSON );

		it( 'creates the aircraft with the correct properties', () => {
			expect( aircraft.id ).toEqual( 1 );
			expect( aircraft.makeAndModel ).toEqual( 'Piper 111' );
			expect( aircraft.tailNumber ).toEqual( 'TN1234' );
			expect( aircraft.pictureUrl ).toEqual( 'https://fake.pic/ture' );
			expect( aircraft.pictureThumbnailUrl ).toEqual( 'https://fake.thumbnail.pic/ture' );
		} );
	} );

	describe( 'toJSON', () => {
		const aircraft = AircraftFactory.build();
		const json = aircraft.toJSON();

		it( 'returns the aircraft\'s json', () => {
			expect( json ).toEqual( {
				id: aircraft.id,
				make_and_model: aircraft.makeAndModel,
				tail_number: aircraft.tailNumber,
				picture_url: aircraft.pictureUrl,
				picture_thumbnail_url: aircraft.pictureThumbnailUrl,
				flights: []
			} );
		} );
	} );
} );
