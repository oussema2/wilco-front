import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useUnauthenticatedNavigatorWireframe from '../wireframes/useUnauthenticatedNavigatorWireframe';
import LogIn from '../screens/LogIn/LogIn';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import Welcome from '../screens/Welcome/Welcome';
import SignUp from '../screens/SignUp/SignUp';
import UNAUTHENTICATED_ROUTES from './UnauthenticatedRoutes';
import SHARED_ROUTES from './SharedRoutes';

const Stack = createStackNavigator();

const UnauthenticatedNavigator = () => {
	const presenter = useUnauthenticatedNavigatorWireframe();

	const onBoarding = (
		<Stack.Screen
			name={UNAUTHENTICATED_ROUTES.onBoarding.name}
			key={UNAUTHENTICATED_ROUTES.onBoarding.key}
			options={{ headerShown: false }}
			component={OnBoarding}
		/>
	);

	return (
		<Stack.Navigator>
			{( presenter.onBoardingWasSeen ) ? null : onBoarding}
			<Stack.Screen
				name={UNAUTHENTICATED_ROUTES.welcome.name}
				key={UNAUTHENTICATED_ROUTES.welcome.key}
				options={{ headerShown: false }}
				component={Welcome}
			/>
			<Stack.Screen
				name={UNAUTHENTICATED_ROUTES.logIn.name}
				key={UNAUTHENTICATED_ROUTES.logIn.key}
				options={{ headerShown: false }}
				component={LogIn}
			/>
			<Stack.Screen
				name={UNAUTHENTICATED_ROUTES.signUp.name}
				key={UNAUTHENTICATED_ROUTES.signUp.key}
				options={{ headerShown: false }}
				component={SignUp}
			/>
			<Stack.Screen
				name={UNAUTHENTICATED_ROUTES.forgotPassword.name}
				key={UNAUTHENTICATED_ROUTES.forgotPassword.key}
				options={{ headerShown: false }}
				component={ForgotPassword}
			/>
			<Stack.Screen
				name={SHARED_ROUTES.resetPassword.name}
				key={SHARED_ROUTES.resetPassword.key}
				options={{ headerShown: false }}
				component={ResetPassword}
			/>
			{( presenter.onBoardingWasSeen ) ? onBoarding : null}
		</Stack.Navigator>
	);
};

export default UnauthenticatedNavigator;
