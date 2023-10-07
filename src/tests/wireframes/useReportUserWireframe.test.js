import { renderHook } from '@testing-library/react-hooks';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import useReportUserWireframe from '../../wireframes/useReportUserWireframe';
import ReportUserPresenter from '../../presenters/ReportUserPresenter';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import ReportUser from '../../interactors/ReportUser';
import AlertMessagesService from '../../services/AlertMessagesService';
import mockUseRootStore from '../mocks/mockUseRootStore';
import PilotService from '../../services/PilotService';

jest.mock( '../../presenters/ReportUserPresenter' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../interactors/ReportUser' );
jest.mock( '../../services/AlertMessagesService' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useFocusEffect: jest.fn(),
	useNavigation: () => mockNavigation
} ) );

describe( 'useReportUserWireframe', () => {
	let alertMessagesService;
	let snackbarService;
	let navigation;

	beforeEach( () => {
		mockUseRootStore();
		alertMessagesService = AlertMessagesService.shared();
		snackbarService = mockUseSnackbarService();
		navigation = mockNavigation;
	} );

	it( 'returns an instance of ReportUserPresenter', () => {
		const { result } = renderHook( () => useReportUserWireframe() );

		expect( result.current ).toBeInstanceOf( ReportUserPresenter );
		expect( ReportUserPresenter ).toHaveBeenCalledWith( {
			alertMessagesService,
			navigationService: navigation,
			snackbarService,
			getCurrentPilot: expect.any( GetCurrentPilotFromStore ),
			reportUser: expect.any( ReportUser )
		} );
		expect( ReportUser ).toHaveBeenCalledWith( {
			pilotService: expect.any( PilotService )
		} );
	} );
} );
