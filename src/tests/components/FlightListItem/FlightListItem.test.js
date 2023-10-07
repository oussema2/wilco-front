import React from 'react';
import { render } from '@testing-library/react-native';
import { FlightListItem } from '../../../components/FlightListItem';
import FlightFactory from '../../factories/FlightFactory';
import FlightToDisplay from '../../../entitiesToDisplay/FlightsToDisplay';

describe( '<FlightListItem />', () => {
	let component;
	const testID = 'testing-FlightListItem-Component';
	const flight = FlightFactory.build();
	const flightToDisplay = new FlightToDisplay( { flight } );

	const setUp = () => {
		component = render(
			<FlightListItem testID={testID} flight={flightToDisplay} />
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the FlightListItem component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'departureAirport-Text' ) ).toHaveTextContent(
				flight.from
			);
			expect( component.queryByTestId( 'rightArrow-Image' ) ).toBeDefined();
			expect( component.queryByTestId( 'arrivalAirport-Text' ) ).toHaveTextContent(
				flight.to
			);
			expect( component.queryByTestId( 'hourSeparator-Text' ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
