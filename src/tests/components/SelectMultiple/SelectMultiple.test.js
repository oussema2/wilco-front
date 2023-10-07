import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SelectMultiple from '../../../components/SelectMultiple/SelectMultiple';
import { checkbox, checkboxUnselected } from '../../../assets/icons';

describe( 'SelectMultiple', () => {
	describe( 'Autolink component with the default props', () => {
		it( 'renders the SelectMultiple component correctly', async () => {
			const onSelectionsChange = jest.fn();
			const items = [ { value: 1, label: 'label 1' } ];
			const component = render( <SelectMultiple
				items={items}
				selectedCheckboxSource={checkbox}
				checkboxSource={checkboxUnselected}
				onSelectionsChange={onSelectionsChange}
			/> );

			expect( component.queryByTestId( 'select-multiple-testID' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom testID prop', () => {
		it( 'uses the given testID', () => {
			const items = [ { value: 1, label: 'label 1' } ];
			const testID = 'test-testID';
			const component = render( <SelectMultiple
				testID={testID}
				items={items}
				selectedCheckboxSource={checkbox}
				checkboxSource={checkboxUnselected}
			/> );

			expect( component.queryByTestId( testID ) ).toBeDefined();
		} );
	} );

	describe( 'with custom onSelectionsChange prop', () => {
		it( 'calls to onSelectionsChange function', () => {
			const onSelectionsChange = jest.fn();
			const items = [ { value: 1, label: 'label 1' } ];
			const testID = 'test-testID';
			const component = render( <SelectMultiple
				testID={testID}
				items={items}
				selectedCheckboxSource={checkbox}
				checkboxSource={checkboxUnselected}
				onSelectionsChange={onSelectionsChange}
			/> );

			fireEvent.press( component.getByTestId( 'row-1-testID' ) );
			expect( onSelectionsChange ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
