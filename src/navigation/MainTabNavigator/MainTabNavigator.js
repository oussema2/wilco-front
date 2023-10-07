/* eslint-disable indent */
/* eslint-disable max-len */
import * as React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import { Image } from '../../components/Image';
import Fake from '../../screens/Fake';
import { PostFlightButton } from '../../components/PostFlightButton';
import PilotProfile from '../../screens/PilotProfile/PilotProfile';
import Notifications from '../../screens/Notifications/Notifications';
import useMainTabNavigatorWireframe from '../../wireframes/Navigation/useMainTabNavigatorWireframe';
import { ROUTES, PLACEHOLDER_SCREEN_NAME } from './routes';
import { tabBarOptions } from './MainTabNavigator.styles';
import { HomeNavigator } from './HomeNavigator';
import { MembersNavigator } from './MembersNavigator';
import { palette } from '../../Theme';
import { useOnAppStateChange } from '../../hooks/useOnAppStateChange';

// FIXME: Remove when correct screens are implemented
// eslint-disable-next-line react/prop-types
const PlaceholderScreen = ( { navigation } ) => (
	<Fake navigation={navigation} title="Post Text" />
);

const Tab = createBottomTabNavigator();

const MainTabNavigator = ( { navigation } ) => {
	const presenter = useMainTabNavigatorWireframe();

	useOnAppStateChange(
		{ onForeground: presenter?.onForeground, onBackground: presenter?.onBackground }
	);

	const _renderPostTextButton = () => (
		<PostFlightButton
			onPress={() => presenter.postFlightButtonWasPressed( { navigation } )}
		/>
	);

	return (
		<Tab.Navigator
			screenOptions={( { route } ) => ( {
			// eslint-disable-next-line react/prop-types
			tabBarIcon: ( { color, focused } ) => {
				if ( route.name === PLACEHOLDER_SCREEN_NAME ) {
					return _renderPostTextButton();
				}
				return (
					<View style={{ height: '100%' }}>
						<View
							style={{
									height: 4,
									borderRadius: 10,
									marginTop: -1,
									backgroundColor: ( focused ) ? palette.grayscale.black : palette.grayscale.white
								}}
						/>
						<Image
							source={ROUTES[ route.name ].icon}
							tintColor={color}
							style={{ marginTop: 4, marginHorizontal: 6 }}
						/>
					</View>
				);
			}
		} )}
			tabBarOptions={tabBarOptions}
			initialRouteName={ROUTES.Home.name}
		>
			<Tab.Screen
				name={ROUTES.Home.name}
				component={HomeNavigator}
				options={{ tabBarTestID: 'home-tab-button' }}
			/>
			<Tab.Screen
				name={ROUTES.Members.name}
				component={MembersNavigator}
				options={{ tabBarTestID: 'members-tab-button' }}
			/>
			<Tab.Screen
				name={PLACEHOLDER_SCREEN_NAME}
				component={PlaceholderScreen}
				options={{ tabBarTestID: 'postText-tab-button', tabBarLabel: () => null }}
			/>
			<Tab.Screen
				name={ROUTES.Notifications.name}
				component={Notifications}
				options={{
				tabBarTestID: 'notifications-tab-button',
				tabBarBadge: presenter?.unreadNotificationCount
			}}
			/>
			<Tab.Screen
				name={ROUTES.Profile.name}
				component={PilotProfile}
				options={{ tabBarTestID: 'profile-tab-button' }}
			/>
		</Tab.Navigator>
	);
};

MainTabNavigator.propTypes = {
	navigation: PropTypes.instanceOf( Object ).isRequired
};

export default observer( MainTabNavigator );
