import React from 'react';
import { Keyboard } from 'react-native';
import { fireEvent, render, act } from '@testing-library/react-native';
import AircraftForm from '../../../components/AircraftForm/AircraftForm';
import Form from '../../../forms/Form';
import fields from '../../../forms/aircraftFields';

describe( 'AircraftForm', () => {
	let presenter;
	let component;
	const title = 'Do something with aircraft';
	const submitButtonTitle = 'Submit';
	const isSubmitButtonDisabled = false;
	const backButtonWasPressed = jest.fn();
	const onAvatarChange = jest.fn();
	const avatarSource = { uri: 'avatar/source' };
	const form = new Form( { fields } );

	const setUp = ( presenterProps = {} ) => {
		presenter = {
			title,
			submitButtonTitle,
			isSubmitButtonDisabled,
			form,
			onAvatarChange,
			avatarSource,
			backButtonWasPressed,
			...presenterProps
		};
		component = render( <AircraftForm presenter={presenter} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the AircraftForm screen correctly', () => {
		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( submitButtonTitle ) ).toBeDefined();
		expect( component.getByText( 'Change aircraft photo' ) ).toBeDefined();
		expect( component.getByText( 'Make and model' ) ).toBeDefined();
		expect( component.getByText( 'Tail number' ) ).toBeDefined();
		expect( component.getByText( 'This information will not be visible to others.' ) ).toBeDefined();
		expect( component ).toMatchSnapshot();
	} );

	describe( 'when the submit button is disabled', () => {
		it( 'renders the button disabled', () => {
			setUp( { isSubmitButtonDisabled: true } );
			expect( component.getByText( submitButtonTitle ) ).toBeDisabled();
		} );
	} );

	describe( 'when the form has validation errors', () => {
		it( 'shows the messages of the errors', async () => {
			const makeAndModelInput = component.queryByTestId( 'make-and-model-input' );

			await act( async () => {
				fireEvent( makeAndModelInput, 'change', '' );
			} );

			expect( component.queryByText( 'This field is mandatory.' ) ).toBeDefined();
		} );
	} );

	describe( 'when the submit button is pressed', () => {
		it( 'dismisses the keyboard and calls the form\'s onSubmit handler', async () => {
			const formOnSubmit = jest.spyOn( form, 'onSubmit' );
			const keyboardDismiss = jest.spyOn( Keyboard, 'dismiss' );
			form.onSubmit.mockImplementationOnce( () => {} );

			const submitButton = component.queryByTestId( 'submit-button' );
			fireEvent.press( submitButton );

			expect( keyboardDismiss ).toHaveBeenCalledTimes( 1 );
			expect( formOnSubmit ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
