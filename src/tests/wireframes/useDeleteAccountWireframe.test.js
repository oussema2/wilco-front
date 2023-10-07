import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import useDeleteAccountWireframe from '../../wireframes/useDeleteAccountWireframe';
import DeleteAccountPresenter from '../../presenters/DeleteAccountPresenter';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import DeleteAccount from '../../interactors/DeleteAccount';
import mockUseRootStore from '../mocks/mockUseRootStore';
import Api from '../../services/Api';
import DeleteAccountService from '../../services/DeleteAccountService';
import LogOutService from '../../services/LogOutService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );
jest.mock( 'mobx' );
const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );
jest.mock( '../../presenters/DeleteAccountPresenter' );
jest.mock( '../../services/DeleteAccountService' );
jest.mock( '../../interactors/DeleteAccount' );
jest.mock( '../../services/Api' );

describe( 'useDeleteAccountWireframe', () => {
	let navigation;
	let modalService;
	let snackbarService;

	beforeEach( () => {
		mockUseRootStore();
		navigation = mockNavigation;
		modalService = mockUseModalService();
		snackbarService = mockUseSnackbarService();
	} );

	it( 'returns an instance of DeleteAccountPresenter', () => {
		const { result } = renderHook( () => useDeleteAccountWireframe() );

		expect( result.current ).toBeInstanceOf( DeleteAccountPresenter );

		expect( DeleteAccountPresenter ).toHaveBeenCalledWith( {
			navigation,
			modalService,
			snackbarService,
			deleteAccount: expect.any( DeleteAccount ),
			makeAutoObservable
		} );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useDeleteAccountWireframe() );

		expect( DeleteAccount ).toHaveBeenCalledWith( {
			deleteAccountService: expect.any( DeleteAccountService ),
			logOutService: expect.any( LogOutService )
		} );

		expect( DeleteAccountService ).toHaveBeenCalledWith( {
			api: expect.any( Api )
		} );
	} );
} );
