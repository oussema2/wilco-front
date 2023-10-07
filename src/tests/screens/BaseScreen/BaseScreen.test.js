import * as React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import BaseScreen from '../../../screens/BaseScreen/BaseScreen';

describe( 'BaseScreen', () => {
	let screen;
	const testID = 'testID';
	const children = <View testID="view" />;

	const setUp = ( ) => {
		screen = render( <BaseScreen testID={testID}>{children}</BaseScreen> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'isLoading', () => {
		describe( 'without the isLoading prop', () => {
			it( 'renders the BaseScreen screen correctly', async () => {
				expect( screen.queryByTestId( testID ) ).not.toBeNull();
				expect( screen.queryByTestId( 'view' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'screenLoader' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'with the isLoading prop', () => {
			beforeEach( () => {
				screen = render( <BaseScreen testID={testID} isLoading>{children}</BaseScreen> );
			} );

			it( 'renders the BaseScreen screen with a screen loader', async () => {
				expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();
				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'edgeTop', () => {
		describe( 'when edgeTop is true', () => {
			beforeEach( () => {
				screen = render( <BaseScreen edgeTop>{children}</BaseScreen> );
			} );
			it( 'renders the BaseScreen screen correctly', async () => {
				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'with the edgeTop prop', () => {
			it( 'renders the BaseScreen screen correctly', async () => {
				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );
} );
