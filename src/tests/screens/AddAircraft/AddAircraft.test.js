import React from 'react';
import { render } from '@testing-library/react-native';
import AddAircraft from '../../../screens/AddAircraft/AddAircraft';
import mockUseView from '../../mocks/mockUseView';
import * as useAddAircraftWireframe from '../../../wireframes/useAddAircraftWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/aircraftFields';

describe( 'AddAircraft', () => {
	let screen;
	const title = 'Add an Aircraft';
	const submitButtonTitle = 'Add aircraft';
	const backButtonWasPressed = jest.fn();
	const onAvatarChange = jest.fn();
	const avatarSource = { uri: 'avatar/source' };
	const form = new Form( { fields } );
	const route = { params: { previousScreen: '' } };

	const setUp = ( ) => {
		mockUseView( useAddAircraftWireframe, {
			title,
			submitButtonTitle,
			form,
			backButtonWasPressed,
			onAvatarChange,
			avatarSource
		} );
		screen = render( <AddAircraft route={route} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the AddAircraft screen correctly', () => {
		expect( screen.getByText( title ) ).toBeDefined();
		expect( screen.getByText( submitButtonTitle ) ).toBeDefined();
		expect( screen.getByText( 'Change aircraft photo' ) ).toBeDefined();
		expect( screen.getByText( 'Make and model' ) ).toBeDefined();
		expect( screen.getByText( 'Tail number' ) ).toBeDefined();
	} );
} );
