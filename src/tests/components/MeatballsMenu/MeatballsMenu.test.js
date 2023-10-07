import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { MeatballsMenu } from '../../../components/MeatballsMenu';

describe( '<MeatballsMenu />', () => {
	let component;
	const testID = 'testing-MeatballsMenu-Component';

	const setUp = ( props ) => {
		component = render(
			<MeatballsMenu testID={testID} {...props} />
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the MeatballsMenu component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with onPress callback', () => {
		describe( 'when the component is pressed', () => {
			it( 'calls the given onPress callback', () => {
				const onPressMock = jest.fn();
				setUp( { onPress: onPressMock } );
				fireEvent.press( component.queryByTestId( testID ) );
				expect( onPressMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );
} );
