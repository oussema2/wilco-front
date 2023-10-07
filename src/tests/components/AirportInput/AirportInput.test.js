import * as React from 'react';
import { render } from '@testing-library/react-native';
import AirportInput from '../../../components/AirportInput/AirportInput';

describe( 'AirportInput', () => {
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'renders the AirportInput component correctly', () => {
			const component = render(
				<AirportInput />
			);

			expect( component.queryByTestId( 'airport-input' ) ).toBeDefined();
		} );
	} );

	describe( 'with custom props', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<AirportInput testID={testID} />
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
		} );

		it( 'uses the given containerStyle', () => {
			const style = { minHeight: 250 };
			const component = render(
				<AirportInput testID={testID} containerStyle={style} />
			);

			expect( component.queryByTestId( testID ) ).toHaveStyle( style );
		} );

		it( 'uses the given placeholder', () => {
			const placeholder = 'Placeholder airport test';
			const component = render(
				<AirportInput testID={testID} placeholder={placeholder} />
			);

			expect( component.queryByPlaceholderText( placeholder ) ).toBeDefined();
		} );
	} );
} );
