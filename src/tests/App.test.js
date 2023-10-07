import * as React from 'react';
import { render } from '@testing-library/react-native';

import App from '../App';

jest.mock( '@intercom/intercom-react-native', () => {} );

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

jest.mock( '@rr-ss/firebase-min-versions-fetcher', () => {} );
jest.mock( '@rr-ss/check-app-version-presenter', () => {} );

jest.mock( '../presenters/App/useAppPresenter', () => (
	jest.fn( () => {} )
) );

describe( 'App', () => {
	test( 'shows the first screen by default', async () => {
		const screen = render( <App /> );
		expect( screen ).toMatchSnapshot();
	} );
} );
