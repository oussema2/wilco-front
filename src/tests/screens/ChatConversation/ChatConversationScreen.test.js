import * as React from 'react';
import { render } from '@testing-library/react-native';
import ChatConversationScreen from '../../../screens/ChatConversation/ChatConversationScreen';
import * as useChatConversationWireframe from '../../../wireframes/useChatConversationWireframe';
import mockUseView from '../../mocks/mockUseView';

describe( 'ChatConversationScreen', () => {
	const renderScreen = ( presenter = {} ) => {
		mockUseView(
			useChatConversationWireframe,
			{
				...presenter
			}
		);

		return render( <ChatConversationScreen navigation="navigation" route="route" /> );
	};

	test( 'shows the CometChatMessages component inside a screen container', () => {
		const { toJSON } = renderScreen();
		expect( toJSON() ).toMatchSnapshot();
	} );
} );
