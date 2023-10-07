import { renderHook } from '@testing-library/react-hooks';
import { Keyboard } from 'react-native';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import useForgotPasswordWireframe from '../../wireframes/useForgotPasswordWireframe';
import ForgotPasswordPresenter from '../../presenters/ForgotPasswordPresenter';
import SendPasswordResetEmail from '../../interactors/SendPasswordResetEmail';
import SendPasswordResetEmailService from '../../services/SendPasswordResetEmailService';

jest.mock( '../../interactors/SendPasswordResetEmail' );
jest.mock( '../../services/SendPasswordResetEmailService' );
jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useForgotPasswordWireframe', () => {
	let rootStore;
	let snackbarService;
	let navigation;
	let keyboard;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		snackbarService = mockUseSnackbarService();
		navigation = mockNavigation;
		keyboard = Keyboard;
	} );

	it( 'returns an instance of ForgotPasswordPresenter', () => {
		const { result } = renderHook( () => useForgotPasswordWireframe() );

		expect( result.current ).toBeInstanceOf( ForgotPasswordPresenter );

		expect( result.current.rootStore ).toEqual( rootStore );
		expect( result.current.keyboard ).toEqual( keyboard );
		expect( result.current.navigation ).toEqual( navigation );
		expect( result.current.sendPasswordResetEmail ).toBeInstanceOf( SendPasswordResetEmail );
		expect( result.current.snackbarService ).toEqual( snackbarService );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useForgotPasswordWireframe() );

		expect( SendPasswordResetEmail ).toHaveBeenCalledWith( {
			sendPasswordResetEmailService: expect.any( SendPasswordResetEmailService )
		} );

		expect( SendPasswordResetEmailService ).toHaveBeenCalled();
	} );
} );
