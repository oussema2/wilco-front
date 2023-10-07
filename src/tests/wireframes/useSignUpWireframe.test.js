import { renderHook } from '@testing-library/react-hooks';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import SignUpPresenter from '../../presenters/SignUpPresenter';
import SignUpUser from '../../interactors/SignUpUser';
import useSignUpWireframe from '../../wireframes/useSignUpWireframe';
import SignUpService from '../../services/SignUpService';
import LogInService from '../../services/LogInService';
import EntityService from '../../services/EntityService';
import Api from '../../services/Api';
import FetchCurrentPilotFromRemote from '../../interactors/FetchCurrentPilotFromRemote';
import OAuthResponseDeserializer from '../../services/OAuthResponseDeserializer';
import PilotBuilder from '../../builders/PilotBuilder';

jest.mock( '../../interactors/SignUpUser' );
jest.mock( '../../interactors/FetchCurrentPilotFromRemote' );
jest.mock( '../../services/SignUpService' );
jest.mock( '../../services/LogInService' );
jest.mock( '../../services/EntityService' );
jest.mock( '../../builders/PilotBuilder' );
jest.mock( '../../services/Api' );
jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useSignUpWireframe', () => {
	let rootStore;
	let snackbarService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		snackbarService = mockUseSnackbarService();
	} );

	it( 'returns an instance of SignUpPresenter', () => {
		const { result } = renderHook( () => useSignUpWireframe() );

		expect( result.current ).toBeInstanceOf( SignUpPresenter );
		expect( result.current._signUpUser ).toBeInstanceOf( SignUpUser );
		expect( result.current._fetchPilot ).toBeInstanceOf( FetchCurrentPilotFromRemote );
		expect( result.current._snackbarService ).toEqual( snackbarService );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useSignUpWireframe() );

		expect( SignUpUser ).toHaveBeenCalledWith( {
			signUpService: expect.any( SignUpService ),
			logInService: expect.any( LogInService )
		} );
		expect( FetchCurrentPilotFromRemote ).toHaveBeenCalledWith( {
			service: expect.any( EntityService ),
			store: rootStore.pilotStore
		} );
		expect( SignUpService ).toHaveBeenCalledWith( { api: expect.any( Api ) } );
		expect( LogInService ).toHaveBeenCalledWith( { api: expect.any( Api ) } );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore,
			responseDeserializerKlass: OAuthResponseDeserializer
		} );
		expect( PilotBuilder ).toHaveBeenCalledWith( {
			aircraftStore: rootStore.aircraftStore
		} );
	} );
} );
