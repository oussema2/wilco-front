import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AircraftPickerModal } from '../../../components/AircraftPickerModal';
import AircraftFactory from '../../factories/AircraftFactory';

describe( '< AircraftPickerModal/>', () => {
	let component;
	const aircrafts = AircraftFactory.buildList( 4 );
	const onBackdropPress = jest.fn();
	const onAircraftSelected = jest.fn();

	const setUp = ( props ) => {
		component = render( <AircraftPickerModal {...props} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp( { onBackdropPress, aircrafts, onAircraftSelected } );
	} );

	it( 'renders the AircraftPickerModal component correctly', () => {
		expect( component.getByText( 'Primary aircraft' ) ).toBeDefined();
		expect( component.getAllByText( aircrafts[ 0 ].makeAndModel ) ).toHaveLength( 4 );
	} );

	describe( 'when the cancel button is pressed', () => {
		it( 'calls onBackdropPress', () => {
			const cancelButton = component.getByText( 'Cancel' );
			fireEvent.press( cancelButton );
			expect( onBackdropPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the "Done" button is pressed', () => {
		it( 'calls it\'s onAircraftSelected with the selected aircraft', () => {
			const doneButton = component.getByText( 'Done' );
			const firstAircraft = component.getAllByText( aircrafts[ 0 ].makeAndModel )[ 0 ];
			fireEvent.press( firstAircraft );
			fireEvent.press( doneButton );
			expect( onAircraftSelected ).toHaveBeenCalledWith( aircrafts[ 0 ] );
		} );
	} );

	describe( 'when there are no aircrafts', () => {
		beforeEach( () => {
			setUp( { onBackdropPress, aircrafts: [], onAircraftSelected } );
		} );

		it( 'displays the aircraft list empty state', () => {
			expect( component.getByText( /You have no aircrafts in your hangar./ ) ).toBeDefined();
		} );
	} );
} );
