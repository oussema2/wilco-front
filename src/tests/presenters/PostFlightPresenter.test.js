import PostFlightPresenter from '../../presenters/PostFlightPresenter';
import PostFlight from '../../entities/PostFlight';
import Aircraft from '../../entities/Aircraft';

describe( 'PostFlightPresenter', () => {
	let postFlight;
	let presenter;

	const setUp = ( postFlightParams = {} ) => {
		postFlight = new PostFlight( {
			id: 63,
			from: 'ABC',
			to: 'DEF',
			departureTime: new Date( '2021-06-02T09:05:22.230Z' ),
			arrivalTime: new Date( '2021-06-02T20:17:53.480Z' ),
			duration: 258,
			maxSpeed: 23245,
			maxAltitude: 11234,
			distance: 946294,
			aircraft: new Aircraft( {
				id: 4,
				makeAndModel: 'Piper 111',
				tailNumber: 'TN1234',
				pictureUrl: 'https://fake.pic/ture',
				pictureThumbnailUrl: 'https://fake.pic/ture/thumbnail'
			} ),
			...postFlightParams
		} );
		presenter = new PostFlightPresenter( { postFlight } );
	};

	beforeEach( () => setUp() );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.postFlight ).toEqual( postFlight );
		} );
	} );

	describe( '@from', () => {
		it( 'returns the post flight origin', () => {
			expect( presenter.from ).toEqual( 'ABC' );
		} );
	} );

	describe( '@to', () => {
		it( 'returns the post flight\'s destination', () => {
			expect( presenter.to ).toEqual( 'DEF' );
		} );
	} );

	describe( '@departureTime', () => {
		it( 'returns the post flight\'s departure hour', () => {
			expect( presenter.departureTime ).toEqual( '09:05' );
		} );
	} );

	describe( '@arrivalTime', () => {
		it( 'returns the post flight\'s arrival hour', () => {
			expect( presenter.arrivalTime ).toEqual( '20:17' );
		} );
	} );

	describe( '@pictureThumbnailSource', () => {
		it( 'returns the post flight aircraft\'s picture thumbnail source', () => {
			expect( presenter.pictureThumbnailSource ).toEqual( { uri: 'https://fake.pic/ture/thumbnail' } );
		} );
	} );

	describe( '@makeAndModel', () => {
		it( 'returns the post flight aircraft\'s make and model', () => {
			expect( presenter.makeAndModel ).toEqual( 'Piper 111' );
		} );
	} );

	describe( '@duration', () => {
		it( 'returns the post flight\'s duration in minutes', () => {
			expect( presenter.duration ).toEqual( '258 m' );
		} );
	} );

	describe( '@date', () => {
		it( 'returns the post flight\'s date', () => {
			expect( presenter.date ).toEqual( 'Jun. 2' );
		} );
	} );

	describe( '@id', () => {
		it( 'returns the post flight\'s id', () => {
			expect( presenter.id ).toEqual( 63 );
		} );
	} );

	describe( '@maxSpeed', () => {
		describe( 'when the post flight has max speed', () => {
			it( 'returns the max speed in knots', () => {
				expect( presenter.maxSpeed ).toEqual( '23245 kts' );
			} );
		} );

		describe( 'when the post flight has no max speed', () => {
			beforeEach( () => setUp( { maxSpeed: null } ) );

			it( 'returns null', () => {
				expect( presenter.maxSpeed ).toBeNull();
			} );
		} );
	} );

	describe( '@maxAltitude', () => {
		describe( 'when the post flight has max altutude', () => {
			it( 'returns the max altitude in feet', () => {
				expect( presenter.maxAltitude ).toEqual( '1123400 ft' );
			} );
		} );

		describe( 'when the post flight has no max altitude', () => {
			beforeEach( () => setUp( { maxAltitude: null } ) );

			it( 'returns null', () => {
				expect( presenter.maxAltitude ).toBeNull();
			} );
		} );
	} );

	describe( '@distance', () => {
		describe( 'when the post flight has distance', () => {
			it( 'returns the distance in miles', () => {
				expect( presenter.distance ).toEqual( '946294 mi' );
			} );
		} );

		describe( 'when the post flight has no distance', () => {
			beforeEach( () => setUp( { distance: null } ) );

			it( 'returns null', () => {
				expect( presenter.distance ).toBeNull();
			} );
		} );
	} );
} );
