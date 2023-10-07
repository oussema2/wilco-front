import { renderHook } from '@testing-library/react-hooks';
import { Keyboard } from 'react-native';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import ResetPasswordPresenter from '../../presenters/ResetPasswordPresenter';
import useResetPasswordWireframe from '../../wireframes/useResetPasswordWireframe';
import ConfirmPasswordReset from '../../interactors/ConfirmPasswordReset';
import ConfirmPasswordResetService from '../../services/ConfirmPasswordResetService';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );
jest.mock( '../../interactors/ConfirmPasswordReset' );
jest.mock( '../../services/ConfirmPasswordResetService.js' );

describe( 'useResetPasswordWireframe', () => {
	let rootStore;
	let snackbarService;
	let navigation;
	let keyboard;
	let oobCode = 'testCode';

	beforeEach( () => {
		rootStore = mockUseRootStore();
		snackbarService = mockUseSnackbarService();
		navigation = mockNavigation;
		keyboard = Keyboard;
	} );

	it( 'returns an instance of ResetPasswordPresenter', () => {
		const { result } = renderHook( () => useResetPasswordWireframe( { oobCode } ) );

		expect( result.current ).toBeInstanceOf( ResetPasswordPresenter );

		expect( result.current.rootStore ).toEqual( rootStore );
		expect( result.current.keyboard ).toEqual( keyboard );
		expect( result.current.navigation ).toEqual( navigation );
		expect( result.current.confirmPasswordReset ).toBeInstanceOf( ConfirmPasswordReset );
		expect( result.current.snackbarService ).toEqual( snackbarService );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useResetPasswordWireframe() );

		expect( ConfirmPasswordReset ).toHaveBeenCalledWith( {
			confirmPasswordResetService: expect.any( ConfirmPasswordResetService )
		} );

		expect( ConfirmPasswordResetService ).toHaveBeenCalled();
	} );
} );
