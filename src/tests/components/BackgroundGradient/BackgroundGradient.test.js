import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Text } from 'react-native';
import { BackgroundGradient } from '../../../components/BackgroundGradient';

describe( 'BackgroundGradient', () => {
	const testID = 'test-id';

	it( 'renders the BackgroundGradient component correctly', async () => {
		const component = render(
			<BackgroundGradient testID={testID} colors={[ '#FFFFFF' ]}>
				<Text>children</Text>
			</BackgroundGradient>
		);

		expect( component.queryByTestId( testID ) ).not.toBeNull();
		expect( component ).toMatchSnapshot();
	} );
} );
