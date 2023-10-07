import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Alert, Linking } from 'react-native';
import AutoLink from '../../../components/AutoLink/AutoLink';

describe( 'AutoLink', () => {
	describe( 'Autolink component with the default props', () => {
		it( 'renders the AutoLink component correctly', async () => {
			const testID = 'test-testID';
			const component = render( <AutoLink testID={testID} /> );

			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'Autolink component without default props', () => {
		it( 'renders the AutoLink component correctly', async () => {
			const testID = 'test-testID';
			const text = 'Text for test with link https://www.google.com/';
			const component = render( <AutoLink testID={testID} text={text} /> );

			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( text ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'Text node without link', () => {
		it( 'renders a Text node correctly', () => {
			const text = 'Text for test';
			const component = render( <AutoLink text={text} /> );

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'Text node with link', () => {
		it( 'wraps a url in a link Text node', () => {
			const text = 'Text for test with link https://www.google.com/';
			const component = render( <AutoLink text={text} /> );

			expect( component ).toMatchSnapshot();
		} );
	} );

	it( 'uses url when pressing linked url', () => {
		const spy = jest.spyOn( Linking, 'openURL' );
		const text = 'Text for test with link https://www.google.com/';
		const component = render(
			<AutoLink text={text} showAlert={false} />
		);
		component.getByText( 'google.com' ).props.onPress();

		expect( spy ).toBeCalledTimes( 1 );
		expect( spy ).toBeCalledWith( 'https://www.google.com/' );
	} );

	describe( 'alert', () => {
		test( 'displays alert before linking', () => {
			const text = 'Text for test with link https://www.google.com/';
			const spy = jest.spyOn( Alert, 'alert' ).mockImplementationOnce( () => {} );
			const component = render( <AutoLink text={text} /> );
			component.getByText( 'google.com' ).props.onPress();

			expect( spy ).toBeCalledTimes( 1 );
			expect( spy ).toBeCalledWith( 'Leaving App', 'Do you want to continue?', expect.any( Array ) );
		} );
	} );
} );
