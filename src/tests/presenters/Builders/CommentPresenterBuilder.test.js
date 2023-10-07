import CommentPresenterBuilder from '../../../presenters/Builders/CommentPresenterBuilder';
import CommentPresenter from '../../../presenters/CommentPresenter';
import DeleteEntity from '../../../interactors/DeleteEntity';
import GetCurrentPilotFromStore from '../../../interactors/GetCurrentPilotFromStore';
import CreateReport from '../../../interactors/CreateReport';
import EntityService from '../../../services/EntityService';
import MockRootStore from '../../mocks/MockRootStore';
import MockModalService from '../../mocks/MockModalService';
import MockSnackbarService from '../../mocks/MockSnackbarService';
import CommentFactory from '../../factories/CommentFactory';
import MockActionSheetService from '../../mocks/MockActionSheetService';
import Api from '../../../services/Api';
import CommentBuilder from '../../../builders/CommentBuilder';
import AnalyticsService from '../../../services/AnalyticsService';

jest.mock( '../../../interactors/DeleteEntity' );
jest.mock( '../../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../../services/EntityService' );
jest.mock( '../../../services/Api' );
jest.mock( '../../../builders/CommentBuilder' );

describe( 'CommentPresenterBuilder', () => {
	const comment = CommentFactory.build();
	const rootStore = new MockRootStore();
	const modalService = new MockModalService();
	const actionSheetService = new MockActionSheetService();
	const snackbarService = new MockSnackbarService();
	const navigation = 'navigationMock';
	const analyticsService = new AnalyticsService();

	describe( 'build()', () => {
		const presenter = CommentPresenterBuilder.build( {
			comment,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			analyticsService,
			navigation
		} );
		it( 'creates the CommentPresenter correctly', () => {
			expect( presenter ).toBeInstanceOf( CommentPresenter );
			expect( presenter.comment ).toEqual( comment );
			expect( presenter.modalService ).toEqual( modalService );
			expect( presenter.actionSheetService ).toEqual( actionSheetService );
			expect( presenter.snackbarService ).toEqual( snackbarService );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.deleteComment ).toBeInstanceOf( DeleteEntity );
			expect( presenter.getCurrentPilotFromStore ).toBeInstanceOf( GetCurrentPilotFromStore );
			expect( presenter.createReport ).toBeInstanceOf( CreateReport );
			expect( presenter.analyticsService ).toBeInstanceOf( AnalyticsService );

			expect( DeleteEntity ).toHaveBeenCalledWith( {
				entityService: expect.any( EntityService ),
				entityStore: rootStore.commentStore
			} );
			expect( GetCurrentPilotFromStore ).toHaveBeenCalledWith( {
				store: rootStore.pilotStore
			} );
			expect( EntityService ).toHaveBeenCalledWith( {
				api: expect.any( Api ),
				buildEntity: expect.any( CommentBuilder ).build,
				basePath: 'comments'
			} );
			expect( CommentBuilder ).toHaveBeenCalledWith( {
				pilotStore: rootStore.pilotStore, postStore: rootStore.postStore
			} );
			expect( Api ).toHaveBeenCalledWith( {
				authenticationStore: rootStore.authenticationStore
			} );
		} );
	} );
} );
