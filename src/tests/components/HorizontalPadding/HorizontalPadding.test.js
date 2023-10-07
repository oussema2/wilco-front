import * as React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { HorizontalPadding } from '../../../components/HorizontalPadding';

describe( 'HorizontalPadding', () => {
	const children = <Text>Sample text</Text>;
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'adds horizontal padding to the children', () => {
			const component = render(
				<HorizontalPadding>
					{children}
				</HorizontalPadding>
			);

			expect( component.queryByTestId( 'horizontalPadding-component' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom testID prop', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<HorizontalPadding testID={testID}>
					{children}
				</HorizontalPadding>
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom padding', () => {
		it( 'applies the given padding', () => {
			const component = render(
				<HorizontalPadding testID={testID} padding={5}>
					{children}
				</HorizontalPadding>
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
