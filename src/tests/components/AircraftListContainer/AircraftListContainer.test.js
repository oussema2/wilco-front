import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AircraftListContainer } from '../../../components/AircraftListContainer';
import AircraftFactory from '../../factories/AircraftFactory';

describe( 'AircraftListContainer', () => {
	const testID = 'test-id';
	let aircrafts;

	beforeEach( () => {
		aircrafts = [
			AircraftFactory.build( { makeAndModel: 'MM 1', tailNumber: 'ABC111' } ),
			AircraftFactory.build( { makeAndModel: 'MM 1', tailNumber: null } ),
			AircraftFactory.build( { makeAndModel: 'MM 2', tailNumber: 'ABC222' } ),
			AircraftFactory.build( { makeAndModel: 'MM 3', tailNumber: 'ABC333' } )
		];
	} );

	describe( 'when lists are expanded', () => {
		it( 'renders the aircrafts grouped by make and model', async () => {
			const component = render( <AircraftListContainer testID={testID} aircrafts={aircrafts} /> );
			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 1 list' ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 2 list' ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 3 list' ) ).not.toBeNull();

			fireEvent.press( component.queryByTestId( 'MM 1 list' ) );
			expect( component.queryByTestId( 'MM 1 ABC111 item' ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 1 null item' ) ).not.toBeNull();

			fireEvent.press( component.queryByTestId( 'MM 2 list' ) );
			expect( component.queryByTestId( 'MM 2 ABC222 item' ) ).not.toBeNull();

			fireEvent.press( component.queryByTestId( 'MM 3 list' ) );
			expect( component.queryByTestId( 'MM 3 ABC333 item' ) ).not.toBeNull();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when lists aren\'t expanded', () => {
		it( 'does not render the aircrafts', async () => {
			const component = render( <AircraftListContainer testID={testID} aircrafts={aircrafts} /> );
			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 1 list' ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 2 list' ) ).not.toBeNull();
			expect( component.queryByTestId( 'MM 3 list' ) ).not.toBeNull();

			expect( component.queryByTestId( 'MM 1 ABC111 item' ) ).toBeNull();
			expect( component.queryByTestId( 'MM 1 null item' ) ).toBeNull();
			expect( component.queryByTestId( 'MM 2 ABC222 item' ) ).toBeNull();
			expect( component.queryByTestId( 'MM 3 ABC333 item' ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	it( 'shows make and model plus tail number for aircrafts that have tail number', () => {
		const { queryByTestId } = render(
			<AircraftListContainer testID={testID} aircrafts={aircrafts} />
		);

		fireEvent.press( queryByTestId( 'MM 1 list' ) );
		expect( queryByTestId( 'MM 1 ABC111 item' ) ).toHaveTextContent( 'MM 1' );
		expect( queryByTestId( 'MM 1 ABC111 item' ) ).toHaveTextContent( 'ABC111' );

		fireEvent.press( queryByTestId( 'MM 2 list' ) );
		expect( queryByTestId( 'MM 2 ABC222 item' ) ).toHaveTextContent( 'MM 2' );
		expect( queryByTestId( 'MM 2 ABC222 item' ) ).toHaveTextContent( 'ABC222' );

		fireEvent.press( queryByTestId( 'MM 3 list' ) );
		expect( queryByTestId( 'MM 3 ABC333 item' ) ).toHaveTextContent( 'MM 3' );
		expect( queryByTestId( 'MM 3 ABC333 item' ) ).toHaveTextContent( 'ABC333' );
	} );

	it( 'shows make and model plus "Post manually" text for aircrafts that have no tail number', () => {
		const { queryByTestId } = render(
			<AircraftListContainer testID={testID} aircrafts={aircrafts} />
		);

		fireEvent.press( queryByTestId( 'MM 1 list' ) );
		expect( queryByTestId( 'MM 1 null item' ) ).toHaveTextContent( 'MM 1' );
		expect( queryByTestId( 'MM 1 null item' ) ).toHaveTextContent( 'Post manually' );
	} );

	describe( 'with the selectedAircraftID prop', () => {
		it( 'shows the item corresponding to the aircraft with the given ID as selected', () => {
			const component = render(
				<AircraftListContainer aircrafts={aircrafts} selectedAircraftID={aircrafts[ 1 ].id} />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the onAircraftSelected callback', () => {
		describe( 'when an aircraft is pressed', () => {
			it( 'executes the callback with the ID of the pressed aircraft', () => {
				const onAircraftSelectedMock = jest.fn();
				const { queryByTestId } = render(
					<AircraftListContainer
						aircrafts={aircrafts}
						onAircraftSelected={onAircraftSelectedMock}
					/>
				);
				fireEvent.press( queryByTestId( 'MM 2 list' ) );
				fireEvent.press( queryByTestId( 'MM 2 ABC222 item' ) );
				expect( onAircraftSelectedMock ).toHaveBeenCalledWith( aircrafts[ 2 ].id );
			} );
		} );
	} );

	describe( 'without aircrafts', () => {
		const emptyText = 'You have no aircrafts in your hangar.\nYou can add your first one.';

		beforeEach( () => {
			aircrafts = [];
		} );

		it( 'shows the empty screen', () => {
			const component = render( <AircraftListContainer aircrafts={aircrafts} /> );

			expect( component.queryByText( emptyText ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the onAircraftOptionsPressed callback', () => {
		describe( 'when an aircraft item\'s options are pressed', () => {
			it( 'executes the callback with the ID of the pressed aircraft', () => {
				const onAircraftOptionsPressedMock = jest.fn();
				const { queryByTestId } = render(
					<AircraftListContainer
						aircrafts={aircrafts}
						onAircraftOptionsPressed={onAircraftOptionsPressedMock}
					/>
				);
				fireEvent.press( queryByTestId( 'MM 2 list' ) );
				fireEvent.press( queryByTestId( 'MM 2 ABC222 item options' ) );
				expect( onAircraftOptionsPressedMock ).toHaveBeenCalledWith( aircrafts[ 2 ].id );
			} );
		} );
	} );
} );
