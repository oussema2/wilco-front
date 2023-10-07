import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePickerModal } from '../../../components/DatePickerModal';

describe( '< DatePickerModal/>', () => {
	let component;
	const onBackdropPress = jest.fn();
	const title = 'Sample title';
	const minimumDate = new Date( 2021, 5, 22, 12, 23, 35 );
	const maximumDate = new Date( 2021, 5, 23, 6, 42, 13 );
	const initialDate = new Date( 2021, 6, 28, 12, 23, 35 );
	const onDatePicked = jest.fn();

	const setUp = ( props ) => {
		component = render( <DatePickerModal {...props} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp( {
			title, onBackdropPress, minimumDate, maximumDate, initialDate, onDatePicked
		} );
	} );

	it( 'renders the DatePickerModal component correctly', () => {
		expect( component.queryByTestId( 'modal-title' ) ).toHaveTextContent( title );
		expect( component ).toMatchSnapshot();
	} );

	describe( 'when the cancel button is pressed', () => {
		it( 'calls onBackdropPress', () => {
			const cancelButton = component.getByText( 'Cancel' );
			fireEvent.press( cancelButton );
			expect( onBackdropPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the "Done" button is pressed', () => {
		it( 'calls it\'s onDatePicked with the selected date', () => {
			const doneButton = component.getByText( 'Done' );
			fireEvent.press( doneButton );
			expect( onDatePicked ).toHaveBeenCalledWith( initialDate );
		} );
	} );
} );
