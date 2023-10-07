import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from '../../../components/Avatar';

describe( '<Avatar />', () => {
	let component;
	const testID = 'testing-Avatar-Component';

	const setUp = ( props ) => {
		component = render( <Avatar
			testID={testID}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the EditAvatar component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( `${testID}-loader` ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the variant is "aircraft', () => {
		it( 'renders the aircraft content', () => {
			setUp( { variant: 'aircraft' } );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when a source is provided', () => {
		it( 'renders the provided image source', () => {
			setUp( { variant: 'aircraft', source: { uri: 'test/uri' } } );
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
