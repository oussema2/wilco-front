import React from 'react';
import { render } from '@testing-library/react-native';
import { Tooltip } from '../../../components/Tooltip';

describe( '<Tooltip />', () => {
	let component;
	const testID = 'tooltip-Component';

	const setUp = ( props ) => {
		component = render( <Tooltip
			testID={testID}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the Tooltip component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
