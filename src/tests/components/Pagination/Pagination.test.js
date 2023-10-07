import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Pagination } from '../../../components/Pagination';

describe( 'Pagination', () => {
	describe( 'with the default props', () => {
		it( 'renders the Pagination component correctly', async () => {
			const { component, queryByTestId } = render(
				<Pagination />
			);
			expect( queryByTestId( 'pagination-testID' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with activeIndex', () => {
		it( 'renders the Pagination component correctly', async () => {
			const { component } = render(
				<Pagination activeIndex={1} length={4} />
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom testID', () => {
		it( 'renders the Pagination component correctly', async () => {
			const { queryByTestId } = render(
				<Pagination testID="Custom-TestID" />
			);
			expect( queryByTestId( 'Custom-TestID' ) ).not.toBeNull();
		} );
	} );
} );
