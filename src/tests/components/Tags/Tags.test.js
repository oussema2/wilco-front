import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Tags } from '../../../components/Tags';

describe( 'Tags', () => {
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'renders the Tags component correctly', () => {
			const component = render(
				<Tags />
			);

			expect( component.queryByTestId( 'tags-component' ) ).toBeDefined();
		} );
	} );

	describe( 'with custom props', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<Tags testID={testID} />
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
		} );

		it( 'uses the given items', () => {
			const component = render(
				<Tags items={[ 'tag 1', 'tag 2' ]} />
			);

			expect( component.queryByTestId( 'item0-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'item1-testID' ) ).toBeDefined();

			expect( component.queryByTestId( 'text-item0-testID' ) ).toHaveTextContent( 'tag 1' );
			expect( component.queryByTestId( 'text-item1-testID' ) ).toHaveTextContent( 'tag 2' );

			expect( component.queryByTestId( 'remove-item0-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'remove-item1-testID' ) ).toBeDefined();
		} );
	} );
} );
