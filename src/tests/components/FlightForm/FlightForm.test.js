import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FlightForm } from '../../../components/FlightForm';
import Form from '../../../forms/Form';
import { FLIGHT } from '../../../constants/formFields/postForm';
import postFields from '../../../forms/postFields';

describe( 'FlightForm', () => {
	const testID = 'test-id';
	const form = new Form( { fields: postFields, hooks: {} } ).$( FLIGHT );
	const presenter = {
		departureTime: 'Yesterday, 21:45',
		arrivalTime: 'Today, 07:38',
		onDepartureTimePressed: jest.fn(),
		onArrivalTimePressed: jest.fn(),
		form
	};
	let component;

	beforeEach( () => {
		component = render( <FlightForm testID={testID} presenter={presenter} /> );
	} );

	describe( 'with the default props', () => {
		it( 'renders the FlightForm component correctly', () => {
			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component.queryByTestId( 'post-manually-form-title' ) ).toHaveTextContent( 'Flight data - Add flight manually' );
			expect( component.queryByTestId( 'from-input' ) ).toBeDefined();
			expect( component.queryByTestId( 'to-input' ) ).toBeDefined();
			expect( component.queryByTestId( 'departure-time-input' ) ).toHaveTextContent( 'Yesterday, 21:45' );
			expect( component.queryByTestId( 'arrival-time-input' ) ).toHaveTextContent( 'Today, 07:38' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	// TODO: fix this test so that it adapts to the validation on blur.

	// eslint-disable-next-line jest/no-commented-out-tests
	// describe( 'when the form has validation errors', () => {
	// 	eslint-disable-next-line jest/no-commented-out-tests
	// 	it( 'shows the messages of the errors', async () => {
	// 		const fromInput = component.queryAllByTestId( 'input' )[ 0 ];
	// 		const toInput = component.queryAllByTestId( 'input' )[ 1 ];
	// 		await act( async () => {
	// 			fireEvent( fromInput, 'change', 'invalid origin' );
	// 			fireEvent( toInput, 'change', 'ABC' );
	// 			fireEvent( toInput, 'change', '' );
	// 		} );
	//		eslint-disable-next-line max-len
	// 		expect( component.queryByText( 'This field must be between 3 and 4 characters.' ) ).not.toBeNull();
	// 		expect( component.queryByText( 'This field is mandatory.' ) ).not.toBeNull();
	// 	} );
	// } );

	describe( 'when the departure time field is pressed', () => {
		it( 'calls the presenter\'s onDepatureTimePressed callback', () => {
			const departureTimeField = component.getByTestId( 'departure-time-input' );
			fireEvent.press( departureTimeField );
			expect( presenter.onDepartureTimePressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the arrival time field is pressed', () => {
		it( 'calls the presenter\'s onArrivalTimePressed callback', () => {
			const arrivalTimeField = component.getByTestId( 'arrival-time-input' );
			fireEvent.press( arrivalTimeField );
			expect( presenter.onArrivalTimePressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
