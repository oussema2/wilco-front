import React from 'react';
import { render } from '@testing-library/react-native';
import EditAircraft from '../../../screens/EditAircraft/EditAircraft';
import mockUseView from '../../mocks/mockUseView';
import * as useEditAircraftWireframe from '../../../wireframes/useEditAircraftWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/aircraftFields';

describe( 'EditAircraft', () => {
	let screen;
	const title = 'Edit aircraft';
	const submitButtonTitle = 'Save changes';
	const backButtonWasPressed = jest.fn();
	const onAvatarChange = jest.fn();
	const avatarSource = { uri: 'avatar/source' };
	const form = new Form( { fields } );
	const route = { params: { aircraftId: 1, previousScreen: '' } };

	const setUp = ( ) => {
		mockUseView( useEditAircraftWireframe, {
			title,
			submitButtonTitle,
			form,
			backButtonWasPressed,
			onAvatarChange,
			avatarSource
		} );
		screen = render( <EditAircraft route={route} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the EditAircraft screen correctly', () => {
		expect( screen.getByText( title ) ).toBeDefined();
		expect( screen.getByText( submitButtonTitle ) ).toBeDefined();
		expect( screen.getByText( 'Change aircraft photo' ) ).toBeDefined();
		expect( screen.getByText( 'Make and model' ) ).toBeDefined();
		expect( screen.getByText( 'Tail number' ) ).toBeDefined();
	} );
} );
