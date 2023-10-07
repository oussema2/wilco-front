import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { MainTabNavigator } from './MainTabNavigator';
import CreatePost from '../screens/CreatePost/CreatePost';
import EditPost from '../screens/EditPost/EditPost';
import PostDetail from '../screens/PostDetail/PostDetail';
import AddAircraft from '../screens/AddAircraft/AddAircraft';
import EditAircraft from '../screens/EditAircraft/EditAircraft';
import PilotProfile from '../screens/PilotProfile/PilotProfile';
import AUTHENTICATED_ROUTES from './AuthenticatedRoutes';
import EditPilotProfile from '../screens/EditPilotProfile/EditPilotProfile';
import Settings from '../screens/Settings/Settings';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import SHARED_ROUTES from './SharedRoutes';
import InvitePeople from '../screens/InvitePeople/InvitePeople';
import useAuthenticatedNavigatorWireframe from '../wireframes/useAuthenticatedNavigatorWireframe';
import DeleteAccount from '../screens/DeleteAccount/DeleteAccount';
import ConfirmationDeleteAccount from '../screens/DeleteAccount/ConfirmationDeleteAccount';
import AddFlight from '../screens/AddFlight/AddFlight';
import Preferences from '../screens/Preferences/Preferences';
import ReportUserScreen from '../screens/ReportUser/ReportUser';
import ChatConversationScreen from '../screens/ChatConversation/ChatConversationScreen';

const AuthenticatedStack = createStackNavigator();

const CreatePostStackScreen = () => (
	<AuthenticatedStack.Navigator screenOptions={{ headerShown: false }}>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.postText.name}
			component={CreatePost}
			options={{
				presentation: 'modal'
			}}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.addFlight.name}
			component={AddFlight}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.addAircraft.name}
			component={AddAircraft}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.editAircraft.name}
			component={EditAircraft}
		/>
	</AuthenticatedStack.Navigator>
);

const EditPostStackScreen = () => (
	<AuthenticatedStack.Navigator screenOptions={{ headerShown: false }}>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.editPost.name}
			component={EditPost}
			options={{
				presentation: 'modal'
			}}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.addFlight.name}
			component={AddFlight}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.addAircraft.name}
			component={AddAircraft}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.editAircraft.name}
			component={EditAircraft}
		/>
	</AuthenticatedStack.Navigator>
);

const EditPilotProfileStackScreen = () => (
	<AuthenticatedStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.editPilotProfile.name}
			component={EditPilotProfile}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.addAircraft.name}
			component={AddAircraft}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.editAircraft.name}
			component={EditAircraft}
		/>
	</AuthenticatedStack.Navigator>
);

const MainStackScreen = () => (
	<AuthenticatedStack.Navigator screenOptions={{ headerShown: false }}>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.mainTabBar.name}
			component={MainTabNavigator}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.postDetail.name}
			component={PostDetail}
		/>
		<AuthenticatedStack.Screen
			name={AUTHENTICATED_ROUTES.pilotProfile.name}
			component={PilotProfile}
		/>
	</AuthenticatedStack.Navigator>
);

const AuthenticatedNavigator = () => {
	useAuthenticatedNavigatorWireframe();

	return (
		<AuthenticatedStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
			<AuthenticatedStack.Screen name="Main" component={MainStackScreen} />
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.editPilotProfileStack.name}
				component={EditPilotProfileStackScreen}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.settings.name}
				component={Settings}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.invitePeople.name}
				component={InvitePeople}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.deleteAccount.name}
				component={DeleteAccount}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.confirmationDeleteAccount.name}
				component={ConfirmationDeleteAccount}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.postTextStack.name}
				component={CreatePostStackScreen}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.editPostStack.name}
				component={EditPostStackScreen}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.preferences.name}
				component={Preferences}
			/>
			<AuthenticatedStack.Screen
				name={SHARED_ROUTES.resetPassword.name}
				key={SHARED_ROUTES.resetPassword.key}
				options={{ headerShown: false }}
				component={ResetPassword}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.reportUser.name}
				component={ReportUserScreen}
				options={{
					gestureEnabled: false
				}}
			/>
			<AuthenticatedStack.Screen
				name={AUTHENTICATED_ROUTES.cometChatMessages.name}
				component={ChatConversationScreen}
			/>
		</AuthenticatedStack.Navigator>
	);
};

export default observer( AuthenticatedNavigator );
