import React from 'react';
import { render } from '@testing-library/react-native';
import { ActionSheetButton } from '../../../components/ActionSheetButton';

describe( '<ActionSheetButton />', () => {
	let component;

	const setUp = () => {
		component = render( <ActionSheetButton /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the ActionSheetButton component correctly', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
