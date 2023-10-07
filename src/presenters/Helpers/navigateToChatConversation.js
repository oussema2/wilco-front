import { action } from 'mobx';
import noop from '../../helpers/noop';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';

const navigateToChatConversation = (
	{ navigation, currentChatUid, recipientChatUid } ) => {
	navigation.navigate(
		AUTHENTICATED_ROUTES.cometChatMessages.name,
		{
			'uid': recipientChatUid,
			'loggedInUser': {
				'uid': currentChatUid
			},
			'tab': 'conversations',
			'type': 'user',
			'actionGenerated': noop
		}
	);
};

export default action( navigateToChatConversation );
