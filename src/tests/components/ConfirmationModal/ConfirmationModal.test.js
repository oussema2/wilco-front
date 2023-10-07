import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ConfirmationModal } from '../../../components/ConfirmationModal';

describe( '< ConfirmationModal/>', () => {
	let component;
	const onConfirmPress = jest.fn();
	const onBackdropPress = jest.fn();
	const confirmationButtonOptions = {
		title: 'Confirm'
	};
	const title = 'Modal title';
	const description = 'Modal description';
	const testID = 'Testing-ConfirmationModal';

	const setUp = ( props ) => {
		component = render( <ConfirmationModal {...props} title={title} description={description} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp( {
			testID, confirmationButtonOptions, onConfirmPress, onBackdropPress
		} );
	} );

	it( 'renders the ConfirmationModal component correctly', () => {
		expect( component.queryByTestId( 'modalTitle-Text' ) ).toHaveTextContent( title );
		expect( component.queryByTestId( 'modalDescription-Text' ) ).toHaveTextContent( description );

		expect( component ).toMatchSnapshot();
	} );

	describe( 'when the cancel button is pressed', () => {
		it( 'calls onBackdropPress', () => {
			const cancelButton = component.getByText( 'Cancel' );
			fireEvent.press( cancelButton );
			expect( onBackdropPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the confirmation button is pressed', () => {
		it( 'calls it\'s onPress', () => {
			const confirmationButton = component.getByText( confirmationButtonOptions.title );
			fireEvent.press( confirmationButton );
			expect( onConfirmPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
