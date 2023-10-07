import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { VisibilityPickerModal } from '../../../components/VisibilityPickerModal';
import { VISIBILITY_OPTIONS } from '../../../constants/visibilityOptions';

describe( '< VisibilityPickerModal/>', () => {
	let component;
	const data = VISIBILITY_OPTIONS;
	const onBackdropPress = jest.fn();
	const onItemSelected = jest.fn();
	const initialItem = data[ 0 ];

	const setUp = ( props ) => {
		component = render( <VisibilityPickerModal {...props} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp( {
			onBackdropPress, data, onItemSelected, initialItem
		} );
	} );

	it( 'renders the VisibilityPickerModal component correctly', () => {
		expect( component.getByText( 'Visibility' ) ).toBeDefined();
		expect( component.getByText( 'Everyone' ) ).toBeDefined();
		expect( component.getByText( 'Only me' ) ).toBeDefined();
		expect( component.getByText( data[ 0 ].name ) ).toBeDefined();
		expect( component.getByText( data[ 1 ].name ) ).toBeDefined();
		expect( component.queryByTestId( 'picker-modal-title' ) ).toBeDefined();
		expect( component.queryByTestId( 'picker-modal-subtitle' ) ).toBeDefined();
		expect( component.queryByTestId( 'picker-modal-title' ) ).toHaveTextContent( 'Visibility' );
		expect( component.queryByTestId( 'picker-modal-subtitle' ) ).toHaveTextContent( 'Choose between showing your post to everyone on Wilco or only to yourself.' );
	} );

	describe( 'when the cancel button is pressed', () => {
		it( 'calls onBackdropPress', () => {
			const cancelButton = component.getByText( 'Cancel' );
			fireEvent.press( cancelButton );
			expect( onBackdropPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the "Done" button is pressed', () => {
		it( 'calls it\'s onItemSelected with the default option', () => {
			const doneButton = component.getByText( 'Done' );
			fireEvent.press( doneButton );
			expect( onItemSelected ).toHaveBeenCalledWith( initialItem );
		} );

		it( 'calls it\'s onItemSelected with other selected option than default', () => {
			const doneButton = component.getByText( 'Done' );
			const firstVisibilityOption = component.getAllByText( data[ 1 ].name )[ 0 ];
			fireEvent.press( firstVisibilityOption );
			fireEvent.press( doneButton );
			expect( onItemSelected ).toHaveBeenCalledWith( data[ 1 ] );
		} );
	} );

	describe( 'when there are no options', () => {
		beforeEach( () => {
			setUp( { onBackdropPress, data: [], onItemSelected } );
		} );

		it( 'renders the VisibilityPickerModal component correctly', () => {
			expect( component.getByText( 'Visibility' ) ).toBeDefined();
			expect( component.queryByText( 'Everyone' ) ).toBeNull();
			expect( component.queryByText( 'Only me' ) ).toBeNull();
			expect( component.queryByText( data[ 0 ].name ) ).toBeNull();
			expect( component.queryByText( data[ 1 ].name ) ).toBeNull();
			expect( component.queryByTestId( 'picker-modal-title' ) ).toBeDefined();
			expect( component.queryByTestId( 'picker-modal-subtitle' ) ).toBeDefined();
			expect( component.queryByTestId( 'picker-modal-title' ) ).toHaveTextContent( 'Visibility' );
			expect( component.queryByTestId( 'picker-modal-subtitle' ) ).toHaveTextContent( 'Choose between showing your post to everyone on Wilco or only to yourself.' );
		} );
	} );
} );
