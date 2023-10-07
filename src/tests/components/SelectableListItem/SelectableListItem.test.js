import React from 'react';
import { render } from '@testing-library/react-native';
import { SelectableListItem } from '../../../components/SelectableListItem';

describe( '<SelectableListItem />', () => {
	let component;
	const testID = 'testing-SelectableListItem-Component';
	const renderItem = jest.fn();
	let isSelected = false;

	const setUp = ( ) => {
		component = render(
			<SelectableListItem
				testID={testID}
				renderItem={renderItem}
				itemKey={1}
				isSelected={isSelected}
			/>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the SelectableListItem component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( renderItem ).toHaveBeenCalled();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the item is selected', () => {
		beforeEach( () => {
			isSelected = true;
			setUp();
		} );

		it( 'renders the SelectableListItem as selected', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
