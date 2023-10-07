import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AUTHENTICATED_ROUTES from '../AuthenticatedRoutes';
import PilotProfile from '../../screens/PilotProfile/PilotProfile';
import { ROUTES } from './routes';
import Members from '../../screens/Members/Members';

const Stack = createStackNavigator();

export function MembersNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true
			}}
			initialRouteName={ROUTES.Members.name}
		>
			<Stack.Screen
				name={ROUTES.Members.name}
				component={Members}
			/>
			<Stack.Screen
				name={AUTHENTICATED_ROUTES.pilotProfile.name}
				component={PilotProfile}
			/>
		</Stack.Navigator>
	);
}
