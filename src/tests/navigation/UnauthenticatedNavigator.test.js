import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNavigator from '../../navigation/UnauthenticatedNavigator';
import AppProvider from '../../providers/AppProvider';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'UnauthenticatedNavigator', () => {
	let screen;

	const setUp = ( ) => {
		screen = render(
			<NavigationContainer>
				<UnauthenticatedNavigator />
			</NavigationContainer>,
			{ wrapper: AppProvider }
		);
	};

	beforeEach( () => (
		setUp()
	) );

	it( 'renders the UnauthenticatedNavigator', async () => {
		expect( screen ).toMatchSnapshot();
	} );
} );
