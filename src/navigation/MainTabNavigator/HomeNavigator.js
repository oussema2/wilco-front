import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import AUTHENTICATED_ROUTES from '../AuthenticatedRoutes';
import PilotProfile from '../../screens/PilotProfile/PilotProfile';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export function HomeNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true
			}}
			initialRouteName={ROUTES.Home.name}
		>
			<Stack.Screen
				name={ROUTES.Home.name}
				component={Home}
			/>
			<Stack.Screen
				name={AUTHENTICATED_ROUTES.pilotProfile.name}
				component={PilotProfile}
			/>
		</Stack.Navigator>
	);
}
