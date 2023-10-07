import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import AuthenticatedNavigatorPresenter from '../../../presenters/AuthenticatedNavigatorPresenter';
import GetCurrentPilotFromStore from '../../../interactors/GetCurrentPilotFromStore';
import useAuthenticatedNavigatorWireframe
	from '../../../wireframes/useAuthenticatedNavigatorWireframe';
import mockUseRootStore from '../../mocks/mockUseRootStore';
import HelpCenterService from '../../../services/HelpCenterService';

jest.mock( '@intercom/intercom-react-native', () => {} );
jest.mock( '@react-native-firebase/auth', () => ( { auth: jest.fn( () => {} ) } ) );
jest.mock( '../../../presenters/AuthenticatedNavigatorPresenter' );
jest.mock( '../../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../../services/HelpCenterService' );
jest.mock( 'mobx' );

describe( 'useAuthenticatedNavigatorWireframe', () => {
	let helpCenterService;

	beforeEach( () => {
		mockUseRootStore();
		helpCenterService = HelpCenterService.shared();
	} );

	it( 'returns an instance of useAuthenticatedNavigatorPresenter', () => {
		const { result } = renderHook( () => useAuthenticatedNavigatorWireframe() );

		expect( result.current ).toBeInstanceOf( AuthenticatedNavigatorPresenter );

		expect( AuthenticatedNavigatorPresenter ).toHaveBeenCalledWith( {
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			helpCenterService,
			makeAutoObservable
		} );
	} );
} );
