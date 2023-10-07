import * as React from 'react';
import { render } from '@testing-library/react-native';
import CheckboxList from '../../../components/CheckboxList/CheckboxList';

describe( 'CheckboxList', () => {
	describe( 'with the default props', () => {
		it( 'renders the CheckboxList component correctly', async () => {
			const list = [ 'Item 1', 'Item 2' ];
			const selectedItems = [ 'Item 1', 'Item 2' ];
			const component = render( <CheckboxList
				items={list}
				onSelectionsChange={() => { }}
				testID="testID"
				selectedItems={selectedItems}
			/> );
			expect( component.queryByTestId( 'testID' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
