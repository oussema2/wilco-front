import React from 'react';
import { render } from '@testing-library/react-native';
import { FlightListContainer } from '../../../components/FlightListContainer';
import FlightFactory from '../../factories/FlightFactory';
import FlightToDisplay from '../../../entitiesToDisplay/FlightsToDisplay';

describe( '<FlightListContainer />', () => {
	let component;
	const testID = 'testing-FlightList-Component';
	const flights = FlightFactory.buildList( 6 );
	const flightsToDisplay = flights.map( ( flight ) => new FlightToDisplay( { flight } ) );
	const listOfFlights = [
		[ flightsToDisplay[ 0 ], flightsToDisplay[ 1 ], flightsToDisplay[ 2 ], flightsToDisplay[ 3 ],
			flightsToDisplay[ 4 ]
		], [ flightsToDisplay[ 5 ] ]
	];
	const textForEmptyList = 'We couldn’t find any flights for this tail number. Try another or upload manually!';

	const setUp = ( { listOfFlightsOverride } = {} ) => {
		component = render(
			<FlightListContainer
				testID={testID}
				listOfFlights={listOfFlightsOverride || listOfFlights}
				selectedFlightID={flightsToDisplay[ 0 ].id}
			/>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the FlightList component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'flightList-Title' ) ).toHaveTextContent(
				'Select flight'
			);
			expect( component.queryAllByTestId( 'flightsPage-0-FlightList' ) ).toBeDefined();
			expect( component.queryAllByTestId( 'flightsPage-1-FlightList' ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without flights', () => {
		beforeEach( () => setUp( { listOfFlightsOverride: [] } ) );

		it( 'renders an empty list view with the expected text', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'flightList-Title' ) ).toHaveTextContent(
				'Select flight'
			);
			expect( component.queryByTestId( 'flightsPage-0-FlightList' ) ).toBeNull();
			expect( component.queryByText( textForEmptyList ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
