import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyAircraftList } from '../../../components/EmptyAircraftList';

describe( '<EmptyAircraftList />', () => {
	let component;

	const setUp = () => {
		component = render( <EmptyAircraftList /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the EmptyAircraftList component correctly', () => {
		const expectedText = 'You have no aircrafts in your hangar.\nYou can add your first one.';

		expect( component.getByText( expectedText ) ).toBeDefined();
	} );
} );
