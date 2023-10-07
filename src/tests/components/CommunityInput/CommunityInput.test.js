import * as React from 'react';
import { render } from '@testing-library/react-native';
import { CommunityInput } from '../../../components/CommunityInput';
import { palette } from '../../../Theme';

describe( 'CommunityInput', () => {
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'renders the CommunityInput component correctly', () => {
			const component = render(
				<CommunityInput />
			);

			expect( component.queryByTestId( 'community-input' ) ).toBeDefined();
		} );
	} );

	describe( 'with custom props', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<CommunityInput testID={testID} />
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
		} );

		it( 'uses the given label', () => {
			const component = render(
				<CommunityInput label="label" />
			);

			expect( component.queryByTestId( 'input-label' ) ).toHaveTextContent( 'label' );
		} );

		it( 'uses the given containerStyle', () => {
			const style = { minHeight: 150 };
			const component = render(
				<CommunityInput testID={testID} containerStyle={style} />
			);

			expect( component.queryByTestId( testID ) ).toHaveStyle( style );
		} );

		it( 'uses the given placeholder', () => {
			const placeholder = 'Placeholder test';
			const component = render(
				<CommunityInput testID={testID} placeholder={placeholder} />
			);

			expect( component.queryByPlaceholderText( placeholder ) ).toBeDefined();
		} );

		it( 'shows helper text in red when hasError prop is true', () => {
			const style = { color: palette.error.default };
			const helperTextTestID = 'helperText-ID';
			const component = render(
				<CommunityInput testID={testID} hasError />
			);

			expect( component.queryByTestId( helperTextTestID ) ).toHaveStyle( style );
		} );
	} );
} );
