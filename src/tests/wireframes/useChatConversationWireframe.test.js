import { renderHook } from '@testing-library/react-hooks';
import mockUseRootStore from '../mocks/mockUseRootStore';
import useChatConversationWireframe from '../../wireframes/useChatConversationWireframe';
import ChatConversationPresenter from '../../presenters/ChatConversationPresenter';

jest.mock( '@react-navigation/native', () => ( {
	useNavigation: () => ( {} ),
	useFocusEffect: () => ( {} ),
	useRoute: () => ( { params: { item: { uid: 'dev113' } } } )
} ) );

describe( 'ChatConversationPresenter', () => {
	beforeEach( () => {
		mockUseRootStore();
	} );

	describe( 'when params has chat user item', () => {
		it( 'returns an instance of ChatConversationPresenter', () => {
			const { result } = renderHook( () => useChatConversationWireframe() );

			expect( result.current ).toBeInstanceOf( ChatConversationPresenter );
			expect( result.current.recipientChatUid ).toBe( 'dev113' );
		} );
	} );
} );
