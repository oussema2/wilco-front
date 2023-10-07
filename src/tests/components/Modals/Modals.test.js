import React from 'react';
import { render } from '@testing-library/react-native';
import { Modals } from '../../../components/Modals';
import mockUseModalService from '../../mocks/mockUseModalService';

describe( '< Modals/>', () => {
	let component;
	mockUseModalService();

	const setUp = () => {
		component = render( <Modals /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts all modals', () => {
		expect( component.getByTestId( 'modal-DeletePostConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-DeleteCommentConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-DeleteAircraftConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-DiscardChangesConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-CancelPostConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-DatePickerModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-AircraftPickerModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-VisibilityPickerModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-LogOutConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-DeleteAccountConfirmationModal' ) ).toBeDefined();
		expect( component.getByTestId( 'modal-DiscardPostFilterChangesConfirmationModal' ) ).toBeDefined();
	} );
} );
