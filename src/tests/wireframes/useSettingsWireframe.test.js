import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseRootStore from '../mocks/mockUseRootStore';
import useSettingsWireframe from '../../wireframes/useSettingsWireframe';
import SettingsPresenter from '../../presenters/SettingsPresenter';
import mockUseModalService from '../mocks/mockUseModalService';
import LogOutUser from '../../interactors/LogOutUser';
import Api from '../../services/Api';
import LogOutService from '../../services/LogOutService';
import NotificationService from '../../services/NotificationService';
import HelpCenterService from '../../services/HelpCenterService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );
jest.mock( '@intercom/intercom-react-native', () => {} );
jest.mock( 'mobx' );
const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );
jest.mock( '../../presenters/SettingsPresenter' );
jest.mock( '../../interactors/LogOutUser' );
jest.mock( '../../services/Api' );
jest.mock( '../../services/LogOutService' );
jest.mock( '../../services/NotificationService' );
jest.mock( '../../services/HelpCenterService' );

describe( 'useSettingsWireframe', () => {
	let rootStore;
	let modalService;
	let navigation;
	let helpCenterService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		modalService = mockUseModalService();
		navigation = mockNavigation;
		helpCenterService = HelpCenterService.shared();
	} );

	it( 'returns an instance of SettingsPresenter', () => {
		const { result } = renderHook( () => useSettingsWireframe() );

		expect( result.current ).toBeInstanceOf( SettingsPresenter );

		expect( SettingsPresenter ).toHaveBeenCalledWith( {
			navigation,
			rootStore,
			modalService,
			logOutUser: expect.any( LogOutUser ),
			helpCenterService,
			makeAutoObservable
		} );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useSettingsWireframe() );

		expect( LogOutUser ).toHaveBeenCalledWith( {
			logOutService: expect.any( LogOutService ),
			notificationService: expect.any( NotificationService ),
			helpCenterService
		} );

		expect( LogOutService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			pilotStore: rootStore.pilotStore,
			postStore: rootStore.postStore,
			commentStore: rootStore.commentStore,
			notificationStore: rootStore.notificationStore
		} );

		expect( NotificationService ).toHaveBeenCalledWith( {
			api: expect.any( Api )
		} );

		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
	} );
} );
