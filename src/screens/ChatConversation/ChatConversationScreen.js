import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { CometChatMessages } from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace';
import BaseScreen from '../BaseScreen/BaseScreen';
import useChatConversationWireframe from '../../wireframes/useChatConversationWireframe';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { styles } from './ChatConversationScreen.styles';

const ChatConversationScreen = ( { route, navigation } ) => {
	const presenter = useChatConversationWireframe();

	return (
		<BaseScreen>
			{ presenter.isLoading && (
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator />
				</View>
			) }

			{ !presenter.isLoading && (
				<CometChatMessages
					navigation={navigation}
					{...route.params}
					item={presenter.recipientChatUser}
					onChatProfilePressed={presenter.onChatProfilePressed}
					onSendMessageButtonPressed={presenter.onSendMessageButtonPressed}
				/>
			) }
		</BaseScreen>
	);
};

ChatConversationScreen.propTypes = {
	navigation: PropTypes.any.isRequired,
	route: PropTypes.any.isRequired
};

export default observer( ChatConversationScreen );
