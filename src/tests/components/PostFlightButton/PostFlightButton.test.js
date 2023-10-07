import * as React from 'react';
import { render } from '@testing-library/react-native';

import { PostFlightButton } from '../../../components/PostFlightButton';

describe( 'PostFlightButton', () => {
	const testID = 'test-id';

	it( 'renders the PostFlightButton component correctly', async () => {
		const component = render( <PostFlightButton testID={testID} /> );

		expect( component.queryByTestId( testID ) ).not.toBeNull();
		expect( component.queryByTestId( 'postText-button' ) ).not.toBeNull();
		expect( component ).toMatchSnapshot();
	} );
} );
