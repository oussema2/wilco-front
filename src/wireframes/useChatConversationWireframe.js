import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatService from '../services/ChatService';
import ChatConversationPresenter from '../presenters/ChatConversationPresenter';
import { useSnackbarService } from '../providers/SnackbarProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';

const useChatConversationWireframe = () => {
	const analyticsService = useAnalyticsService();
	const chatService = ChatService.shared();
	const navigation = useNavigation();
	const snackbarService = useSnackbarService();
	const recipientChatUser = useRoute().params?.item;
	const { uid } = useRoute().params;

	const recipientChatUid = recipientChatUser?.uid || uid;
	const pilotID = recipientChatUid.replace( /\D/g, '' );

	const createPresenter = () => new ChatConversationPresenter( {
		chatService,
		navigation,
		snackbarService,
		recipientChatUid,
		recipientChatUser,
		pilotID,
		analyticsService,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useChatConversationWireframe;
