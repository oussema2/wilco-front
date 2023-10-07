import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../../navigation/RootNavigator';
import AppProvider from '../../providers/AppProvider';
import mockUseView from '../mocks/mockUseView';
import * as useRootNavigatorWireframe from '../../wireframes/Navigation/useRootNavigatorWireframe';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

jest.mock( '@intercom/intercom-react-native', () => {} );

describe( 'RootNavigator', () => {
	let screen;

	const setUp = ( ) => {
		mockUseView( useRootNavigatorWireframe, {
		} );
		screen = render(
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>,
			{ wrapper: AppProvider }
		);
	};

	beforeEach( () => (
		setUp()
	) );

	it( 'renders the RootNavigator', async () => {
		expect( screen ).toMatchSnapshot();
	} );
} );
