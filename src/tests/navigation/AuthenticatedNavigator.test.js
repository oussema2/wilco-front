import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedNavigator from '../../navigation/AuthenticatedNavigator';
import AppProvider from '../../providers/AppProvider';

jest.mock( '@intercom/intercom-react-native', () => {} );

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'AuthenticatedNavigator', () => {
	let screen;

	const setUp = ( ) => {
		screen = render(
			<NavigationContainer>
				<AuthenticatedNavigator />
			</NavigationContainer>,
			{ wrapper: AppProvider }
		);
	};

	beforeEach( () => (
		setUp()
	) );

	it( 'renders the AuthenticatedNavigator', async () => {
		expect( screen ).toMatchSnapshot();
	} );
} );
