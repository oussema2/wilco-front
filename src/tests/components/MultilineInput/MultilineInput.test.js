import React from 'react';
import { render } from '@testing-library/react-native';
import { MultilineInput } from '../../../components/MultilineInput';

describe( '<MultilineInput />', () => {
	let component;
	const testID = 'testing-MultilineInput-Component';

	const setUp = () => {
		component = render( <MultilineInput testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the MultilineInput component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
