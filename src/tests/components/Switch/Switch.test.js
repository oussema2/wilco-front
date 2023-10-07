import React from 'react';
import { render } from '@testing-library/react-native';
import { Switch } from '../../../components/Switch';

describe( '<Switch />', () => {
	let component;
	const testID = 'testing-Switch-Component';
	const onValueChange = jest.fn();

	const setUp = ( props ) => {
		component = render( <Switch
			testID={testID}
			value={false}
			onValueChange={onValueChange}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'when the switch is set to false', () => {
		it( 'renders with the correct colors', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
