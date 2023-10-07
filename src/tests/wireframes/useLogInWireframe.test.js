import { renderHook } from '@testing-library/react-hooks';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import LogInPresenter from '../../presenters/LogInPresenter';
import useLogInWireframe from '../../wireframes/useLogInWireframe';
import LogInUser from '../../interactors/LogInUser';
import FetchCurrentPilotFromRemote from '../../interactors/FetchCurrentPilotFromRemote';
import LogInService from '../../services/LogInService';
import EntityService from '../../services/EntityService';
import Api from '../../services/Api';
import OAuthResponseDeserializer from '../../services/OAuthResponseDeserializer';
import PilotBuilder from '../../builders/PilotBuilder';

jest.mock( '../../interactors/LogInUser' );
jest.mock( '../../interactors/FetchCurrentPilotFromRemote' );
jest.mock( '../../services/LogInService' );
jest.mock( '../../services/EntityService' );
jest.mock( '../../services/Api' );
jest.mock( '../../builders/PilotBuilder' );
jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useLogInWireframe', () => {
	let rootStore;
	let snackbarService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		snackbarService = mockUseSnackbarService();
	} );

	it( 'returns an instance of LogInPresenter', () => {
		const { result } = renderHook( () => useLogInWireframe() );

		expect( result.current ).toBeInstanceOf( LogInPresenter );
		expect( result.current.logInUser ).toBeInstanceOf( LogInUser );
		expect( result.current.fetchPilot ).toBeInstanceOf( FetchCurrentPilotFromRemote );
		expect( result.current.snackbarService ).toEqual( snackbarService );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useLogInWireframe() );

		expect( LogInUser ).toHaveBeenCalledWith( {
			logInService: expect.any( LogInService )
		} );
		expect( FetchCurrentPilotFromRemote ).toHaveBeenCalledWith( {
			service: expect.any( EntityService ),
			store: rootStore.pilotStore
		} );
		expect( LogInService ).toHaveBeenCalledWith( {
			api: expect.any( Api )
		} );
		expect( PilotBuilder ).toHaveBeenCalledWith( {
			aircraftStore: rootStore.aircraftStore
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore,
			responseDeserializerKlass: OAuthResponseDeserializer
		} );
	} );
} );
