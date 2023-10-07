import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseRootStore from '../mocks/mockUseRootStore';
import useInvitePeopleWireframe from '../../wireframes/useInvitePeopleWireframe';
import InvitePeoplePresenter from '../../presenters/InvitePeoplePresenter';
import ShareMessagesService from '../../services/ShareMessagesService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

jest.mock( 'mobx' );
const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );
jest.mock( '../../presenters/InvitePeoplePresenter' );
jest.mock( '../../services/ShareMessagesService' );

describe( 'useInvitePeopleWireframe', () => {
	let rootStore;
	let navigation;
	let shareMessagesService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		navigation = mockNavigation;
		shareMessagesService = ShareMessagesService.shared();
	} );

	it( 'returns an instance of InvitePeoplePresenter', () => {
		const { result } = renderHook( () => useInvitePeopleWireframe() );

		expect( result.current ).toBeInstanceOf( InvitePeoplePresenter );

		expect( InvitePeoplePresenter ).toHaveBeenCalledWith( {
			navigation,
			rootStore,
			shareMessagesService,
			makeAutoObservable
		} );
	} );
} );
