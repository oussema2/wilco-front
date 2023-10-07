import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ReadMoreText from '../../../components/ReadMoreText/ReadMoreText';

describe( 'ReadMoreText', () => {
	describe( 'ReadMoreText component with the default props', () => {
		it( 'renders the ReadMoreText component correctly', async () => {
			const testID = 'read-more-testID';
			const component = render( <ReadMoreText /> );

			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'ReadMoreText component without default props', () => {
		it( 'renders the ReadMoreText component correctly', async () => {
			const testID = 'test-testID';
			const text = 'Text for test ReadMoreText component.';
			const onPress = jest.fn();
			const component = render( <ReadMoreText testID={testID} text={text} onPress={onPress} /> );

			fireEvent.press( component.queryByText( text ) );
			expect( onPress ).toHaveBeenCalledTimes( 1 );
			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( text ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
