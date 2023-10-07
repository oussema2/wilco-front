import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabNavigator } from '../../../navigation/MainTabNavigator';
import AppProvider from '../../../providers/AppProvider';

describe( 'MainTabNavigator', () => {
	let screen;
	const navigation = {};

	const setUp = ( ) => {
		screen = render(
			<NavigationContainer>
				<MainTabNavigator navigation={navigation} />
			</NavigationContainer>,
			{ wrapper: AppProvider }
		);
	};

	beforeEach( () => (
		setUp()
	) );

	it( 'renders the MainTabNavigator', async () => {
		expect( screen.queryByTestId( 'home-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'home-tab-button' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'members-tab-button' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'postText-tab-button' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'notifications-tab-button' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'profile-tab-button' ) ).not.toBeNull();

		expect( screen ).toMatchSnapshot();
	} );
} );
