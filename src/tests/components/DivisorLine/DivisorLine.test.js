import * as React from 'react';
import { render } from '@testing-library/react-native';
import { DivisorLine } from '../../../components/DivisorLine';

describe( 'DivisorLine', () => {
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'renders the DivisorLine component correctly', () => {
			const component = render(
				<DivisorLine />
			);

			expect( component.queryByTestId( 'divisorLine-component' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom testID prop', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<DivisorLine testID={testID} />
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
