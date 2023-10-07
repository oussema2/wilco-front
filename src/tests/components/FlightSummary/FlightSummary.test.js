import * as React from 'react';
import { render } from '@testing-library/react-native';
import Aircraft from '../../../entities/Aircraft';
import PostFlight from '../../../entities/PostFlight';
import PostFlightPresenter from '../../../presenters/PostFlightPresenter';
import { FlightSummary } from '../../../components/FlightSummary';

describe( 'FlightSummary', () => {
	const testID = 'test-ID';
	let postFlight;
	let presenter;
	let component;

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
		component = render( <FlightSummary testID={testID} postFlightPresenter={presenter} /> );
	};

	beforeEach( () => setUp() );

	describe( 'with the default props', () => {
		it( 'renders the FlightSummary component correctly', () => {
			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component.queryByTestId( 'origin-and-destination' ) ).toHaveTextContent( 'ABC' );
			expect( component.queryByTestId( 'origin-and-destination' ) ).toHaveTextContent( 'DEF' );
			expect( component.queryByTestId( 'origin-and-destination' ) ).toHaveTextContent( '09:05' );
			expect( component.queryByTestId( 'origin-and-destination' ) ).toHaveTextContent( '20:17' );
			expect( component.queryByTestId( 'aircraft-info' ) ).toHaveTextContent( 'Piper 111' );
			expect( component.queryByTestId( 'duration-info' ) ).toHaveTextContent( '258 m' );
			expect( component.queryByTestId( 'max-speed-info' ) ).toHaveTextContent( '23245 kts' );
			expect( component.queryByTestId( 'max-altitude-info' ) ).toHaveTextContent( '1123400 ft' );
			expect( component.queryByTestId( 'distance-info' ) ).toHaveTextContent( '946294 mi' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the post flight has no max speed', () => {
		beforeEach( () => setUp( { maxSpeed: null } ) );

		it( 'renders the FlightSummary component without max speed', () => {
			expect( component.queryByTestId( 'max-speed-info' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the post flight has no max altitude', () => {
		beforeEach( () => setUp( { maxAltitude: null } ) );

		it( 'renders the FlightSummary component without max altitude', () => {
			expect( component.queryByTestId( 'max-altitude-info' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the post flight has no distance', () => {
		beforeEach( () => setUp( { distance: null } ) );

		it( 'renders the FlightSummary component without distance', () => {
			expect( component.queryByTestId( 'distance-info' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
