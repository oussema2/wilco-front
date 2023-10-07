import * as React from 'react';
import { render } from '@testing-library/react-native';
import { ScreenLoader } from '../../../components/ScreenLoader';

describe( 'ScreenLoader', () => {
	describe( 'with the default props', () => {
		it( 'renders the ScreenLoader component correctly', () => {
			const component = render( <ScreenLoader /> );
			expect( component.queryByTestId( 'screenLoader' ) ).not.toBeNull();
			expect( component.queryByTestId( 'progress-bar' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a custom testID', () => {
		it( 'renders the ScreenLoader component correctly with the provided testID', () => {
			const component = render( <ScreenLoader testID="aCustomID" /> );
			expect( component.queryByTestId( 'aCustomID' ) ).not.toBeNull();
			expect( component.queryByTestId( 'progress-bar' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
