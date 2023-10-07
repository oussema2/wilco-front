import * as React from 'react';
import { render } from '@testing-library/react-native';
import { ActivityIndicator } from '../../../components/ActivityIndicator';

describe( 'ActivityIndicator', () => {
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'renders the ActivityIndicator component correctly', () => {
			const component = render(
				<ActivityIndicator />
			);

			expect( component.queryByTestId( 'activityIndicator-component' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom testID prop', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<ActivityIndicator testID={testID} />
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the isLoading prop is false', () => {
		it( 'does not render the indicator', () => {
			const component = render(
				<ActivityIndicator testID={testID} isLoading={false} />
			);

			expect( component.queryByTestId( testID ) ).toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
