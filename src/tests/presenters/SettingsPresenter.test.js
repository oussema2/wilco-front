import MockRootStore from '../mocks/MockRootStore';
import SettingsPresenter from '../../presenters/SettingsPresenter';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import {
	LOG_OUT_CONFIRMATION_MODAL
} from '../../constants/modals';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';

describe( 'SettingsPresenter', () => {
	const navigation = { navigate: jest.fn(), goBack: jest.fn() };
	const rootStore = new MockRootStore();
	const makeAutoObservable = jest.fn();
	const modalService = { open: jest.fn(), close: jest.fn() };
	const helpCenterService = {
		showMessageComposer: jest.fn()
	};
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new SettingsPresenter( {
			navigation,
			rootStore,
			modalService,
			helpCenterService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.rootStore ).toEqual( rootStore );
			expect( presenter.modalService ).toEqual( modalService );
			expect( presenter.helpCenterService ).toEqual( helpCenterService );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@logOutWasPressed', () => {
		const itOpensConfirmationModalForLogOut = () => {
			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => presenter.logOutWasPressed( ),
				modal: LOG_OUT_CONFIRMATION_MODAL,
				actionExpect: () => {
				},
				modalService
			} );
		};

		itOpensConfirmationModalForLogOut();
	} );

	describe( '@helpWasPressed', () => {
		test( 'shows the help center message composer', () => {
			presenter.helpWasPressed();
			expect( helpCenterService.showMessageComposer ).toHaveBeenCalled();
		} );
	} );

	describe( '@invitePeopleWasPressed', () => {
		test( 'navigates to the Invite People Screen', () => {
			presenter.invitePeopleWasPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.invitePeople.name );
		} );
	} );

	describe( '@deleteAccountWasPressed', () => {
		test( 'navigates to the Delete Account Screen', () => {
			presenter.deleteAccountWasPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.deleteAccount.name );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		test( 'calls the navigation to go back', () => {
			presenter.backButtonWasPressed();
			expect( navigation.goBack ).toHaveBeenCalled();
		} );
	} );
} );
